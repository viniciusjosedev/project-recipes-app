import PropTypes from 'prop-types';
import { useContext, useState } from 'react';
import { useLocation } from 'react-router-dom/';
import DefaultContext from '../context/DefaultContext';
import styles from '../styles/css/SearchBar.module.css';

function SearchBar() {
  const [inputRadio, setInputRadio] = useState({});
  const { pathname } = useLocation();

  const { executeSearch, searchWord } = useContext(DefaultContext);

  const handleSearch = () => {
    if (inputRadio.option === 'firstLetter' && searchWord.length > 1) {
      global.alert('Your search must have only 1 (one) character');
    }
    const categorySearch = pathname.split('/')[1];
    executeSearch(inputRadio, categorySearch);
  };

  return (
    <div className={ styles.divSearchBar }>
      <div className={ styles.divRadioButtons }>
        <label>
          <input
            type="radio"
            name="search-radio"
            data-testid="ingredient-search-radio"
            value="ingredient"
            onChange={ ({ target: { value } }) => setInputRadio(
              { option: value, letter: 'i' },
            ) }
          />
          Ingredient
        </label>
        <label>
          <input
            type="radio"
            name="search-radio"
            data-testid="name-search-radio"
            value="name"
            onChange={ ({ target: { value } }) => setInputRadio(
              { option: value, letter: 's' },
            ) }
          />
          Name
        </label>
        <label>
          <input
            type="radio"
            name="search-radio"
            value="firstLetter"
            data-testid="first-letter-search-radio"
            onChange={ ({ target: { value } }) => setInputRadio(
              { option: value, letter: 'f' },
            ) }
          />
          First letter
        </label>
      </div>
      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ () => handleSearch() }
      >
        Search
      </button>
    </div>
  );
}

SearchBar.propTypes = {
  render: PropTypes.any,
}.isRequired;

export default SearchBar;
