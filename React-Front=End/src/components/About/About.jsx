import React, { Fragment } from 'react';
import ContactFrotm from '../Contacts/ContactForm';

const AboutPage = () => {

    return (
        <Fragment>  
            <div className="image">
                <div className="mainContainer">
                    <div className="split left">
                            <div className="main">
                                <h1 className="aboutText">
                                    <span>My new app<br />that make something interesting</span>
                                    <p className="paragraph">There is a lot interesting things that you can do with this app</p>                       
                                </h1>
                            </div>

                            <div className="aboutBottom">
                                <div className="info1">
                                    <h2>Our new services only for you</h2>
                                    <p>We can give so much<br /> options, so pick one</p>
                                </div>

                                <div className="aboutBottom">
                                    <h2>Our new services only for you</h2>
                                    <p>We can give so much<br /> options, so pick one</p>
                                </div>

                                <div className="aboutBottom">
                                    <h2>Our new services only for you</h2>
                                    <p>We can give so much<br /> options, so pick one</p>
                                </div>
                            </div>
                    </div>
                    <div className="split right">
                        <ContactFrotm />
                    </div>
                </div>
            </div>
        </Fragment>
    );
    
}
export default AboutPage;