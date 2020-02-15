import React, { useRef, useContext } from 'react';
import GuestContext from '../../context/guestContext/guestContext';
import { GoSearch } from 'react-icons/go';
import styled from 'styled-components';

const Search = styled.div`
    display: flex;
    flex-basis:15%;
    width: 100%;
    border-radius: 6px; 
    text-align: center;
`;

const SearchGuest = () => {
  const { search_Guest, clearSearchGuest } = useContext(GuestContext)
  const guest = useRef('')
  const onchange = e => {
    if (guest.current.value !== '') {
      search_Guest(e.target.value)
    } else {
      clearSearchGuest()
    }
  }
  return (
    <Search>
      <input ref={guest} onChange={onchange} type="text" placeholder="Search Guest by name..." className="search" />
      <GoSearch />
    </Search>
  )
}
export default SearchGuest