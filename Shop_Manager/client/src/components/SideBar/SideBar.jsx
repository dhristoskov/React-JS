import React, { Fragment } from 'react'
import { Link } from 'react-router-dom';
import AuthContext from '../../context/authContext/authContext';
import { useContext } from 'react';
import { MdCreate, 
         MdNoteAdd, 
         MdDataUsage, 
         MdDateRange,
       } from 'react-icons/md'
import './SideBar.css';


const SideBar = () => {

    const { isAuthenticated } = useContext(AuthContext);

    const isGuestUser = (
        <div></div>
    )

    const isLoggedIn = (
        <aside className="sidebar">
            <ul className="asideSettings">
            <Link to='/addshops' style={{textDecoration: 'none'}}>
                <li className="active"><MdCreate/><span>Създай обект</span></li></Link>
            <Link to='/create' style={{textDecoration: 'none'}}>
                <li className="active"><MdNoteAdd /><span>Създай заявка</span></li></Link>
            <Link to='/reqlist' style={{textDecoration: 'none'}}>
                <li className="active"><MdDataUsage /><span>Преглед</span></li></Link>
            <li className="active"><MdDateRange /><span>Календар</span></li>
            </ul>
        </aside>

    );

    return(
        <Fragment>
            { isAuthenticated ? isLoggedIn : isGuestUser} 
        </Fragment> 
    );
}

export default SideBar;