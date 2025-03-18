import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelectedCity, useSetSelectedCity } from '../CityContext'
import axios from 'axios'
import { states } from '../../data/states'
import './HomepageComponents.css'

const SearchModal = () => {
  const [cities, setCities] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const selectedCity = useSelectedCity()
  const setSelectedCity = useSetSelectedCity()
  const [selectedState, setSelectedState] = useState('')
  
  const navigate = useNavigate()

  const handleStateChange = (e) => {
    const newState = e.target.value;
    setSelectedState(newState);
    setSelectedCity(null);
    
    if (newState) {
      fetchCitiesByState(newState);
    } else {
      setCities([]);
    }
  };

  const handleCityChange = e => {
    setSelectedCity(e.target.value)
  }

  const fetchCitiesByState = (stateCode) => {
    setIsLoading(true);
    const baseUrl = "https://api.rentcast.io/v1/listings/rental/long-term";
    const headers = {
      "X-Api-Key": process.env.REACT_APP_RENTCAST_API_KEY
    };
    
    // Fetch properties for the selected state
    axios.get(`${baseUrl}?state=${stateCode}&limit=100`, { headers })
      .then(response => {
        // Extract unique cities from the response
        const citySet = new Set();
        response.data.forEach(item => {
          if (item.city) {
            citySet.add(item.city);
          }
        });
        
        // Convert to sorted array
        const citiesArray = Array.from(citySet).sort();
        setCities(citiesArray);
        setIsLoading(false);
      })
      .catch(error => {
        console.error("Error fetching cities:", error);
        setIsLoading(false);
      });
  };

  const fontStyle = {
    state: {
      color: selectedState !== '' ? 'black' : 'var(--border-color)' 
    },
    city: {
      color: selectedCity !== null ? 'black' : 'var(--border-color)' 
    }
  }

  return (
    <div className='search-modal'>
      <select 
        id='stateList' 
        className='list' 
        onChange={handleStateChange} 
        style={fontStyle.state}
        value={selectedState}
      >
        <option value="">Select a state</option>
        {states.map(state => (
          <option key={state.code} value={state.code}>
            {state.name}
          </option>
        ))}
      </select>
      
      <select 
        id='cityList' 
        className='list' 
        onChange={handleCityChange} 
        style={fontStyle.city}
        value={selectedCity || ''}
        disabled={!selectedState || isLoading}
      >
        <option value="">
          {isLoading ? 'Loading cities...' : selectedState ? 'Select a city' : 'Select a state first'}
        </option>
        {cities.map((cityName, id) => (
          <option value={cityName} key={id}>{cityName}</option>
        ))}
      </select>
      
      <button 
        id='findHomeBtn' 
        className='button-style' 
        onClick={selectedCity ? () => {
          navigate(`/uni-life/cities-detail-page/${selectedCity}`)
        } : null}
        disabled={!selectedCity}
      >
        Find Homes
      </button>
    </div>      
  )
}

export default SearchModal
