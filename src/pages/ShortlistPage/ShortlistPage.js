import React, { useState, useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { TbBath, TbBed } from 'react-icons/tb'
import { GrHomeRounded } from "react-icons/gr";
import { MdOutlinePlace } from "react-icons/md";

import './ShortlistPage.css'


const ShortlistPage = () => {

  const [cityCount, setCityCount] = useState(0)
  const [properties, setProperties] = useState([]);
  const [removeHomeDisplay, setRemoveHomeDisplay] = useState('none')
  
  const savedPropertyList = useMemo(() => JSON.parse(localStorage.getItem("saved-properties")) || [], [])

  const handleRemoveHomeClick = (id) => {
    const localIndex = (element) => element._id === id
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
    const newPrices = []
    for(let [key,value] of Object.entries(prices)) {
    newPrices.push(value)
    }
    let lowest = newPrices[0]
    
    for (let i = 0; i < newPrices.length; i++) {
    if (newPrices[i] < lowest){
        lowest = newPrices[i]
    }
    }
    return `${lowest}`
  }


  return (
    <div className='shortlist-page'>
      <h2>My Favorites</h2>
      <p className='removed-home-text' style={{display: removeHomeDisplay}}>Home Removed!</p>
      <div className='favorites-container'>
      {properties.map((property, id) => (

        <div className='prop-box' key={id}>
          <div className='prop-img-container' style={{backgroundImage: `url(${property?.images[1]})`}}></div>
          <div className='prop-banner'>
            <div className='prop-banner-left'>
              <p>Rooms Starting at:</p>
              <h4>${findLowest(property.bedroom_prices)}</h4>
            </div>
            <div className='prop-banner-right flex-display'>
              <div className='icon-container flex-display'>
                <TbBed size={32.5}></TbBed>
                <p>{property.bedroom_count}</p>
              </div>
              <div className='icon-container flex-display'>
                <TbBath size={32.5}></TbBath>
                <p>{property.bathroom_count}</p>
              </div>
            </div>
          </div>
          <div className='prop-info'>
            <div className='prop-type-furnished'>
              <h6>{property.property_type}</h6>
              <h6>{property.furnished}</h6>
            </div>
            <div className='address'>
              <MdOutlinePlace size={25} style={{color: "var(--secondary-blue)"}}></MdOutlinePlace>
              <p>{property.address.street}, {property.address.city}, {property.address.postcode}</p>
            </div>
          </div>
          <div className='prop-link-and-btn'>
              <Link to={`../uni-life/cities-detail-page/${property.city_id._id}/property-details-page/${property._id}`}>
                  <div className='prop-link-page'>
                      <GrHomeRounded style={{marginRight: 5}} />
                      <p>View Home</p>
                  </div>
              </Link>
              <div className='remove-btn-container'>
                  <p className='remove-btn' onClick={() => {handleRemoveHomeClick(property._id)}}>Remove Home</p>
              </div>
          </div>
        </div>
      ))}
      </div>
    </div>
  )
}

export default ShortlistPage
