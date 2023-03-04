import React from 'react';
import SearchBar from '../components/SearchBar';
import Recipes from './Recipes';

function Search() {
  return (
    <div>
      <SearchBar />
      <Recipes />
    </div>
  );
}

export default Search;
