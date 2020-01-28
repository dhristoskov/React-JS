import React from 'react';
import Header from '../header/Header';
import Footer from '../footer/Footer';

const AccouontPage = () => (
    <div>
        <Header />
            <h3>User Profile</h3>
            <AccountForm />
        <Footer />
    </div>
);
  
function AccountForm () { 
  return (
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
    );
}

export default AccouontPage;