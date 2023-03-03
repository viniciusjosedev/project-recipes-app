import React from 'react';
import SearchBar from '../components/SearchBar';
import Header from '../components/Header';
import Recipes from './Recipes';

function Search(props) {
  return (
    <div>
      <Header { ...props } />
      <SearchBar />
      <Recipes />
    </div>
  );
}

export default Search;
