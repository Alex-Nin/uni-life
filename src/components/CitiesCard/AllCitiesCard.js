import React from 'react'

import './CitiesCard.css'


const AllCitiesCard = ({ id, city, image }) => {
  const getStyles = {
    cityCard: {
      backgroundImage: `linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.4) 30%, rgba(0,0,0,0) 60%), url(${image})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
    },
    headingCity: {
      fontSize: '2.2rem',
      color: 'white',
      textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
    }
  }

  return (
    <>
      <div className='cities-box' style={getStyles.cityCard}>
        <h3 style={getStyles.headingCity} key={id}>{city}</h3>
      </div>
    </>
  )
}
    
export default AllCitiesCard
    
