import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { TbChevronLeft, TbBath, TbBed, TbCheck, TbHeart } from 'react-icons/tb'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import ModalBookViewing from '../../components/Modals/ModalBookViewing';
import './PropertyDetailsPage.css'

const PropertyDetailsPage = () => {

    const iconStyle = {
        notSaved:{
            verticalAlign: 'bottom',
            marginRight: '5px',
            strokeWidth: '1.3'
        },
        saved: {
            verticalAlign: 'bottom',
            marginRight: '5px',
            color: 'red',
            strokeWidth: '4'
        }
    }

    const [iconSavedStyle, setIconSavedStyle] = useState(iconStyle.notSaved)
    const [bookModalDisplay, setBookModalDisplay] = useState('none')
    const [modalPosition, setModalPosition] = useState('-1000px')
    const [property, setProperty] = useState(null)
    const { prop_id, city_id } = useParams()
    const savedPropertyList = JSON.parse(localStorage.getItem("saved-properties")) || []

    const handleBookClick = () => {
        setBookModalDisplay('block')
        setModalPosition('250px')
    }

    const handleShortlistClick = (property) => {
        let found = false
        for(let i = 0; i < savedPropertyList.length; i++){
            if (property._id === savedPropertyList[i]._id){
                found = true
            }
        }
        if(!found){
            savedPropertyList.push(property)
            localStorage.setItem("saved-properties", JSON.stringify(savedPropertyList))
        }
        setIconSavedStyle(iconStyle.saved)
    }

    useEffect(()=>{
        window.scrollTo(0, 0)

        axios.get(`https://unilife-server.herokuapp.com/properties/${prop_id}`)
            .then((result) => result !== undefined ? setProperty(result.data) : null)
            .catch((err) => console.log(err));
    }, [prop_id]);

    function convertObjToArray(prices) {
        const newPrices = []
        for(let [key,value] of Object.entries(prices)) {
          newPrices.push(value)
        }
        return newPrices
    }
    
  return (
    <div className='props-details-page'>
        <Link to={`../uni-life/cities-detail-page/${city_id}`} id='backToSearch'>
        <TbChevronLeft style={{verticalAlign: 'top', marginRight: 11}}></TbChevronLeft>
        <p>Back to Search</p>
        </Link>
        <div className='prop-details-container'>
            {property !== null ? 
            <>
            <ModalBookViewing 
            address={property.address}
            position={modalPosition}
            display={bookModalDisplay} 
            setDisplay={setBookModalDisplay}
            setPosition={setModalPosition}
            />
            <div className='prop-imgs-container'>
                <div className='prop-large-img' style={{backgroundImage: `url(${property.images[0]})`}}></div>
                <div className='prop-small-imgs'>
                    <div style={{backgroundImage: `url(${property.images[1]})`}}></div>
                    <div style={{backgroundImage: `url(${property.images[2]})`}}></div>
                    <div style={{backgroundImage: `url(${property.images[3]})`}}></div>
                </div>
            </div>
            <div>
                <div className='prop-details-box-container'>
                    <h2>{property.address.street}, {property.address.city}, {property.address.postcode}</h2>
                    <div className='prop-details-boxes'>
                        <div className='prop-details-box'>
                            <label>Bedrooms</label>
                            <div id='fontStyle' className='center-items'>
                                <TbBed size={33}></TbBed>
                                <p>{property.bedroom_count}</p>
                            </div>
                        </div>
                        <div className='prop-details-box'>
                            <label>Bathrooms</label>
                            <div id='fontStyle' className='center-items'>
                                <TbBath size={33}></TbBath>
                                <p>{property.bathroom_count}</p>
                            </div>
                        </div>
                        <div className='prop-details-box'>
                            <label>Propety Type</label>
                            <p>{property.property_type}</p>
                        </div>
                        <div className='prop-details-box'>
                            <label>Deposit</label>
                            <p>${property.deposit}</p>
                        </div>
                        <div className='prop-details-box'>
                            <label>Funished Type</label>
                            <p>{property.furnished}</p>
                        </div>
                        <div className='prop-details-box'>
                            <label>Available From</label>
                            <p>{property.availability}</p>
                        </div>
                    </div>
                </div>
                <div className='prop-detials-btns center-items'>
                    <button id='shortlistBtn' onClick={() => handleShortlistClick(property)}>
                    <TbHeart size={23} style={iconSavedStyle}></TbHeart>
                    Shortlist
                    </button>
                    <button id='bookViewingBtn' onClick={handleBookClick}>
                        Book Viewing
                    </button>
                </div>
            </div>
            <div className='property-description'>
                <h2 className='prop-description-titles'>Description</h2>
                <p>{property.property_description}</p>
            </div>
            <div className='prop-bedroom-prices'>
                <h2 className='prop-description-titles'>Bedroom Prices</h2>
                <ul>
                    {convertObjToArray(property.bedroom_prices).map((price, id) => (
                        <li key={id}><p>Bedroom {id+1}</p><p>${price} per week</p></li>
                    ))}
                </ul>
            </div>
            <div className='prop-key-features'>
                <h2 className='prop-description-titles'>Key Features</h2>
                <ul>
                    {property.key_features.map((feature, id) => (
                        <li key={id}><TbCheck></TbCheck><p>{feature}</p></li>
                    ))}
                </ul>
            </div>
         </>
            : null }
            
        </div>
    </div>
  )
}

export default PropertyDetailsPage
