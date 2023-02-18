import React, {useState, useEffect} from 'react'
import { useSelectedCity } from '../../components/CityContext'
import { MdOutlinePlace } from "react-icons/md";
import { TbBath, TbBed } from 'react-icons/tb'
import students from '../../assets/students.png';
import { GrHomeRounded } from "react-icons/gr";
import axios from 'axios'
import Header from '../../components/Header/Header'
import { Link } from 'react-router-dom'

import './CitiesDetailPage.css'
//Need to add a property cards to handle where the cards go
// need to do an axios call to get each property info
//figure out filtering for react webpages
const CitiesDetailPage = () => {

  const heading = 'Search Accomodation'
  const paragraph = "Whatever you're after, we can help you find the right student accommodation for you."

  const selectedCity = useSelectedCity()  

  const [minBedroom, setMinBedroom] = useState('0')
  const [minBathroom, setMinBathroom] = useState('0')
  const [maxPrice, setMaxPrice] = useState('0')
  const [homeType, setHomeType] = useState('0')
  const [cityCount, setCityCount] = useState(0)
  const [propertyTypes, setPropertyTypes] = useState([])
  const [properties, setProperties] = useState([]);
  const [cities, setCities] = useState([]);
  let cityExist = false

  const handleBedChange = e => {
    setMinBedroom(e.target.value)
  }
  const handleBathChange = e => {
    setMinBathroom(e.target.value)
  }
  const handlePriceChange = e => {
    setMaxPrice(e.target.value)
  }
  const handleHomeTypeChange = e => {
    setHomeType(e.target.value)
  }

  const getStyle = {
    bedrooms: {
      color: minBedroom !== '0' ? 'black' : 'var(--border-color)' 
    },
    bathrooms: {
      color: minBathroom !== '0' ? 'var(--primary-black)' : 'var(--border-color)' 
    },
    price: {
      color: maxPrice !== '0' ? 'var(--primary-black)' : 'var(--border-color)'  
    },
    homeType: {
      color: homeType !== '0' ? 'var(--primary-black)' : 'var(--border-color)' 
    }, 
  }

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

  

  function notNull(city) {
    return city.address !== undefined
  }

  useEffect(()=>{
    axios.get('https://unilife-server.herokuapp.com/properties')
    .then((result) => setProperties(result.data.data))
    //.then((result) => console.log(result.data.data))
    .catch((err) => console.log(err));
    // will need use context to get city and bedroom count from search modal
    // learn filtering
    // the cities route doesnt have all the info for all cities

    axios.get('https://unilife-server.herokuapp.com/cities')
    .then((result) => setCities(result.data.response))
    //.then((result) => console.log(result.data.response))
    .catch((err) => console.log(err));

    axios.get('https://unilife-server.herokuapp.com/propertyTypes')
    .then((result) => setPropertyTypes(result.data.response))
    //.then((result) => console.log(result.data.response))
    .catch((err) => console.log(err));
  }, []);

  function doesExist(selectedCity) {
    for(let i = 0; i < cities.length; i++) {
      if (selectedCity === cities[i]?.name) {
        return cityExist = true
      }
    }
    cityExist = false
  }

  doesExist(selectedCity)

  return (

    <>
      <Header heading={heading} paragraph={paragraph}/>
      <div className='dropdown-container'>
        <div className='dropdown-menu'>
            <label>Min Bedroom</label>
            <select id='dropdown' onChange={handleBedChange} style={getStyle.bedrooms}>
              <option value={'0'}>Any bedroom</option>
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4+</option>
            </select>
        </div>
        <div className='dropdown-menu'>
            <label>Min Bathroom</label>
            <select id='dropdown' onChange={handleBathChange} style={getStyle.bathrooms}>
              <option value={'0'}>Any bathroom</option>
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3+</option>
            </select>
        </div>
        <div className='dropdown-menu'>
            <label>Max Price</label>
            <select id='dropdown' onChange={handlePriceChange} style={getStyle.price}>
              <option value={'0'}>Any Price</option>
            </select>
        </div>
        <div className='dropdown-menu'>
            <label>Home Type</label>
            <select id='dropdown' onChange={handleHomeTypeChange} style={getStyle.homeType}>
              <option value={'0'}>Any type</option>
              {propertyTypes.map((prop, id) =>
              <option key={id} value={prop.name}>{prop.name}</option>
              )}
            </select>
        </div>
      </div>
      <div className='props-container'>
        <h2 className='num-of-props'>{cityCount} homes in {selectedCity}</h2>
        <div className='prop-box-container'>
        {properties.filter(notNull).map((city, id) => (
            selectedCity === city?.city_id.name 
            ?

              <div className='prop-box' key={id}>
                <div className='prop-img-container' style={{backgroundImage: `url(${city?.images[1]})`}}></div>
                <div className='prop-banner'>
                  <div className='prop-banner-left'>
                    <p>Rooms Starting at:</p>
                    <h4>${findLowest(city.bedroom_prices)}</h4>
                  </div>
                  <div className='prop-banner-right flex-display'>
                    <div className='icon-container flex-display'>
                      <TbBed size={32.5}></TbBed>
                      <p>{city.bedroom_count}</p>
                    </div>
                    <div className='icon-container flex-display'>
                      <TbBath size={32.5}></TbBath>
                      <p>{city.bathroom_count}</p>
                    </div>
                  </div>
                </div>
                <div className='prop-info'>
                  <div className='prop-type-furnished'>
                    <h6>{city.property_type}</h6>
                    <h6>{city.furnished}</h6>
                  </div>
                  <div className='address'>
                    <MdOutlinePlace size={25} style={{color: "var(--secondary-blue)"}}></MdOutlinePlace>
                    <p>{city.address.street}, {city.address.city}, {city.address.postcode}</p>
                  </div>
                </div>
                <Link to={`property-details-page/${city._id}`}><div className='prop-link'>
                  <GrHomeRounded></GrHomeRounded>
                  <p>View Home</p>
                </div></Link>
              </div>

            : null
      ))}
        </div>
      </div>
      {
        cityExist 
        ? cities.map((city, id) => (
          selectedCity === city?.name
          ? 
        <div className='city-info-card'>
          <div className='city-info'>
            <h2>Being a student in {city.name}</h2>
            <p>{city.student_life}</p>
            <br/>
            <p>{city.universities}</p>
          </div>
          <div className='city-img'>
            <img alt='students' src={students}/>
          </div>
        </div> : null ))
        : 
        <div className='city-info-card'>
          <div className='city-info'>
            <h2>Being a student in {selectedCity}</h2>
            <p>{selectedCity} is a lively and multicultural city with a large student population. It is quite a compact city, so it is easy to get around and has a community feel. {selectedCity} is the perfect mix of city and town life and has something to offer to anyone who calls it home.</p>
            <br/>
            <p>{selectedCity} is home to three universities, the University of {selectedCity}, {selectedCity} Trinity University and {selectedCity} Beckett University</p>
          </div>
          <div className='city-img'>
            <img alt='students' src={students}/>
          </div>
      </div>
      }
       

      

    </>
  )
}

export default CitiesDetailPage
