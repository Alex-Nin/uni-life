# UniLife Student Accommodation Finder

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
10. [Future Enhancements](#future-enhancements)

## Introduction

UniLife is a comprehensive web application designed to help students find suitable accommodation near their universities. The platform provides an intuitive interface for browsing properties across various cities in the UK, filtering based on preferences, and saving favorite properties for later reference.

The application was built using React.js and integrates with the UniLife API (https://unilife-server.herokuapp.com) to fetch real-time data about cities, properties, and accommodation details.

## Features

- **City-based Property Search**: Browse properties by selecting cities from a comprehensive list
- **State/Region Navigation**: Filter cities by state or region for more targeted searches
- **Property Details**: View comprehensive information about each property including:
  - Rental price
  - Number of bedrooms and bathrooms
  - Property type (house, apartment, studio)
  - Furnished status
  - Address and location
  - Property images
- **Shortlist Functionality**: Save favorite properties to a personalized shortlist
- **Responsive Design**: Fully responsive interface that works on desktop, tablet, and mobile devices

## Technical Architecture

The application follows a component-based architecture using React.js. Key technical aspects include:

- **React Router**: For navigation between different pages
- **Context API**: For managing global state (like selected city)
- **localStorage**: For persisting user preferences and shortlisted properties
- **CSS Modules**: For component-specific styling
- **Axios**: For API requests to the UniLife server

## API Integration

The application integrates with the UniLife API (https://unilife-server.herokuapp.com) which provides endpoints for:

- Fetching all available cities
- Getting cities by state/region
- Retrieving detailed property information
- Searching properties based on various criteria

Key API endpoints used:

- `/cities` - Get all cities
- `/cities/byState/{state}` - Get cities by state
- `/properties/city/{cityId}` - Get properties by city
- `/properties/{propertyId}` - Get detailed information about a specific property

## Pages and Components

### Pages
1. **Homepage**: Landing page with search functionality and featured cities
2. **SeeAllCitiesPage**: Displays all available cities
3. **SeeAllStatesPage**: Shows all states/regions with city counts
4. **StateCitiesPage**: Lists all cities within a selected state
5. **CitiesDetailPage**: Shows all properties in a selected city
6. **PropertyDetailsPage**: Displays comprehensive details about a specific property
7. **ShortlistPage**: Shows all properties saved by the user

### Key Components
1. **Header**: Navigation and branding
2. **Footer**: Contact information and social links
3. **SearchModal**: City search functionality
4. **CityCard**: Displays city information with image
5. **PropertyCard**: Shows property preview with key details
6. **PropertyDetailsCard**: Comprehensive property information display

## User Flows

1. **City-based Search**:
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
   - User clicks "Add to Shortlist" on a property
   - Property is saved to localStorage
   - User can view all shortlisted properties on the ShortlistPage
   - User can remove properties from their shortlist

## Data Management

- **City Data**: Fetched from the API and stored in component state
- **Property Data**: Fetched based on selected city and stored in component state
- **User Preferences**: Stored in Context API for cross-component access
- **Shortlisted Properties**: Stored in localStorage for persistence between sessions

## Styling

The application uses a consistent design language with:

- A clean, modern interface with ample white space
- A blue and white color scheme reflecting the UniLife brand
- Responsive grid layouts for property and city cards
- Interactive elements with hover effects
- Consistent typography and spacing

## Installation and Setup

1. Copy and paste the following URL into your web browser: https://alex-nin.github.io/uni-life/ 

## Future Enhancements

The original application had several areas identified for potential enhancement:

- User authentication for personalized experiences
- Advanced filtering options for property searches
- Map integration for location-based property browsing
- Direct messaging with property owners/managers
- Reviews and ratings for properties
- University information integration