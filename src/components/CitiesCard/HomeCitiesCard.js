import React from 'react';
import './CitiesCard.css';

const HomeCitiesCard = ({ city, id }) => {

  const getStyles = {
    homepage: {
      backgroundImage: `url(${city.image_url})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
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
    <div className='cities-box' style={getStyles.homepage}>
      
      <h3 style={getStyles.headingHome} key={id}>{city.name}</h3>


      {city.property_count === 1 
        ? <p>{city.property_count} property</p> 
        : <p>{city.property_count} properties</p>
      }
    </div>
  </>
  )
}

export default HomeCitiesCard
