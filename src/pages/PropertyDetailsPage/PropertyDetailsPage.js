import React, { useEffect, useState, useRef } from 'react'
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

    const divRef = useRef()

    const [iconSavedStyle, setIconSavedStyle] = useState(iconStyle.notSaved)
    const [bookModalDisplay, setBookModalDisplay] = useState('none')
    const [modalPosition, setModalPosition] = useState('-1000px')
    const [property, setProperty] = useState(null)
    const { prop_id, city_name } = useParams()
    const savedPropertyList = JSON.parse(localStorage.getItem("saved-properties")) || []
    const [imgHeight, setImgHeight] = useState('40')
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        window.scrollTo(0, 0);
        setIsLoading(true);
        
        const baseUrl = "https://api.rentcast.io/v1/listings/rental/long-term";
        const headers = {
            "X-Api-Key": process.env.REACT_APP_RENTCAST_API_KEY
        };
        
        // Fetch property details
        axios.get(`${baseUrl}/${prop_id}`, { headers })
            .then(response => {
                setProperty(response.data);
                setIsLoading(false);
            })
            .catch(error => {
                console.error("Error fetching property details:", error);
                setIsLoading(false);
            });
    }, [prop_id]);

    const getElementHeight = () => {
        if(divRef.current) {
            const newHeight = divRef.current.clientHeight;
            setImgHeight(newHeight);
        }
    };

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
    
    useEffect(() =>{
        getElementHeight()
    }, [property]) //Property is used as the dependency because the height needs to rerender when the information is grabbed from the api

    useEffect(() => {
        window.addEventListener("resize", getElementHeight);
    }, []);

    function convertObjToArray(prices) {
        const newPrices = []
        for(let [key,value] of Object.entries(prices)) {
          newPrices.push(value)
        }
        return newPrices
    }
    
  return (
    <div className='props-details-page'>
        <Link to={`../uni-life/cities-detail-page/${city_name}`} id='backToSearch'>
            <TbChevronLeft style={{verticalAlign: 'top', marginRight: 11}}></TbChevronLeft>
            <p>Back to Search</p>
        </Link>
        <div className='prop-details-container'>
            {property !== null ? 
            <>
            <ModalBookViewing 
            address={property.formattedAddress}
            position={modalPosition}
            display={bookModalDisplay} 
            setDisplay={setBookModalDisplay}
            setPosition={setModalPosition}
            />
            <div className='top-container'>
                <div className='prop-imgs-container'>
                    {/* Commented out image code to prevent crashes */}
                    {/* <div className='prop-large-img' style={{backgroundImage: `url(${property.images[0]})`, height: `calc(${imgHeight}px - 5vh`}}></div> */}
                    <div className='prop-large-img' style={{
                        backgroundColor: '#e0e0e0',
                        height: `calc(${imgHeight}px - 5vh`,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <p style={{color: '#555', fontWeight: 'bold'}}>{property.propertyType} - Main View</p>
                    </div>
                    
                    <div className='prop-small-imgs'>
                        {/* Commented out small images */}
                        {/* <div style={{backgroundImage: `url(${property.images[1]})`}}></div>
                        <div style={{backgroundImage: `url(${property.images[2]})`}}></div>
                        <div style={{backgroundImage: `url(${property.images[3]})`}}></div> */}
                        
                        <div style={{
                            backgroundColor: '#d0d0d0',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <p style={{color: '#555'}}>View 1</p>
                        </div>
                        <div style={{
                            backgroundColor: '#d0d0d0',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <p style={{color: '#555'}}>View 2</p>
                        </div>
                        <div style={{
                            backgroundColor: '#d0d0d0',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <p style={{color: '#555'}}>View 3</p>
                        </div>
                    </div>
                </div> {/* props-imgs-container closing div */}
                <div className='props-detail-box-and-detail-btns-container'>
                    <div className='prop-details-box-container' ref={divRef}>
                        <h2>{property.formattedAddress}</h2>
                        <div className='prop-details-boxes'>
                            <div className='prop-details-box'>
                                <label>Bedrooms</label>
                                <div id='fontStyle' className='center-items'>
                                    <TbBed size={33}></TbBed>
                                    <p>{property.bedrooms}</p>
                                </div>
                            </div>
                            <div className='prop-details-box'>
                                <label>Bathrooms</label>
                                <div id='fontStyle' className='center-items'>
                                    <TbBath size={33}></TbBath>
                                    <p>{property.bathrooms}</p>
                                </div>
                            </div>
                            <div className='prop-details-box'>
                                <label>Property Type</label>
                                <p>{property.propertyType}</p>
                            </div>
                            <div className='prop-details-box'>
                                <label>Price</label>
                                <p>${property.price}/month</p>
                            </div>
                            <div className='prop-details-box'>
                                <label>Square Footage</label>
                                <p>{property.squareFootage} sqft</p>
                            </div>
                            <div className='prop-details-box'>
                                <label>Year Built</label>
                                <p>{property.yearBuilt || 'N/A'}</p>
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
                </div> {/* props-detail-box-and-detail-btns-container closing div */}
            </div>
            <div className='description-and-prices'>
                <div className='property-description'>
                    <h2 className='prop-description-titles'>Description</h2>
                    <p>{property.propertyType} located at {property.formattedAddress}. This {property.bedrooms} bedroom, {property.bathrooms} bathroom property is {property.squareFootage} square feet and was built in {property.yearBuilt || 'N/A'}. Currently {property.status.toLowerCase()} for rent at ${property.price}/month.</p>
                </div>
                <div className='prop-bedroom-prices'>
                    <h2 className='prop-description-titles'>Property Details</h2>
                    <ul>
                        <li><p>Monthly Rent</p><p>${property.price}</p></li>
                        <li><p>Property Type</p><p>{property.propertyType}</p></li>
                        <li><p>Lot Size</p><p>{property.lotSize || 'N/A'} sqft</p></li>
                        {property.hoa && property.hoa.fee && <li><p>HOA Fee</p><p>${property.hoa.fee}/month</p></li>}
                        <li><p>Days on Market</p><p>{property.daysOnMarket}</p></li>
                        <li><p>Listing Type</p><p>{property.listingType}</p></li>
                    </ul>
                </div>
            </div>
            <div className='prop-key-features'>
                <h2 className='prop-description-titles'>Key Features</h2>
                <ul>
                    <li><TbCheck></TbCheck><p>{property.bedrooms} Bedroom {property.propertyType}</p></li>
                    <li><TbCheck></TbCheck><p>{property.bathrooms} Bathroom</p></li>
                    <li><TbCheck></TbCheck><p>{property.squareFootage} Square Feet</p></li>
                    {property.yearBuilt && <li><TbCheck></TbCheck><p>Built in {property.yearBuilt}</p></li>}
                    {property.lotSize && <li><TbCheck></TbCheck><p>Lot Size: {property.lotSize} sqft</p></li>}
                    {property.hoa && property.hoa.fee && <li><TbCheck></TbCheck><p>HOA Fee: ${property.hoa.fee}/month</p></li>}
                </ul>
            </div>
            {property.listingAgent && (
                <div className='prop-key-features'>
                    <h2 className='prop-description-titles'>Contact Information</h2>
                    <ul>
                        <li><TbCheck></TbCheck><p>Listing Agent: {property.listingAgent.name}</p></li>
                        <li><TbCheck></TbCheck><p>Phone: {property.listingAgent.phone}</p></li>
                        <li><TbCheck></TbCheck><p>Email: {property.listingAgent.email}</p></li>
                        {property.listingOffice && <li><TbCheck></TbCheck><p>Office: {property.listingOffice.name}</p></li>}
                    </ul>
                </div>
            )}
         </>
            : <p>Your results will be displayed momentarily</p>}
            
        </div>
    </div>
  )
}

export default PropertyDetailsPage
