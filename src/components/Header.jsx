import React, { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import funcNameHeader from '../helpers/nameHeader';
import DefaultContext from '../context/DefaultContext';
import style from '../styles/css/Header.module.css';

function Header({ history: { location: { pathname } } }) {
  const [nameHeader, setNameHeader] = useState(['']);
  const [inputSearch, setInputSearch] = useState(false);
  const { setSearchWord } = useContext(DefaultContext);

  useEffect(() => {
    function init() {
      setNameHeader(funcNameHeader(pathname));
    }
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <header className={ style.header } id={ style.teste }>
      <h1 data-testid="page-title">{nameHeader[0]}</h1>
      <Link to="/profile">
        {' '}
        <img src={ profileIcon } data-testid="profile-top-btn" alt="" />
      </Link>
      { nameHeader[1] && (
        <button
          onClick={ () => setInputSearch(!inputSearch) }
        >
          <img src={ searchIcon } data-testid="search-top-btn" alt="" />
        </button>
      ) }
      { inputSearch && (
        <input
          type="text"
          data-testid="search-input"
          onChange={ ({ target: { value } }) => setSearchWord(value) }
        />
      ) }
    </header>
  );
}

export default Header;

Header.propTypes = {
  history: PropTypes.any,
  location: PropTypes.any,
  pathname: PropTypes.any,
}.isRequired;
