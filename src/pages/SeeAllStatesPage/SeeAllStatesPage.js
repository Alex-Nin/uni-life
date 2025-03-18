import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Header from '../../components/Header/Header';
import AllStatesCard from '../../components/StatesCard/AllStatesCard';
import { states } from '../../data/states';
import './SeeAllStatesPage.css';

// Import all city images
import city1 from '../../assets/city1.jpg';
import city2 from '../../assets/city2.jpg';
import city3 from '../../assets/city3.jpg';
import city4 from '../../assets/city4.jpg';
import city5 from '../../assets/city5.jpg';
import city6 from '../../assets/city6.jpg';
import city7 from '../../assets/city7.jpg';
import city8 from '../../assets/city8.jpg';
import city9 from '../../assets/city9.jpg';
import city10 from '../../assets/city10.jpg';
import city11 from '../../assets/city11.jpg';
import city12 from '../../assets/city12.jpg';
import city13 from '../../assets/city13.jpg';
import city14 from '../../assets/city14.jpg';
import city15 from '../../assets/city15.jpg';
import city16 from '../../assets/city16.jpg';
import city17 from '../../assets/city17.jpg';
import city18 from '../../assets/city18.jpg';
import city19 from '../../assets/city19.jpg';
import city20 from '../../assets/city20.jpg';

const SeeAllStatesPage = () => {
  const heading = 'Student Accommodation';
  const paragraph = 'UniLife has student accommodation available across the US. Select a state to find the right student accommodation for you.';

  // Create an array of all city images
  const stateImages = [
    city1, city2, city3, city4, city5, city6, city7, city8, city9, city10,
    city11, city12, city13, city14, city15, city16, city17, city18, city19, city20
  ];

  useEffect(() => {
    window.scrollTo(0, 0)
  }, []);

  return (
    <div>
      <Header heading={heading} paragraph={paragraph} />
      <div className='states-container'>
        <h3 className='states-container-title'>Search by State</h3>
        <div className='home-cities-box-container'>
          {states.map((state, id) => {
            // Get image based on index, cycling through available images
            const imageIndex = id % stateImages.length;
            const stateImage = stateImages[imageIndex];
            
            return (
              <Link 
                key={id} 
                to={`/uni-life/state-cities/${state.code}`}
              >
                <AllStatesCard 
                  id={id} 
                  state={state.name}
                  image={stateImage}
                />
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  )
}

export default SeeAllStatesPage 