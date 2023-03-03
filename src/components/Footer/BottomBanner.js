import React from 'react'
import { Link } from 'react-router-dom'

const BottomBanner = () => {
  return (
    <div className='bottom-banner'>
        <ul>
          <li><Link to='/uni-life/about-us'>About Us</Link></li>
          <li><Link to='/uni-life/terms-and-conditions'>Terms & Conditions</Link></li>
          <li><Link to='/uni-life/privacy-policy'>Privacy & Cookie Policies</Link></li>
        </ul>
        <div className='bottom-banner-item'>
          <p>2022</p>
          <p><span>©</span> UniLife</p>
        </div>
      </div>
  )
}

export default BottomBanner
