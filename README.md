# UniLife Student Accommodation Finder

> **DISCLAIMER:** This application has been refactored to work with the Rentcast API due to the original UniLife dedicated server being shut down. The core functionality remains the same, but the data structure and API integration have been updated. Navigate to the [OldReadme](src/OldReadme/README.md) for more information.

## Table of Contents
1. [Introduction](#introduction)
2. [Features](#features)
3. [Technical Architecture](#technical-architecture)
4. [API Integration](#api-integration)
5. [Pages and Components](#pages-and-components)
6. [User Flows](#user-flows)
7. [Data Management](#data-management)
8. [Styling](#styling)
9. [Installation and Setup](#installation-and-setup)
10. [API Key Configuration](#api-key-configuration)
11. [Future Enhancements](#future-enhancements)

## Introduction

UniLife is a comprehensive web application designed to help students find suitable accommodation near their universities. The platform provides an intuitive interface for browsing properties across various cities in the United States, filtering based on preferences, and saving favorite properties for later reference.

The application was built using React.js and now integrates with the Rentcast API to fetch real-time data about properties across different states and cities in the US.

## Features

- **State and City-based Property Search**: Browse properties by selecting states and cities from comprehensive lists
- **Property Details**: View comprehensive information about each property including:
  - Rental price
  - Number of bedrooms and bathrooms
  - Property type
  - Address and location
  - Property images
- **Shortlist Functionality**: Save favorite properties to a personalized shortlist
- **Responsive Design**: Fully responsive interface that works on desktop, tablet, and mobile devices

## Technical Architecture

The application follows a component-based architecture using React.js. Key technical aspects include:

- **React Router**: For navigation between different pages
- **Context API**: For managing global state (like selected city)
- **localStorage**: For persisting user preferences and shortlisted properties
- **CSS**: For component-specific styling
- **Axios**: For API requests to the Rentcast API
- **Environment Variables**: For secure API key management

## API Integration

The application now integrates with the Rentcast API which provides endpoints for:

- Fetching properties by state
- Fetching properties by city
- Retrieving detailed property information by ID

Key API endpoints used:

- `https://api.rentcast.io/v1/listings/rental/long-term?state={stateCode}` - Get properties by state
- `https://api.rentcast.io/v1/listings/rental/long-term?city={cityName}` - Get properties by city
- `https://api.rentcast.io/v1/listings/rental/long-term/{propertyId}` - Get detailed information about a specific property

## Pages and Components

### Pages
1. **Homepage**: Landing page with search functionality and featured states
2. **SeeAllStatesPage**: Shows all states with navigation to city listings
3. **StateCitiesPage**: Lists all cities within a selected state
4. **CitiesDetailPage**: Shows all properties in a selected city
5. **PropertyDetailsPage**: Displays comprehensive details about a specific property
6. **ShortlistPage**: Shows all properties saved by the user

### Key Components
1. **Header**: Navigation and branding
2. **Footer**: Contact information and social links
3. **SearchModal**: State and city search functionality
4. **StatesCard**: Displays state information with image
5. **CitiesCard**: Displays city information with image
6. **PropertyCard**: Shows property preview with key details

## User Flows

1. **State and City-based Search**:
   - User selects a state from the dropdown
   - User selects a city from the filtered city list
   - User is directed to the CitiesDetailPage showing all properties in that city

2. **Browse by State**:
   - User navigates to "States" page
   - User selects a state
   - User is shown all cities in that state
   - User selects a city to view properties

3. **Property Details**:
   - User clicks on a property card
   - User is directed to the PropertyDetailsPage
   - User can view all details and images of the property

4. **Shortlisting**:
   - User can add properties to their shortlist
   - Properties are saved to localStorage
   - User can view all shortlisted properties on the ShortlistPage
   - User can remove properties from their shortlist

## Data Management

- **State Data**: Stored in a static data file
- **City Data**: Dynamically extracted from property data returned by the API
- **Property Data**: Fetched based on selected state or city and stored in component state
- **User Preferences**: Stored in Context API for cross-component access
- **Shortlisted Properties**: Stored in localStorage for persistence between sessions

## Styling

The application maintains its consistent design language with:

- A clean, modern interface with ample white space
- A blue and white color scheme reflecting the UniLife brand
- Responsive grid layouts for property and city cards
- Interactive elements with hover effects
- Consistent typography and spacing
- Improved responsive design for better mobile experience

## Installation and Setup

1. Copy and paste the following URL into your web browser: https://alex-nin.github.io/uni-life/ 

## API Key Configuration

This application requires a Rentcast API key to function. Follow these steps to configure it:

1. Create a `.env` file in the root directory of the project
2. Add the following line to the file:
   ```
   REACT_APP_RENTCAST_API_KEY=your_api_key_here
   ```
3. Replace `your_api_key_here` with your actual Rentcast API key
4. Restart the development server if it's already running

Note: The `.env` file is included in `.gitignore` to prevent exposing your API key in version control.

## Future Enhancements

Potential areas for future enhancement include:

- Advanced filtering options for property searches
- Map integration for location-based property browsing
- User authentication for personalized experiences
- Direct messaging with property owners/managers
- Reviews and ratings for properties
- University information integration
- Expanded property details and amenities information