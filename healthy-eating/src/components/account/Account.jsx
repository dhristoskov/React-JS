import React, { Fragment } from 'react';
import Header from '../header/Header';
import Footer from '../footer/Footer';

function Account () {
    
    return (
        <Fragment>
            <Header />
                <section className='account-section'>
                    <div className="menu">
                        <ul>
                            <li>Profile</li>
                            <li>Change Password</li>
                            <li>My Recipes</li>
                            <li>More Info</li>
                        </ul>
                    </div>
                    <div className="main-section">
                        <h2>Some information about the account</h2>
                    </div>
                </section>
            <Footer />
        </Fragment>     
    );
}

export default Account;