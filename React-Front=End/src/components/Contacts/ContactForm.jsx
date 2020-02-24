import React, {useState} from 'react';
import axios from 'axios';

const ContactForm = (props) => {

    const [contact, setContact] = useState({
        name: '',
        email: '',
        message: ''
    });

    const {name, email, message} = contact;

    onchange = (event) => {
        setContact({ ...contact, [event.target.name]: event.target.value });
    };
    
    onsubmit = (event) => {
        event.preventDefault();
        axios.post('/send', contact);
    };

    return(
        <div className="contact">
            <h2 className="contactHeader">Contact Me</h2>
            <p className="subName">Send a message anytime you want</p>
            <form className="contactForm" onSubmit={onsubmit}>
                    <input type="text" name="name" placeholder="Your Name" value={name} onChange={onchange} required/>
                    <input type="email" name="email" placeholder="Your Email" value={email} onChange={onchange} required/>
                    <textarea type="text" name="message" placeholder="Your Message"  rows="5" 
                    value={message} onChange={onchange} required/>
                <input type="submit" value="Submit" className="btn"/>
            </form>
        </div>
    )
}

export default ContactForm;