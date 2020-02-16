import React, { useContext, useEffect } from 'react';
import { CSSTransition } from 'react-transition-group';
import GuestItem from './GuestSettings';
import GuestContext from '../../context/guestContext/guestContext';
import AuthContext from '../../context/authContext/authContext';
import styled from 'styled-components';

const List = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    max-width: 90%;
    margin: auto;
    margin-top:3.5rem;
    padding: 1rem;
`;



const GuestsList = () => {

  const context = useContext(GuestContext)
  const { loading } = useContext(AuthContext)
  const { guests, guestFilter, searchGuest, getGuests } = context
  useEffect(() => {
    getGuests();
    // eslint-disable-next-line
  }, []);

  if (guests === null || guests.length === 0) {
    return <h3 className="no-guest">{loading ? 'Loading guests...' : 'Please add a guest'}</h3>
  }

  return (
    <div >
      <List>
        {searchGuest !== null ? searchGuest.map(guest => (
          <CSSTransition key={guest._id} timeout={300}
            classNames='item' >
            <GuestItem guest={guest} />
          </CSSTransition>)) :
          guests.filter(guest => !guestFilter || guest.isconfirmed).map(guest => (<CSSTransition key={guest._id} timeout={300}
            classNames='item'>
            <GuestItem guest={guest} />
          </CSSTransition>)
          )}
      </List>
    </div>
  )
}
export default GuestsList