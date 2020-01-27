import React, { Fragment } from "react";
import Header from "../header/Header";
import Footer from "../footer/footer";


function Home () {
    
    return(
        <Fragment>
            <Header />
            <h2>Welcome Home</h2>
            <Footer />
        </Fragment>
    );
}

export default Home;