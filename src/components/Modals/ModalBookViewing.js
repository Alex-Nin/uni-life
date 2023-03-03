import React from 'react'
import { TbBuildingCommunity } from 'react-icons/tb'

import './Modal.css'

const ModalBookViewing = ({ address, position, display, setDisplay, setPosition }) => {


    const handleExitClick = () => {
        setDisplay('none')
        setPosition('-1000px')
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
            <p>{address.street}, {address.city}, {address.postcode}</p>
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
                        <input type='number' placeholder='Enter your phone number' name='number'required />
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
