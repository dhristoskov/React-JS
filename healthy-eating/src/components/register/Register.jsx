import React, { Fragment } from "react";
import Header from "../header/Header";
import Footer from "../footer/footer";

function Register () {
    return ( 

        <Fragment>
            <Header />
            <form className="registration-form">
                <div>
                    <input type="text" id="rname" placeholder="Name" required></input>
                </div>
                <div>
                    <input type="text" id="username" placeholder="Username" required></input>
                </div>
                <div>
                    <input type="email" id="email" placeholder="E-mail" required></input>
                </div>
                <div>
                    <input type="password" id="password" placeholder="Password" required></input>
                </div>
                <div>
                    <input type="password" id="repeatPassword" placeholder="Repeat Password" required></input>
                </div>
                <button type="submit">Register</button>
            </form>
            <Footer />
        </Fragment>
    );
}

export default Register;