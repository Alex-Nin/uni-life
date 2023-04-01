import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Header from '../../components/Header/Header';
import AllCitiesCard from '../../components/CitiesCard/AllCitiesCard';
import { useSetSelectedCity } from '../../components/CityContext'
import axios from 'axios';

const SeeAllCitiesPage = () => {

  const heading = 'Student Accomodation';
  const paragraph = 'UniLife have student accommodation available across the UK. Whatever youre after, we can help you find the right student accommodation for you.';

  const setSelectedCity = useSetSelectedCity()
  const [cities, setCities] = useState([])

  useEffect(()=>{
    axios.get(`https://unilife-server.herokuapp.com/cities?page=1`)
      .then((result) => setCities(result.data.response))
      .catch((err) => console.log(err));
    
    axios.get(`https://unilife-server.herokuapp.com/cities?page=2`)
      .then((result) => result.data.response.forEach((element) => {setCities((prevCities) => [...prevCities, element])}))
      .catch((err) => console.log(err));

    //This thrid axios call ensures that the second pages' results doesn't come up undefined 
    axios.get(`https://unilife-server.herokuapp.com/cities?page=2`)
      .then((result) => console.log(result))
      .catch((err) => console.log(err));

  }, []);

  //Creates array of names to be sorted
  function allCitiesSorted(cities) {
    const allCities = []
    for(let i = 0; i < cities.length; i++) {
      allCities.push(cities[i]?.name);
    }
    return allCities.sort()
  }

  //Returns City Id to be used in link url parameter
  function findCityIdByName(cities, city) {
    for(let i = 0; i < cities.length; i++) {
      if (cities[i].name === city){
        return cities[i]._id
      }
    }
  }


  return (
    <div>
      <Header heading={heading} paragraph={paragraph} />
      <div className='cities-container'>
        <h3 className='cities-container-title'>Search by City</h3>
        <div className='all-cities-box-container'>
        {allCitiesSorted(cities).map( (city, id) => {
            return (
            <Link key={id} to={`../uni-life/cities-detail-page/${findCityIdByName(cities, city)}`} onClick={()=>{setSelectedCity(city)}}>
              <AllCitiesCard 
                id={id} 
                city={city}
              />
            </Link>
            )}
          )}
        </div>
      </div>
    </div>
  )
}

export default SeeAllCitiesPage
