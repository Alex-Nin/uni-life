import React from 'react';
import { Link } from 'react-router-dom';
import HomeCitiesCard from '../../components/CitiesCard/HomeCitiesCard';
import Header from '../../components/Header/Header';
import SearchModal from '../../components/HomepageComponents/SearchModal';
import city1 from '../../assets/city1.jpg';
import city2 from '../../assets/city2.jpg';
import city3 from '../../assets/city3.jpg';
import city4 from '../../assets/city4.jpg';
import city5 from '../../assets/city5.jpg';
import city6 from '../../assets/city6.jpg';
import city7 from '../../assets/city7.jpg';

import { TbHeart, TbHome } from 'react-icons/tb';
import { IconContext } from 'react-icons';
import { useSetSelectedCity } from '../../components/CityContext'
import CompareBox from '../../components/HomepageComponents/CompareBox'
import './Homepage.css';

const Homepage = () => {
  const heading = 'Find student homes with bills included';
  const paragraph = 'A simple and faster way to search for student accommodation';
  const setSelectedCity = useSetSelectedCity();
  
  const iconStyles = {
    color: 'var(--secondary-blue)',
    strokeWidth: 1.3,
  }
  const iconSize = {
    bannerIcons: {
      size: 80
    },
    nonBannerIcons: {
      size: 45
    }
  }

  // Curated list of popular college cities (just names)
  const popularCollegeCities = [
    "Boston", 
    "Austin", 
    "Berkeley", 
    "Ann Arbor", 
    "Chapel Hill", 
    "Madison"
  ];
  
  // Create an array of city images
  const cityImages = [city1, city2, city3, city4, city5, city6, city7];

  return (
    <>
      <Header heading={heading} paragraph={paragraph} />
      <SearchModal />
      
      <div className='featured-cities-container'>
        <h3 className='cities-container-title'>Student accommodations in our top cities</h3>
        <div className='home-cities-box-container'>
          {popularCollegeCities.map((cityName, id) => {
            // Get image based on index, cycling through available images
            const imageIndex = id % cityImages.length;
            const cityImage = cityImages[imageIndex];
            
            return (
              <Link 
                key={id}
                to={`/uni-life/cities-detail-page/${cityName}`} 
                onClick={() => {setSelectedCity(cityName)}}
              >
                <HomeCitiesCard 
                  id={id} 
                  city={{name: cityName}}
                  image={cityImage}
                /> 
              </Link>
            )}
          )}
        </div>
            
        <Link to='/uni-life/see-all-states-page' className='btn-link'>
          <button id='seeAllCitiesBtn' className='button-style'>
            All States
          </button>
        </Link>
      </div>

      <CompareBox />
      <div className='selection-favorites-element'>
        <div className='selection-favorites-item'>
          <IconContext.Provider value={{size: 65}}>
            <TbHome style={iconStyles}></TbHome>
          </IconContext.Provider>
          <div className='selection-favorites-box'>
            <p className='selection-favorites-title'>Best selection</p>
            <p className='selection-favorites-description'>
            Best selection of student accommodations. Never been easier to find a home that's right for you.
            </p>
          </div>
        </div>
        <div className='selection-favorites-item'>
          <IconContext.Provider value={iconSize.nonBannerIcons}>
            <TbHeart style={iconStyles}></TbHeart>
          </IconContext.Provider>
          <div>
            <p className='selection-favorites-title'>Your favorite</p>
            <p className='selection-favorites-description'>
            Shortlist your favourite properties and send enquiries in one click.
            </p>
          </div>
        </div>
        <Link to='see-all-cities-page' className='btn-link'>
          <button id='searchCompareBtn' className='button-style'>
            Search and Compare
          </button>
        </Link>
      </div>
    </>
  )
}

export default Homepage
