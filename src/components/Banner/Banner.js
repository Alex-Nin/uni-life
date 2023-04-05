import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { RiHome4Line } from 'react-icons/ri';
import { CiHeart, CiMail } from 'react-icons/ci';
import { TbX, TbMenu2 } from 'react-icons/tb';
import { IconContext } from 'react-icons';
import { useSetSelectedCity } from '../CityContext';
import ModalContactUs from '../Modals/ModalContactUs'; //TbChevronsRight

import './Banner.css';


const Banner = () => {

  const [modalDisplay, setModalDisplay] = useState('none')
  const [modalPosition, setModalPosition] = useState('-1000px')
  const [mobileMenuDisplay, setMobileMenuDisplay] = useState('-1500px')
  const setSelectedCity = useSetSelectedCity()
  const iconStyle = {
    margin: '0 6px',
  }
  

  const handleContactClick = () => {
    setModalDisplay('block')
    setModalPosition('160px')
    setMobileMenuDisplay('-1500px')
  }

  const handleCloseMenuClick = () => {
    setMobileMenuDisplay('-1500px')
  }

  const handleOpenMenuClick = () => {
    setMobileMenuDisplay('0')
  }

  return (

    <div className='banner'>
      <ModalContactUs 
        position={modalPosition}
        display={modalDisplay} 
        setDisplay={setModalDisplay}
        setPosition={setModalPosition}
        />
      <Link to='/uni-life' onClick={() => setSelectedCity(null)}><div className='banner-left'>
        <IconContext.Provider value={{size: '30px'}}>
          <RiHome4Line style={iconStyle}></RiHome4Line>
        </IconContext.Provider>
        <p>UniLife</p>
      </div></Link>
      <div className='banner-right' style={{top: mobileMenuDisplay}}>
        <div className='banner-right-menu' style={{top: mobileMenuDisplay}}>
          <TbX size={45} id='closeMenuBtn' onClick={handleCloseMenuClick}/>
          <Link to='/uni-life/shortlist'>
            <CiHeart style={iconStyle} id='bannerIcon'></CiHeart>
          </Link>
          <Link to='/uni-life/shortlist' onClick={handleCloseMenuClick}>
            <p style={{marginRight: 15}}>Shortlist</p>
          </Link>
          <CiMail style={iconStyle} id='bannerIcon'></CiMail>
          <p onClick={handleContactClick}>Contact Us</p>
        </div>
      </div>
      <TbMenu2 size={30} id='openMenuBtn' onClick={handleOpenMenuClick}/>
    </div>
  )
}

export default Banner
