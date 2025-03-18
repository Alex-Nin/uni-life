import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Header from '../../components/Header/Header';
import AllCitiesCard from '../../components/CitiesCard/AllCitiesCard';
import { useSetSelectedCity } from '../../components/CityContext'
import { states } from '../../data/states';
import axios from 'axios';
import './StateCitiesPage.css';

// Import city images
import city7 from '../../assets/city7.jpg';
import city8 from '../../assets/city8.jpg';
import city9 from '../../assets/city9.jpg';
import city10 from '../../assets/city10.jpg';
import city11 from '../../assets/city11.jpg';
import city12 from '../../assets/city12.jpg';
import city13 from '../../assets/city13.jpg';
import city14 from '../../assets/city14.jpg';
import city15 from '../../assets/city15.jpg';
import city16 from '../../assets/city16.jpg';
import city17 from '../../assets/city17.jpg';
import city18 from '../../assets/city18.jpg';
import city19 from '../../assets/city19.jpg';
import city20 from '../../assets/city20.jpg';

const StateCitiesPage = () => {
  const { state_code } = useParams();
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const setSelectedCity = useSetSelectedCity();
  
  // Find the state name from the code
  const stateName = states.find(state => state.code === state_code)?.name || state_code;
  
  const heading = `Student Accommodation in ${stateName}`;
  const paragraph = `UniLife has student accommodation available across ${stateName}. Whatever you're after, we can help you find the right student accommodation for you.`;

  // Create an array of city images
  const cityImages = [
    city7, city8, city9, city10, city11, city12, city13, 
    city14, city15, city16, city17, city18, city19, city20
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
    setIsLoading(true);
    
    const baseUrl = "https://api.rentcast.io/v1/listings/rental/long-term";
    const headers = {
      "X-Api-Key": process.env.REACT_APP_RENTCAST_API_KEY
    };
    
    // Fetch properties for the selected state
    axios.get(`${baseUrl}?state=${state_code}&limit=100`, { headers })
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
  }, [state_code]);

  return (
    <div>
      <Header heading={heading} paragraph={paragraph} />
      <div className='cities-container'>
        <h3 className='cities-container-title'>Cities in {stateName}</h3>
        
        {isLoading ? (
          <div className="loading-container">
            <h3>Loading cities...</h3>
          </div>
        ) : cities.length > 0 ? (
          <div className='home-cities-box-container'>
            {cities.map((city, id) => {
              // Get image based on index, cycling through available images
              const imageIndex = id % cityImages.length;
              const cityImage = cityImages[imageIndex];
              
              return (
                <Link 
                  key={id} 
                  to={`/uni-life/cities-detail-page/${city}`}
                  onClick={() => {setSelectedCity(city)}}
                >
                  <AllCitiesCard 
                    id={id} 
                    city={city}
                    image={cityImage}
                  />
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="no-cities-container">
            <h3>No cities found for this state.</h3>
          </div>
        )}
      </div>
    </div>
  )
}

export default StateCitiesPage 