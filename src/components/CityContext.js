import React, { useState, useContext } from 'react';

const CityContext = React.createContext() 
const CityUpdateContext = React.createContext() 

export function useSelectedCity() {
    return useContext(CityContext)
}

export function useSetSelectedCity() {
    return useContext(CityUpdateContext)
}

export function CityProvider({ children }) {
    const [selectedCity, setSelectedCity] = useState('0')


    return (
        <CityContext.Provider value={selectedCity}>
            <CityUpdateContext.Provider value={setSelectedCity}>
                {children}
            </CityUpdateContext.Provider>
        </CityContext.Provider>
    )
}