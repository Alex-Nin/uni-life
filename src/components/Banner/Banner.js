import React from 'react'
import { Link } from 'react-router-dom';
import { RiHome4Line } from 'react-icons/ri';
import { CiHeart, CiMail } from 'react-icons/ci';
import { IconContext } from 'react-icons';

import './Banner.css';


const iconStyle = {
  margin: '0 6px',
}


const Banner = () => {
  return (
    <div className='banner'>
      <Link to='/uni-life'><div className='banner-left'>
        <IconContext.Provider value={{size: '30px'}}>
          <RiHome4Line style={iconStyle}></RiHome4Line>
        </IconContext.Provider>
        <p>UniLife</p>
      </div></Link>
      <div className='banner-right'>
        <CiHeart style={iconStyle}></CiHeart>
        <p style={{marginRight: 15}}>Shortlist</p>
        <CiMail style={iconStyle}></CiMail>
        <p>Contact Us</p>
      </div>
    </div>
  )
}

export default Banner
