import React, { useState } from 'react'

import { FaFacebook ,FaTwitterSquare } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import { IconContext } from 'react-icons';
import BottomBanner from './BottomBanner';
import './Footer.css'

const Footer = () => {

  const [email, setEmail] = useState('');


  const getStyles={
    iconStyles: {
      marginRight: '10px',
      size: '28px',
    }
  }

  const handleSubmit=(e)=>{
      e.preventDefault();
      console.log(email);
  }

  return (
    <>
      <div className='footer'>
        <div className='footer-item'>
          <h5>Keep in touch</h5>
          <p className='footer-text'>Curious about new offerings? Sign up for our weekly newsletter and stay informed.</p>
        <form onSubmit={handleSubmit}>
          <input
            onChange={(e)=>setEmail(e.target.value)} 
            placeholder="Your email"
          />
        </form>
        </div>
        <div className='footer-item footer-social-container'>
          <h5 className='socialize-title'>Let's Socialize</h5>
          <div className='fb-container footer-social'>
            <IconContext.Provider value={getStyles.iconStyles}>
              <FaFacebook></FaFacebook>
            </IconContext.Provider>
            <p className='social-text'>Facebook</p>
          </div>
          <div className='twitter-container footer-social'>
          <IconContext.Provider value={getStyles.iconStyles}>
            <FaTwitterSquare></FaTwitterSquare>
          </IconContext.Provider>
            <p className='social-text'>Twitter</p>
          </div>
          <div className='insta-container footer-social'>
          <IconContext.Provider value={getStyles.iconStyles}>
            <AiFillInstagram></AiFillInstagram>
          </IconContext.Provider>
            <p className='social-text'>Instagram</p>
          </div>
        </div>
      </div>
      <BottomBanner />
    </>
  )
}

export default Footer
