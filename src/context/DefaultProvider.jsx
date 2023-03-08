import PropTypes from 'prop-types';
import React, { useCallback, useState, useMemo } from 'react';
import DefaultContext from './DefaultContext';
import { fetchRecipes } from '../services/foodAndDrink';

function DefaultProvider({ children }) {
  const [searchedRecipes, setSearchedRecipes] = useState([[]]);
  const [searcheCategories, setSearcheCategories] = useState([]);
  const [details, setDetails] = useState({});
  const [searchWord, setSearchWord] = useState('');

  const executeSearch = useCallback(async (searchType, category) => {
    try {
      const searchResults = await fetchRecipes(searchType, searchWord, category);
      setSearchedRecipes(searchResults);
    } catch (e) {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
    }
  }, [searchWord]);

  const values = useMemo(() => ({
    searchedRecipes,
    searchWord,
    setSearchWord,
    executeSearch,
    setSearchedRecipes,
    setSearcheCategories,
    searcheCategories,
    details,
    setDetails,
  }), [searchedRecipes, searchWord,
    setSearchWord, executeSearch, searcheCategories, details]);

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
