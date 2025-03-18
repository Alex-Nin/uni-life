import React from 'react'
import { TbBuildingCommunity } from 'react-icons/tb'

import './Modal.css'

const ModalBookViewing = ({ address, position, display, setDisplay, setPosition }) => {

    const handleExitClick = () => {
        setDisplay('none')
        setPosition('-1000px')
    }

    // Format the address for display in the modal
    const formatAddress = () => {
        if (!address) return "Property Address";
        
        // If address is already a formatted string, use it directly
        if (typeof address === 'string') return address;
        
        // If address is an object with formattedAddress property (from Rentcast API)
        if (address.formattedAddress) return address.formattedAddress;
        
        // Legacy format support
        if (address.street && address.city && address.postcode) {
            return `${address.street}, ${address.city}, ${address.postcode}`;
        }
        
        // Fallback for other formats
        return Object.values(address).filter(Boolean).join(', ');
    }

    return (
        <div className='modal-container' style={{display: display}}>
            <div className='modal' style={{top: position}}>
                <div className='modal-header'>
                    <h2>Book a Viewing</h2>
                    <TbBuildingCommunity 
                    size={70}
                    style={{color: 'var(--secondary-blue)', strokeWidth: '1.5'}}
                    />
                </div>
                <p>{formatAddress()}</p>
                <form className='modal-input-container'>
                    <div className='modal-input-container-left'>
                        <div className='modal-input'>
                            <label htmlFor='name'>Name</label>
                            <input type='text' placeholder='Enter your name' name='name' required />
                        </div>
                        <div className='modal-input'>
                            <label htmlFor='email'>Email</label>
                            <input type='email' placeholder='Enter your email address' name='email' required />
                        </div>
                        <div className='modal-input'>
                            <label htmlFor='number'>Phone Number</label>
                            <input type='number' placeholder='Enter your phone number' name='number' required />
                        </div>
                    </div>
                    <div className='modal-input-container-right'>
                        <div className='modal-input message'>
                            <label>Message</label>
                            <textarea placeholder='Enter a message' />
                        </div>
                        <div className='modal-input'>
                            <button className='modal-btn' id="bookSubmit">Submit</button> 
                            <button className='modal-btn' id="closeModal" onClick={handleExitClick}>Nevermind</button> 
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ModalBookViewing
