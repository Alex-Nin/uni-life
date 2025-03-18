import React, {useState, useEffect} from 'react'
import { useSelectedCity } from '../../components/CityContext'
import { MdOutlinePlace } from "react-icons/md";
import { TbBath, TbBed } from 'react-icons/tb'
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
  const { city_name } = useParams()
  const [bedDisabled, setBedDisabled] = useState(false)
  const [bathDisabled, setBathDisabled] = useState(false)
  const [priceDisabled, setPriceDisabled] = useState(false)
  const [typeDisabled, setTypeDisabled] = useState(false)
  const [propertyCount, setPropertyCount] = useState(0)
  const [propertyTypes, setPropertyTypes] = useState([])
  const [city, setCity] = useState({name: city_name, student_life: '', universities: ''})
  const [properties, setProperties] = useState([])
  const [filteredResults, setFilteredResults] = useState([])
  const [state, setState] = useState({
    bedroom: '0',
    bathroom: '0',
    price: '100000',
    type: 'all'
  })

  const handleChange = e => {
    const value = e.target.value
    const name = e.target.name
    setState({
      ...state,
      [name]: value
    })
    if(name === 'bedroom'){
      setFilteredResults(properties.filter(item => item.bedrooms >= value))
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
      setFilteredResults(properties.filter(item => item.bathrooms >= value))
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
      setFilteredResults(properties.filter(item => item.price <= value))
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
      setFilteredResults(properties.filter(item => item.propertyType === value))
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
    if (filteredResults.length < 1) {
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

  const url = `https://api.rentcast.io/v1/listings/rental/long-term?city=${city_name}&status=Active`;
  const headers = {
    "X-Api-Key": process.env.REACT_APP_RENTCAST_API_KEY
  };

  useEffect(()=>{
    window.scrollTo(0, 0)
    
    // Fetch properties from the API with city filter already applied
    axios.get(url, {headers})
      .then((result) => {
        // The API already filters by city, so we can use the results directly
        const cityProperties = result.data;
        setProperties(cityProperties);
        setPropertyCount(cityProperties.length);
        
        // Extract unique property types
        const types = new Set();
        cityProperties.forEach(property => {
          if (property.propertyType) {
            types.add(property.propertyType);
          }
        });
        setPropertyTypes(Array.from(types).map(type => ({ name: type })));
        
        console.log("Properties for", city_name, ":", cityProperties);
      })
      .catch((err) => console.log(err));

    // Set basic city info (since we don't have detailed city data in this API)
    setCity({
      name: city_name,
      student_life: `${city_name} offers a vibrant student life with numerous amenities and activities.`,
      universities: `${city_name} is home to several prestigious educational institutions.`
    });

  }, [city_name]);

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
              <option value={1500}>$1500</option>
              <option value={2000}>$2000</option>
              <option value={2500}>$2500</option>
              <option value={3000}>$3000</option>
              <option value={3500}>$3500</option>
              <option value={4000}>$4000+</option>
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
        <h2 className='num-of-props'>{filteredResults.length < 1 ? propertyCount : filteredResults.length} homes in {selectedCity || city_name}</h2>
        <div className='prop-box-container'>
        {propsArray()?.map((property, id) => (
        <div className='prop-box' key={id}>
          <div className='prop-img-container' style={{backgroundImage: `url(https://placehold.co/600x400?text=${property.propertyType}+in+${property.city})`}}></div>
          <div className='prop-banner'>
            <div className='prop-banner-left'>
              <p>Monthly Rent:</p>
              <h4>${property.price}</h4>
            </div>
            <div className='prop-banner-right flex-display'>
              <div className='icon-container flex-display'>
                <TbBed size={32.5}></TbBed>
                <p>{property.bedrooms}</p>
              </div>
              <div className='icon-container flex-display'>
                <TbBath size={32.5}></TbBath>
                <p>{property.bathrooms}</p>
              </div>
            </div>
          </div>
          <div className='prop-info'>
            <div className='prop-type-furnished'>
              <h6>{property.propertyType}</h6>
              <h6>{property.squareFootage} sqft</h6>
            </div>
            <div className='address'>
              <MdOutlinePlace size={25} style={{color: "var(--secondary-blue)"}}></MdOutlinePlace>
              <p>{property.formattedAddress}</p>
            </div>
          </div>
          <Link to={`../uni-life/cities-detail-page/${city_name}/property-details-page/${property.id}`} style={{cursor: 'pointer'}}>
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
