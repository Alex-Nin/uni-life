import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Header from '../../components/Header/Header';
import CitiesCard from '../../components/CitiesCard/CitiesCard';
import { useSetSelectedCity } from '../../components/CityContext'
import axios from 'axios';

const SeeAllCitiesPage = () => {

  const heading = 'Student Accomodation';
  const paragraph = 'UniLife have student accommodation available across the UK. Whatever youre after, we can help you find the right student accommodation for you.';

  
  const citiesStyles = {
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '47px 21px',

  }
  const setSelectedCity = useSetSelectedCity()
  const [cities, setCities] = useState([]);

  useEffect(()=>{
    axios.get('https://unilife-server.herokuapp.com/properties')
    .then((result) => setCities(result.data.data))
    //.then((result) => console.log(result.data.data))
    .catch((err) => console.log(err));
}, []);

  const cityAll = []
  for(let i = 0; i < cities.length; i++) {
    if(cities[i].address !== undefined) {
      cityAll.push(cities[i].city_id.name);
    }
  }

  const citySet = new Set(cityAll)

  return (
    <div>
      <Header heading={heading} paragraph={paragraph} />
      <div className='cities-container'>
        <h3 className='cities-container-title'>Search by City</h3>
        <div className='cities-box-container' style={citiesStyles}>
        {[...citySet].sort()?.map( (city, id) => {
            return (
            <Link to='../cities-detail-page' onClick={()=>{setSelectedCity(city)}}>
              <CitiesCard 
                id={id} 
                city={city}
                cardStyle = 'all-cities'
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
