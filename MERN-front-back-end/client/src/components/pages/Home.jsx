import React from 'react';
import styled from 'styled-components';
import GuestForm from '../guests/GuestForm';
import SearchGuest from '../guests/SearchGuest';
import CountGuestDiet from '../guests/CountGuestDiet';
import GuestList from '../guests/GuestList';

const Container = styled.div`
    max-width: 75rem;
    margin: auto;
`;

const Main = styled.div` 
    display: flex;
    justify-content: space-around;
    align-items: flex-start;
`;

const Search = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 0 1rem;
    align-items: baseline;
    margin-top:1rem;
    width: 30%;
    flex-wrap: wrap;
`;

const Home = () => {
    return(
        <Container>
            <Main>
                <Search>
                    <SearchGuest />
                </Search>
                    <GuestForm />
                    <CountGuestDiet />
            </Main>
            <GuestList />
        </Container>
    )
}
export default Home;