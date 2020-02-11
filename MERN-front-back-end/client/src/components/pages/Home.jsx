import React from 'react';
import GuestForm from '../guests/GuestForm';
import SearchGuest from '../guests/SearchGuest';

const Home = () => {
    return(
        <div>
            <div className="search">
                <SearchGuest />
            </div>
           <GuestForm />
        </div>
    )
}
export default Home;