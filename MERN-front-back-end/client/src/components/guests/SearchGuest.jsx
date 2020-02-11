import React from 'react';
import { FaSearch } from 'react-icons/fa';

const SearchRecipe = () => {

    return (
        <div>
          <input type="text" placeholder="Search Recipe by name..." className="search" />
          <i><FaSearch /></i> 
        </div>
    )

}

export default SearchRecipe;