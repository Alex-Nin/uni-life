import React, { useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelectedCity, useSetSelectedCity } from '../CityContext'
import axios from 'axios'
import './HomepageComponents.css'

const SearchModal = () => {
  const [cities, setCities] = useState([])
  const selectedCity = useSelectedCity()
  const setSelectedCity = useSetSelectedCity()
  //const [selectedBed, setSelectedBed] = useState('0')

  const navigate = useNavigate()

  const handleCityChange = e => {
    setSelectedCity(e.target.value)
  }
  /*
  const handleBedChange = e => {
    setSelectedBed(e.target.value)
  }*/

  const fontStyle = {
    city: {
      color: selectedCity !== null ? 'black' : 'var(--border-color)' 
    },
    /*bedrooms: {
      color: selectedBed !== '0' ? 'black' : 'var(--border-color)' 
    }*/
  }
  
  useEffect(()=>{

    axios.get(`https://unilife-server.herokuapp.com/cities?page=1`)
      .then((result) => setCities(result.data.response))
      //.then((result) => console.log(result.data.response))
      .catch((err) => console.log(err));

    axios.get(`https://unilife-server.herokuapp.com/cities?page=2`)
      .then((result) => result.data.response.forEach((element) => {setCities((prevCities) => [...prevCities, element])}) )
      //.then((result) => console.log(result.data.response))
      .catch((err) => console.log(err));

    //This thrid axios call ensures that the second pages' results doesn't come up undefined 
    axios.get(`https://unilife-server.herokuapp.com/cities?page=2`)
      .then((result) => console.log(result))
      .catch((err) => console.log(err));
  }, []);
  
  //Returns sorted array of city names from cities array of objects
  function allCitiesSorted(cities) {
    const allCities = []
    for(let i = 0; i < cities.length; i++) {
      allCities.push(cities[i]?.name);
    }
    return allCities.sort()
  }

  function findCityIdByName(cities) {
    for(let i = 0; i < cities.length; i++) {
      if (cities[i].name === selectedCity){
        return cities[i]._id
      }
    }
  }

  return (
        <div className='search-modal'>
          <select id='list' onChange={handleCityChange} style={fontStyle.city}>
            <option value={'null'}>Search by city</option>
            {allCitiesSorted(cities).map((city, id) => (
            <option value={city} key={id}>{city}</option>
          ))}
          </select>
            <button id='findHomeBtn' className='button-style' onClick={selectedCity !== null ? () => {navigate(`/uni-life/cities-detail-page/${findCityIdByName(cities)}`)} : null}>
              Find Homes
            </button>
      </div>      
  )
}

export default SearchModal
