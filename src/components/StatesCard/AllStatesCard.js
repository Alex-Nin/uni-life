import React from 'react'
import './StatesCard.css'

const AllStatesCard = ({ id, state, image }) => {
  const getStyles = {
    stateCard: {
      backgroundImage: `linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.4) 30%, rgba(0,0,0,0) 60%), url(${image})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
    },
    headingState: {
      fontSize: '2.2rem',
      color: 'white',
      textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
    }
  }

  return (
    <>
      <div className='states-box' style={getStyles.stateCard}>
        <h3 style={getStyles.headingState} key={id}>{state}</h3>
      </div>
    </>
  )
}
    
export default AllStatesCard 