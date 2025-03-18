import React, { useState, useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { TbBath, TbBed } from 'react-icons/tb'
import { GrHomeRounded } from "react-icons/gr";
import { MdOutlinePlace } from "react-icons/md";

import './ShortlistPage.css'

const ShortlistPage = () => {
  const [properties, setProperties] = useState([]);
  const [removeHomeDisplay, setRemoveHomeDisplay] = useState('none')
  
  const savedPropertyList = useMemo(() => JSON.parse(localStorage.getItem("saved-properties")) || [], [])

  const handleRemoveHomeClick = (id) => {
    const localIndex = (element) => element.id === id
    const index = savedPropertyList.findIndex(localIndex)
    savedPropertyList.splice(index, 1)
    localStorage.setItem("saved-properties", JSON.stringify(savedPropertyList))
    setRemoveHomeDisplay("block");
  }

  useEffect(() => {
    window.scrollTo(0, 0)
    setProperties(savedPropertyList)
  }, [savedPropertyList])

  function findLowest(prices) {
    if (!prices || typeof prices !== 'object') return 'N/A';
    
    const newPrices = Object.values(prices).filter(price => 
      typeof price === 'number' && !isNaN(price)
    );
    
    if (newPrices.length === 0) return 'N/A';
    
    return Math.min(...newPrices).toString();
  }

  return (
    <div className='shortlist-page'>
      <h2>My Favorites</h2>
      <p className='removed-home-text' style={{display: removeHomeDisplay}}>Home Removed!</p>
      <div className='favorites-container'>
      {properties.map((property, id) => (
        <div className='prop-box' key={id}>
          <div className='prop-img-container' style={{
            backgroundImage: `url(${property?.photos?.[0]?.url || 'default-image-url.jpg'})`
          }}></div>
          <div className='prop-banner'>
            <div className='prop-banner-left'>
              <p>Price:</p>
              <h4>${property.price || 'N/A'}</h4>
            </div>
            <div className='prop-banner-right flex-display'>
              <div className='icon-container flex-display'>
                <TbBed size={32.5}></TbBed>
                <p>{property.bedrooms || 'N/A'}</p>
              </div>
              <div className='icon-container flex-display'>
                <TbBath size={32.5}></TbBath>
                <p>{property.bathrooms || 'N/A'}</p>
              </div>
            </div>
          </div>
          <div className='prop-info'>
            <div className='prop-type-furnished'>
              <h6>{property.propertyType || 'Residential'}</h6>
              <h6>{property.furnished ? 'Furnished' : 'Unfurnished'}</h6>
            </div>
            <div className='address'>
              <MdOutlinePlace size={25} style={{color: "var(--secondary-blue)"}}></MdOutlinePlace>
              <p>{property.formattedAddress || `${property.street || ''}, ${property.city || ''}, ${property.state || ''} ${property.zipcode || ''}`}</p>
            </div>
          </div>
          <div className='prop-link-and-btn'>
              <Link to={`../uni-life/cities-detail-page/${property.city}/property-details-page/${property.id}`}>
                  <div className='prop-link-page'>
                      <GrHomeRounded style={{marginRight: 5}} />
                      <p>View Home</p>
                  </div>
              </Link>
              <div className='remove-btn-container'>
                  <p className='remove-btn' onClick={() => {handleRemoveHomeClick(property.id)}}>Remove Home</p>
              </div>
          </div>
        </div>
      ))}
      </div>
    </div>
  )
}

export default ShortlistPage
