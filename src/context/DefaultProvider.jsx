import PropTypes from 'prop-types';
import React, { useCallback, useState, useMemo } from 'react';
import DefaultContext from './DefaultContext';
import { fetchRecipes } from '../services/foodAndDrink';

const MOCK_DONE_RCPS = [{
  id: '52977',
  type: 'drink',
  nationality: 'brazilian',
  category: 'Categoria',
  alcoholicOrNot: 'Non Alcoholic',
  name: 'Sopa',
  image: 'Link da imagem',
  doneDate: '2022/01/01',
  tags: ['muito boa', 'dias frios'],
}, {
  id: '52978',
  type: 'meal',
  nationality: 'brazilian',
  category: 'Categoria',
  alcoholicOrNot: 'Non Alcoholic',
  name: 'Sopa',
  image: 'Link da imagem',
  doneDate: '2022/01/01',
  tags: ['difícil', 'para fazer com amigos', 'dias quentes'],
}];

function DefaultProvider({ children }) {
  const [searchedRecipes, setSearchedRecipes] = useState([[]]);
  const [searcheCategories, setSearcheCategories] = useState([]);
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
    MOCK_DONE_RCPS,
  }), [searchedRecipes, searchWord, setSearchWord, executeSearch, searcheCategories]);

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
