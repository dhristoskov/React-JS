import React, { Fragment } from 'react';

const LandingPage = () => {

    return (
        <Fragment>
            <div className="backgroundimg">   
                <main>
                    <h1 className="text">
                        <span>My new app<br />that make something interesting</span>
                        <p className="paragraph">There is a lot interesting things that you can do with this app</p>
                        <div className="btn">
                            <button>Book a Table</button>
                        </div>
                    </h1>
                </main>

                <div className="bottom">
                    <div className="info1">
                        <h2>Our new services only for you</h2>
                        <p>We can give so much<br /> options, so pick one</p>
                    </div>

                    <div className="info2">
                        <h2>Our new services only for you</h2>
                        <p>We can give so much<br /> options, so pick one</p>
                    </div>

                    <div className="info3">
                        <h2>Our new services only for you</h2>
                        <p>We can give so much<br /> options, so pick one</p>
                    </div>
                </div>
            </div> 
        </Fragment>
    );
    
}
export default LandingPage;