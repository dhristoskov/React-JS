import React, { Fragment } from 'react';
import Header from '../header/Header';
import Footer from '../footer/Footer';

function Cookbook () {
    
    return (
        <Fragment>
            <Header />
                <section className='cookbook-section'>
                    <div className="menu">
                        <ul>
                            <li>All Recipes</li>
                            <li>More Info</li>
                        </ul>
                    </div>
                    <div className="main-section">
                        <h2>My recipes list</h2>
                    </div>
                </section>
            <Footer />
        </Fragment>     
    );
}

export default Cookbook;