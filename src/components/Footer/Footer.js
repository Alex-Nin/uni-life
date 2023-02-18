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
    },
    paraStyle: {
      lineHeight: "1.8",
      paddingRight: "174px",
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
          <p style={getStyles.paraStyle}>Curious about new offerings? Sign up for our weekly newsletter and stay informed.</p>
        <form onSubmit={handleSubmit}>
          <input
            onChange={(e)=>setEmail(e.target.value)} 
            placeholder="Your email"
          />
        </form>
        </div>
        <div className='footer-item'>
          <h5>Let's Socialize</h5>
          <div className='fb-container footer-social'>
            <IconContext.Provider value={getStyles.iconStyles}>
              <FaFacebook></FaFacebook>
            </IconContext.Provider>
            <p>Facebook</p>
          </div>
          <div className='twitter-container footer-social'>
          <IconContext.Provider value={getStyles.iconStyles}>
            <FaTwitterSquare></FaTwitterSquare>
          </IconContext.Provider>
            <p>Twitter</p>
          </div>
          <div className='insta-container footer-social'>
          <IconContext.Provider value={getStyles.iconStyles}>
            <AiFillInstagram></AiFillInstagram>
          </IconContext.Provider>
            <p>Instagram</p>
          </div>
        </div>
      </div>
      <BottomBanner />
    </>
  )
}

export default Footer
