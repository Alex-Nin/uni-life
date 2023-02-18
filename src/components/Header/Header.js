import React from 'react';
import './Header.css';

const Header = ({ heading, paragraph }) => {
  return (
    <>
      <div className='header'>
          <h2 className='heading'>{heading}</h2>
          <p>{paragraph}</p>
      </div>
    </>
    
  )
}

export default Header
