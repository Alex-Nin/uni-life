import React, { useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { useSelectedCity, useSetSelectedCity } from '../CityContext'
import axios from 'axios'
import './HomepageComponents.css'

const SearchModal = () => {
  const [cities, setCities] = useState([])
  const selectedCity = useSelectedCity()
  const setSelectedCity = useSetSelectedCity()
  const [selectedBed, setSelectedBed] = useState('0')

  const handleCityChange = e => {
    setSelectedCity(e.target.value)
  }

  const handleBedChange = e => {
    setSelectedBed(e.target.value)
  }

  const fontStyle = {
    city: {
      color: selectedCity !== '0' ? 'black' : 'var(--border-color)' 
    },
    bedrooms: {
      color: selectedBed !== '0' ? 'black' : 'var(--border-color)' 
    }
  }
  
  useEffect(()=>{
      axios.get('https://unilife-server.herokuapp.com/properties')
      .then((result) => setCities(result.data.data))
      //.then((result) => console.log(result.data.data))
      .catch((err) => console.log(err));
  }, []);
  
  //Removes duplicates from arrays
  const numBeds = []
  const cityAll = []
  for(let i = 1; i < cities.length; i++) {
    cityAll.push(cities[i]?.city_id.name);
    numBeds.push(cities[i]?.bedroom_count);
  }
  const citySet = new Set(cityAll)
  const numBedsSet = new Set(numBeds)

  return (
        <div className='search-modal'>
          <select id='list' onChange={handleCityChange} style={fontStyle.city}>
            <option value={'0'}>Select a city</option>
            {[...citySet].sort().map((city, id) => (
            <option value={city} key={id}>{city}</option>
          ))}
          </select>
          <select id='list' onChange={handleBedChange} style={fontStyle.bedrooms}>
            <option value={'0'}>Search bedroom</option>
            {[...numBedsSet].sort().map((bed, id) => (
            <option value={bed} key={id}>{bed}</option>
            ))}
          </select>
          <Link to='/cities-detail-page'><button className='button-style'>Find Homes</button></Link>
      </div>      
  )
}

export default SearchModal
