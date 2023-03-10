import React from 'react';
import Recipes from './Recipes';
import styles from '../styles/css/Search.module.css';

function Search() {
  return (
    <main className={ styles.main }>
      <Recipes />
    </main>
  );
}

export default Search;
