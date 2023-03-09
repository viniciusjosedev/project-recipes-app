import React from 'react';
import SearchBar from '../components/SearchBar';
import Recipes from './Recipes';
import styles from '../styles/css/Search.module.css';

function Search() {
  return (
    <main className={ styles.main }>
      <SearchBar />
      <Recipes />
    </main>
  );
}

export default Search;
