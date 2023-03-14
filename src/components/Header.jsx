import React, { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import profileIcon from '../styles/images/profileIcon.svg';
import searchIcon from '../styles/images/searchIcon.svg';
import funcNameHeader from '../helpers/nameHeader';
import DefaultContext from '../context/DefaultContext';
import styles from '../styles/css/Header.module.css';
import homeRecipesApp from '../styles/images/homeRecipesApp.svg';
import iconePrato from '../styles/images/iconePrato.svg';
import iconeTaca from '../styles/images/iconeTaca.svg';
import SearchBar from './SearchBar';
import iconDoneRecipes from '../styles/images/iconDoneRecipes.svg';
import iconFavorites from '../styles/images/iconFavorites.svg';
import iconPerfil from '../styles/images/iconPerfil.svg';

function Header({ history: { location: { pathname } } }) {
  const [nameHeader, setNameHeader] = useState(['']);
  const [inputSearch, setInputSearch] = useState(false);
  const { setSearchWord } = useContext(DefaultContext);

  const funcGetImage = (path) => {
    if (path === 'profile') return iconPerfil;
    if (path === 'done-recipes') return iconDoneRecipes;
    if (path === 'meals') return iconePrato;
    if (path === 'drinks') return iconeTaca;
    return iconFavorites;
  };

  useEffect(() => {
    function init() {
      setNameHeader(funcNameHeader(pathname));
    }
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <header className={ styles.header }>
      <div className={ styles.divHeader }>
        <Link to="/meals">
          <img
            className={ styles.imageHomeRecipeApp }
            src={ homeRecipesApp }
            alt="logo Home"
          />
        </Link>
        <div>
          { nameHeader[1] && (
            <button
              onClick={ () => setInputSearch(!inputSearch) }
            >
              <img src={ searchIcon } data-testid="search-top-btn" alt="" />
            </button>
          ) }
          <Link to="/profile">
            {' '}
            <img src={ profileIcon } data-testid="profile-top-btn" alt="" />
          </Link>
        </div>
      </div>
      <div className={ styles.divTitleAndSearch }>
        <img src={ funcGetImage(pathname.split('/')[1]) } alt="" />
        <h1 data-testid="page-title">{nameHeader[0]}</h1>
        { inputSearch && (
          <>
            <input
              type="text"
              placeholder="Search"
              data-testid="search-input"
              onChange={ ({ target: { value } }) => setSearchWord(value) }
            />
            <SearchBar />
          </>
        ) }
      </div>
    </header>
  );
}

export default Header;

Header.propTypes = {
  history: PropTypes.any,
  location: PropTypes.any,
  pathname: PropTypes.any,
}.isRequired;
