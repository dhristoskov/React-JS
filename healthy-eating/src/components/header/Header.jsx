import React, { useEffect, useState, Fragment } from 'react';
import { Link, Redirect  } from "react-router-dom";
import firebase from '../../config/firebase';
import { Auth } from '../context/authContext';

//Header Component
const Header = () => {

    const [userState, setUserState] = useState(null);
    const [userEmail, setUserEmail] = useState("");
    const [routeRedirect, setRouteRedirect] = useState(false);
    
    const {state, dispatch} = React.useContext(Auth);

    useEffect(() => {
        firebase.getUserState().then(user => {
            if(user){
                setUserState(user);
                setUserEmail(user.email);
            }
        });
    });

    const logout = () => {
        firebase.logout();
        setUserState(null);
        setRouteRedirect(true);
        return dispatch({
            type: "LOGOUT",
            payload: {}
        });
    }

    const redirect = routeRedirect;
    if(redirect){
        return <Redirect to="/" />  
    };

    let buttons;
    if(userState != null || state.user.hasOwnProperty("user")){
        buttons = ( <Fragment>
                        <li>Welcome: {userEmail}</li>
                        <li><Link to="/cookbook">My Cookbook</Link></li>   
                        <li><Link to="/account">Account</Link></li>    
                        <li><button className="logout" onClick={logout}>LogOut</button></li>
                    </Fragment> )
    }else{
        buttons = (<Fragment>
                        <li><Link to="/register">Registration</Link></li>
                        <li><Link to="/login">LogIn</Link></li>              
                    </Fragment>
        )
    }

    return (
        <nav>
            <div className="logo">
                <Link to="/"><h2>LOGO</h2></Link>
            </div>
            <div className="settings">
                {buttons}
            </div>
        </nav>
    );
}

export default Header;