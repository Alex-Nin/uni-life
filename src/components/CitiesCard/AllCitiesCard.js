import React from 'react'

import './CitiesCard.css'


const AllCitiesCard = ({ id, city }) => {
    const getStyles = {
        headingCities: {
          fontSize: '1.6rem',
        },
      }
    
    
    
      return (
      <>
        <div className='all-cities-box'>
          <h3 style={getStyles.headingCities} key={id}>{city}</h3>
        </div>
      </>
      )
    }
    
    export default AllCitiesCard
    
