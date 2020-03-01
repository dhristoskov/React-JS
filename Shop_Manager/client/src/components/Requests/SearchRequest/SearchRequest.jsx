import React, { useRef, useContext } from 'react';
import RequestContext from '../../../context/requestContext/requestContext';
import { GoSearch } from 'react-icons/go';
import './SearchRequest.css';

const SearchRequest = () => {

    const { search_Request, clearSearchRequest } = useContext(RequestContext);
    const request = useRef('');

    const onchange = (event) => {
        if (request.current.value !== '') {
            search_Request(event.target.value);
        } else {
            clearSearchRequest();
        };
    };

    return (
        <div className="searchContainer">
          <input ref={request} onChange={onchange} type="text"
           placeholder="Търси заявка по име..." className="search" />
          <GoSearch />
        </div>
    )

}

export default SearchRequest;