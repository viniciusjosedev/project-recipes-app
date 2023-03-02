import PropTypes from 'prop-types';
import React, { useCallback, useState, useMemo } from 'react';
import DefaultContext from './DefaultContext';
import { fetchRecipes } from '../services/foodAndDrink';

function DefaultProvider({ children }) {
  const [searchedRecipes, setSearchedRecipes] = useState([]);

  const executeSearch = useCallback(async (inputRadio, searchWord, category) => {
    const searchResults = await fetchRecipes(inputRadio, searchWord, category);
    console.log(searchResults);
    setSearchedRecipes(searchResults);
  }, []);

  const values = useMemo(() => ({
    searchedRecipes,
    executeSearch,
  }), [searchedRecipes, executeSearch]);

  return (
    <DefaultContext.Provider value={ values }>
      {children}
    </DefaultContext.Provider>
  );
}

DefaultProvider.propTypes = {
  children: PropTypes.any,
}.isRequired;

export default DefaultProvider;
