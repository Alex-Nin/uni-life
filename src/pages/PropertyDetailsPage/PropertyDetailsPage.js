import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { TbChevronLeft, TbBath, TbBed, TbCheck } from 'react-icons/tb' //TbHeart
import { CiHeart } from 'react-icons/ci';
import { useParams } from 'react-router-dom'
import axios from 'axios'
import './PropertyDetailsPage.css'

const PropertyDetailsPage = () => {

    const [cities, setCities] = useState([]);
    const { prop_id } = useParams();

    useEffect(()=>{
        axios.get('https://unilife-server.herokuapp.com/properties')
        .then((result) => setCities(result.data.data))
        //.then((result) => console.log(result.data.data))
        .catch((err) => console.log(err));
        
    }, []);

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

    function convertObjToArray(prices) {
        const newPrices = []
        for(let [key,value] of Object.entries(prices)) {
          newPrices.push(value)
        }
        return newPrices
    }
    
  return (
    <div className='props-details-page'>
        <Link to='../../cities-detail-page' id='backToSearch'>
        <TbChevronLeft style={{verticalAlign: 'top', marginRight: 11}}></TbChevronLeft>
        <p>Back to Search</p>
        </Link>
        <div className='prop-details-container'>
        {cities?.map((city, id) => (
            city._id === prop_id 
            ?
            <>
                <div className='prop-imgs-container'>
                    <div className='prop-large-img' style={{backgroundImage: `url(${city.images[0]})`}}></div>
                    <div className='prop-small-imgs'>
                        <div style={{backgroundImage: `url(${city.images[1]})`}}></div>
                        <div style={{backgroundImage: `url(${city.images[2]})`}}></div>
                        <div style={{backgroundImage: `url(${city.images[3]})`}}></div>
                    </div>
                </div>
                <div>
                    <div className='prop-details-box-container'>
                        <h2>{city.address.street}, {city.address.city}, {city.address.postcode}</h2>
                        <div className='prop-details-boxes'>
                            <div className='prop-details-box'>
                                <span>Bedrooms</span>
                                <div id='fontStyle' className='center-items'>
                                    <TbBed size={33}></TbBed>
                                    <p>{city.bedroom_count}</p>
                                </div>
                            </div>
                            <div className='prop-details-box'>
                                <label>Bathrooms</label>
                                <div id='fontStyle' className='center-items'>
                                    <TbBath size={33}></TbBath>
                                    <p>{city.bathroom_count}</p>
                                </div>
                            </div>
                            <div className='prop-details-box'>
                                <label>Propety Type</label>
                                <p>{city.property_type}</p>
                            </div>
                            <div className='prop-details-box'>
                                <label>Starting at</label>
                                <p>${findLowest(city.bedroom_prices)}</p>
                            </div>
                            <div className='prop-details-box'>
                                <label>Funished Type</label>
                                <p>{city.furnished}</p>
                            </div>
                            <div className='prop-details-box'>
                                <label>Available From</label>
                                <p>{city.availability}</p>
                            </div>
                        </div>
                    </div>
                    <div className='prop-detials-btns center-items'>
                        <button id='shortlistBtn'>
                        <CiHeart size={23} style={{verticalAlign: 'bottom', marginRight: '5px'}}></CiHeart>
                        Shortlist
                        </button>
                        <button id='bookBiewingBtn'>
                            Book Viewing
                        </button>
                    </div>
                </div>
                <div className='property-description'>
                    <h2 className='prop-description-titles'>Description</h2>
                    <p>{city.property_description}</p>
                </div>
                <div className='prop-bedroom-prices'>
                    <h2 className='prop-description-titles'>Bedroom Prices</h2>
                    <ul>
                        {convertObjToArray(city.bedroom_prices).map((price, id) => (
                            <li key={id}><p>Bedroom {id+1}</p><p>${price} per week</p></li>
                        ))}
                    </ul>
                </div>
                <div className='prop-key-features'>
                    <h2 className='prop-description-titles'>Key Features</h2>
                    <ul>
                        {city.key_features.map((feature, id) => (
                            <li key={id}><TbCheck></TbCheck><p>{feature}</p></li>
                        ))}
                    </ul>
                </div>
            </>
            : null
        ))}
        </div>
    </div>
  )
}

export default PropertyDetailsPage
