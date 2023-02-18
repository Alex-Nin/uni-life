import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Banner from './components/Banner/Banner';
import Homepage from './pages/Homepage/Homepage';
import CitiesDetailPage from './pages/CitiesDetailPage/CitiesDetailPage';
import SeeAllCitiesPage from './pages/SeeAllCitiesPage/SeeAllCitiesPage';
import PropertyDetailsPage from './pages/PropertyDetailsPage/PropertyDetailsPage';
import Footer from './components/Footer/Footer';
import AboutUs from './pages/AboutUsTermsPrivacy/AboutUs';
import TermsAndConditions from './pages/AboutUsTermsPrivacy/TermsAndConditions';
import PrivacyPolicy from './pages/AboutUsTermsPrivacy/PrivacyPolicy';
import { CityProvider } from './components/CityContext';

import './App.css';


function App() {


  return (
    <CityProvider>
        <Router>
          <Banner />
            <Routes>
              <Route path="/uni-life" element={<Homepage />} />
              <Route path="/cities-detail-page" element={<CitiesDetailPage />} />
              <Route path="/see-all-cities-page" element={<SeeAllCitiesPage />} />
              <Route path='/cities-detail-page/property-details-page/:prop_id' element={<PropertyDetailsPage />} />
              <Route path='about-us' element={<AboutUs />} />
              <Route path='terms-and-conditions' element={<TermsAndConditions />} />
              <Route path='privacy-policy' element={<PrivacyPolicy />} />
            </Routes>
          <Footer />
        </Router>
    </CityProvider>
  );
}

export default App;
