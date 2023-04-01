import React, {useState, useEffect} from 'react'
import { useSelectedCity } from '../../components/CityContext'
import { MdOutlinePlace } from "react-icons/md";
import { TbBath, TbBed, TbRuler2 } from 'react-icons/tb'
import { GrHomeRounded } from "react-icons/gr";
import students from '../../assets/students.png';
import axios from 'axios'
import Header from '../../components/Header/Header'
import { Link, useParams } from 'react-router-dom'

import './CitiesDetailPage.css'

const CitiesDetailPage = () => {
  const heading = 'Search Accomodation'
  const paragraph = "Whatever you're after, we can help you find the right student accommodation for you."

  const selectedCity = useSelectedCity()  
  const { city_id } = useParams()
  const [bedDisabled, setBedDisabled] = useState(false)
  const [bathDisabled, setBathDisabled] = useState(false)
  const [priceDisabled, setPriceDisabled] = useState(false)
  const [typeDisabled, setTypeDisabled] = useState(false)
  const [propertyCount, setPropertyCount] = useState(0)
  const [state, setState] = useState({
    bedroom: '0',
    bathroom: '0',
    price: '100000',
    type: 'all'
  })
  const [propertyTypes, setPropertyTypes] = useState([])
  const [city, setCity] = useState([]);
  const [properties, setProperties] = useState([])
  const [filteredResults, setFilteredResults] = useState(properties)

  const handleChange = e => {
    const value = e.target.value
    const name = e.target.name
    setState({
      ...state,
      [name]: value
    })
    if(name === 'bedroom'){
      setFilteredResults(properties.filter(item => item.bedroom_count >= value))
      if(value === '0'){
        setBathDisabled(false)
        setPriceDisabled(false)
        setTypeDisabled(false)
      }else{
        setBathDisabled(true)
        setPriceDisabled(true)
        setTypeDisabled(true)
      }
    }
    else if(name === 'bathroom'){
      setFilteredResults(properties.filter(item => item.bathroom_count >= value))
      if(value === '0'){
        setBedDisabled(false)
        setPriceDisabled(false)
        setTypeDisabled(false)
      }else{
        setBedDisabled(true)
        setPriceDisabled(true)
        setTypeDisabled(true)
      }
    }
    else if(name === 'price'){
      setFilteredResults(properties.filter(item => findLowest(item.bedroom_prices) <= value))
      if(value === '100000'){
        setBedDisabled(false)
        setBathDisabled(false)
        setTypeDisabled(false)
      }else{
        setBedDisabled(true)
        setBathDisabled(true)
        setTypeDisabled(true)
      }
    }
    else if(name === 'type'){
      setFilteredResults(properties.filter(item => item.property_type === value))
      if(value === 'all'){
        setBedDisabled(false)
        setBathDisabled(false)
        setPriceDisabled(false)
      }else{
        setBedDisabled(true)
        setBathDisabled(true)
        setPriceDisabled(true)
      }
    }
  }

  function propsArray(){
    if (filteredResults < 1) {
      return properties
    }
    return filteredResults
  }

  const getStyle = {
    bedrooms: {
      color: state.bedroom !== '0' ? 'var(--primary-black)' : 'var(--border-color)' 
    },
    bathrooms: {
      color: state.bathroom !== '0' ? 'var(--primary-black)' : 'var(--border-color)' 
    },
    price: {
      color: state.price !== '100000' ? 'var(--primary-black)' : 'var(--border-color)'  
    },
    homeType: {
      color: state.type !== 'all' ? 'var(--primary-black)' : 'var(--border-color)' 
    }, 
  }
  

  //Finds the lowest bedroom price
  function findLowest(prices) {
    const newPrices = []
    if(prices !== undefined){
      for(let [key, value] of Object.entries(prices)) {
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
    return
  }

  useEffect(()=>{
    
    axios.get(`https://unilife-server.herokuapp.com/properties/city/${city_id}`)
    .then((result) => setProperties(result.data.response))
    .then(setPropertyCount(properties.length))
    .catch((err) => console.log(err))

    axios.get(`https://unilife-server.herokuapp.com/cities/${city_id}`)
    .then((result) => setCity(result.data.data[0]))
    .catch((err) => console.log(err));

    axios.get('https://unilife-server.herokuapp.com/propertyTypes')
    .then((result) => setPropertyTypes(result.data.response))
    .catch((err) => console.log(err));

  }, [properties]);

  return (

    <>
      <Header heading={heading} paragraph={paragraph}/>
      <div className='dropdown-container'>
        <div className='dropdown-menu'>
            <label>Min Bedroom</label>
            <select id='dropdown' name='bedroom' onChange={handleChange} style={getStyle.bedrooms} value={state.bedroom} disabled={bedDisabled}>
              <option value={'0'}>Any bedroom</option>
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
              <option value={6}>6+</option>
            </select>
        </div>
        <div className='dropdown-menu'>
            <label>Min Bathroom</label>
            <select id='dropdown' name='bathroom' onChange={handleChange} style={getStyle.bathrooms} value={state.bathroom} disabled={bathDisabled}>
              <option value={'0'}>Any bathroom</option>
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3+</option>
            </select>
        </div>
        <div className='dropdown-menu'>
            <label>Max Price</label>
            <select id='dropdown' name='price' onChange={handleChange} style={getStyle.price} value={state.price} disabled={priceDisabled}>
              <option value={'100000'}>Any Price</option>
              <option value={150}>$150</option>
              <option value={200}>$200</option>
              <option value={250}>$250</option>
              <option value={300}>$300</option>
              <option value={350}>$350</option>
              <option value={351}>$351+</option>
            </select>
        </div>
        <div className='dropdown-menu'>
            <label>Home Type</label>
            <select id='dropdown' name='type' onChange={handleChange} style={getStyle.homeType} value={state.type} disabled={typeDisabled}>
              <option value={'all'}>Any type</option>
              {propertyTypes.map((prop, id) =>
              <option key={id} value={prop.name}>{prop.name}</option>
              )}
            </select>
        </div>
      </div>
      <div className='props-container'>
        <h2 className='num-of-props'>{filteredResults < 1 ? propertyCount : filteredResults.length} homes in {selectedCity}</h2>
        <div className='prop-box-container'>
        {propsArray()?.map((property, id) => (
        <div className='prop-box' key={id}>
          <div className='prop-img-container' style={{backgroundImage: `url(${property?.images[1]})`}}></div>
          <div className='prop-banner'>
            <div className='prop-banner-left'>
              <p>Rooms Starting at:</p>
              <h4>${findLowest(property?.bedroom_prices)}</h4>
            </div>
            <div className='prop-banner-right flex-display'>
              <div className='icon-container flex-display'>
                <TbBed size={32.5}></TbBed>
                <p>{property?.bedroom_count}</p>
              </div>
              <div className='icon-container flex-display'>
                <TbBath size={32.5}></TbBath>
                <p>{property?.bathroom_count}</p>
              </div>
            </div>
          </div>
          <div className='prop-info'>
            <div className='prop-type-furnished'>
              <h6>{property?.property_type}</h6>
              <h6>{property?.furnished}</h6>
            </div>
            <div className='address'>
              <MdOutlinePlace size={25} style={{color: "var(--secondary-blue)"}}></MdOutlinePlace>
              <p>{property?.address.street}, {property?.address.city}, {property?.address.postcode}</p>
            </div>
          </div>
          <Link to={`../uni-life/cities-detail-page/${city_id}/property-details-page/${property?._id}`} style={{cursor: 'pointer'}}>
            <div className='prop-link'>
              <GrHomeRounded />
              <p>View Home</p>
            </div>
          </Link>
        </div>
    ))}
        </div>
      </div>
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
        </div>
    </>
  )
}

export default CitiesDetailPage
