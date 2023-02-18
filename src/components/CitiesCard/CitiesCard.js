import React from 'react';
import './CitiesCard.css';

const CitiesCard = ({ city, id, cardStyle }) => {

  const getStyles = {
    homepage: {
      backgroundImage: `url(${city.image_url})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      borderRadius: '40px',
      height: '35vh',
      color: 'var(--primary-white)',
      backgroundColor: 'none',
    },
    allCities: {
      height: '8vh',
      borderRadius: '25px',
      border: '1px solid var(--border-color)',
    },
    hidden: {
      display: 'none',
    },
    shown: {
      display: 'block',
    },
    headingHome: {
      fontSize: '2.2rem',
    },
    headingCities: {
      fontSize: '1.6rem',
    },
  }



  return (
  <>
    <div className='cities-box' style={cardStyle === "homepage" ? getStyles.homepage : getStyles.allCities}>
      
      {cardStyle === "homepage" 
      ? <h3 style={getStyles.headingHome} key={id}>{city.name}</h3>
      : <h3 style={getStyles.headingCities} key={id}>{city}</h3>
      }

      {city.property_count === 1 
        ? <p style={cardStyle === "homepage" 
          ? getStyles.visible 
          : getStyles.hidden}>{city.property_count} property</p> 
        : <p style={cardStyle === "homepage" 
          ? getStyles.visible 
          : getStyles.hidden}>{city.property_count} properties</p>
      }
    </div>
  </>
  )
}

export default CitiesCard
