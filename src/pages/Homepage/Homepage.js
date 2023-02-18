import React, {useEffect, useState} from 'react';
import axios from 'axios';
import CitiesCard from '../../components/CitiesCard/CitiesCard';
import Header from '../../components/Header/Header';
import SearchModal from '../../components/HomepageComponents/SearchModal';
import { Link } from 'react-router-dom';
import person from '../../assets/person.png';
import { TbHeart, TbHome } from 'react-icons/tb';
import { IconContext } from 'react-icons';
import './Homepage.css';
import { useSetSelectedCity } from '../../components/CityContext'
import CompareBox from '../../components/HomepageComponents/CompareBox'


const Homepage = () => {
  const heading = 'Find student homes with bills included';
  const paragraph = 'A simple and faster way to search for student accommodation';
  const setSelectedCity = useSetSelectedCity()
  const [cities, setCities] = useState([]);
  
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
  const citiesStyles = {
    container: {
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: 45,
    },
  }

  

  useEffect(()=>{
      axios.get('https://unilife-server.herokuapp.com/cities')
      .then((result) => setCities(result.data.response))
      //.then((result) => console.log(result.data.response))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <Header heading={heading} paragraph={paragraph} />
      <SearchModal />
      
      <div className='cities-container'>
        <h3 className='cities-container-title'>Student accommodations in our top cities</h3>
        <div className='cities-box-container' style={citiesStyles.container}>
          {cities.slice(0,9)?.map( (city, id) => {
            return (
              <Link to='/cities-detail-page' onClick={() => {setSelectedCity(city.name)}}>
                <CitiesCard 
                  id={id} 
                  city={city}
                  cardStyle="homepage"
                /> 
            </Link>
            )}
          )}
        </div>
        <Link to='/see-all-cities-page' >
          <button className='button-style'>See All Cities</button>
        </Link>
      </div>

      <CompareBox />

      <img id='image-of-person' alt='guy-on-phone' src={person} />
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
        <Link to='see-all-cities-page'><button id='search-compare-btn' className='button-style'>Search and Compare</button></Link>
      </div>
    </>
  )
}

export default Homepage
