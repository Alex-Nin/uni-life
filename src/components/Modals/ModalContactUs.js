import React from 'react'
import { TbMailbox } from 'react-icons/tb'

import './Modal.css'

const ModalContactUs = ({ position, display, setDisplay, setPosition }) => {

    const handleExitClick = () => {
        setDisplay('none')
        setPosition('-1000px')
    }

  return (
    <div className='modal-container' style={{display: display}}>
        <div className='modal' style={{top: position}}>
            <div className='modal-header'>
                <h2>Contact Us</h2>
                <TbMailbox 
                size={70}
                style={{color: 'var(--secondary-blue)', strokeWidth: '1.5'}}
                />
            </div>
            <p>
                Feel free to contact us if you have any questions.
                <br />
                Looking forward to hear from you.
            </p>
            <form className='modal-input-container'>
                <div className='modal-input-container-left'>
                    <div className='modal-input'>
                        <label>Name</label>
                        <input type='text' placeholder='Enter your name' required />
                    </div>
                    <div className='modal-input'>
                        <label>Email</label>
                        <input type='email' placeholder='Enter your email address' required />
                    </div>
                    <div className='modal-input'>
                        <label>Phone Number</label>
                        <input type='number' placeholder='Enter your phone number' required />
                    </div>
                </div>
                <div className='modal-input-container-right'>
                    <div className='modal-input'>
                        <label>Are you a...</label>
                        <select id="status">
                            <option value="under-graduate">Under Graduate</option>
                            <option value="graduate">Graduate</option>
                            <option value="Military">Military</option>
                            <option value="Veteran">Veteran</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                    <div className='modal-input message'>
                        <label>Message</label>
                        <textarea placeholder='Enter a message' />
                    </div>
                    <div className='modal-input'>
                        <button className='modal-btn' id="contactSubmit">Submit</button>
                        <button className='modal-btn' id="closeModal" onClick={handleExitClick}>Nevermind</button> 
                    </div>
                </div>    
            </form>
        </div>
    </div>
  )
}

export default ModalContactUs
