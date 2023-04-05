import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CityProvider } from './components/CityContext';

import Banner from './components/Banner/Banner';
import Homepage from './pages/Homepage/Homepage';
import ShortlistPage from './pages/ShortlistPage/ShortlistPage';
import SeeAllCitiesPage from './pages/SeeAllCitiesPage/SeeAllCitiesPage';
import PropertyDetailsPage from './pages/PropertyDetailsPage/PropertyDetailsPage';
import CitiesDetailPage from './pages/CitiesDetailPage/CitiesDetailPage';
import Footer from './components/Footer/Footer';
import AboutUs from './pages/AboutUsTermsPrivacy/AboutUs';
import TermsAndConditions from './pages/AboutUsTermsPrivacy/TermsAndConditions';
import PrivacyPolicy from './pages/AboutUsTermsPrivacy/PrivacyPolicy';

import './App.css';



function App() {

  return (
    <CityProvider>
        <Router>
          <Banner />
            <Routes>
              <Route path="/uni-life" element={<Homepage />} />
              <Route path='/uni-life/shortlist' element={<ShortlistPage />} />
              <Route path="/uni-life/cities-detail-page/:city_id" element={<CitiesDetailPage />} />
              <Route path="/uni-life/see-all-cities-page/" element={<SeeAllCitiesPage />} />
              <Route path='/uni-life/cities-detail-page/:city_id/property-details-page/:prop_id' element={<PropertyDetailsPage />} />
              <Route path='/uni-life/about-us' element={<AboutUs />} />
              <Route path='/uni-life/terms-and-conditions' element={<TermsAndConditions />} />
              <Route path='/uni-life/privacy-policy' element={<PrivacyPolicy />} />
            </Routes>
          <Footer />
        </Router>
    </CityProvider>
  );
  
}

export default App;
