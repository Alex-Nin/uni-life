import React from 'react'
import { TbMapSearch, TbListCheck, TbReceipt } from 'react-icons/tb';
import { IconContext } from 'react-icons';

const CompareBox = () => {

  const iconStyles = {
    color: 'var(--secondary-blue)',
    strokeWidth: 1.3,
  }

  const iconSize = {
    bannerIcons: {
      size: 80
    },
    nonBannerIcons: {
      size: 45
    }
  }

  return (
    <div className='compare-box-element'>
        <h3 className='compare-box-contianer-title'>Compare all-inclusive student homes.</h3>
        <div className='compare-box-container'>
          <div className='compare-box'>
            <IconContext.Provider value={iconSize.bannerIcons}>
              <TbMapSearch style={iconStyles}></TbMapSearch>
            </IconContext.Provider>
            <p className='compare-box-title'>Search</p>
            <p className='comapre-box-description'>
              Find your dream home in the perfect area near your university.
            </p>
          </div>
          <div className='compare-box'>
            <IconContext.Provider value={iconSize.bannerIcons}>
              <TbListCheck style={iconStyles}></TbListCheck>
            </IconContext.Provider>
            <p className='compare-box-title'>Compare</p>
            <p className='comapre-box-description'>
              Compare student accommodation to find the right home for you.
            </p>
          </div>
          <div className='compare-box'>
            <IconContext.Provider value={iconSize.bannerIcons}>
              <TbReceipt style={iconStyles}></TbReceipt>
            </IconContext.Provider>
            <p className='compare-box-title'>Bills Included</p>
            <p className='comapre-box-description'>
              Bills are included in all rent prices. No hidden fees.
            </p>
          </div>
        </div>
      </div>
  )
}

export default CompareBox
