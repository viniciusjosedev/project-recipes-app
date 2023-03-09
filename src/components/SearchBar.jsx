import PropTypes from 'prop-types';
import { useContext, useState } from 'react';
import { useLocation } from 'react-router-dom/';
import DefaultContext from '../context/DefaultContext';

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
    <section>
      <h1>Pesquisa</h1>
      <label>
        ingrediente
        <input
          type="radio"
          name="search-radio"
          data-testid="ingredient-search-radio"
          value="ingredient"
          onChange={ ({ target: { value } }) => setInputRadio(
            { option: value, letter: 'i' },
          ) }
        />
      </label>
      <label>
        nome
        <input
          type="radio"
          name="search-radio"
          data-testid="name-search-radio"
          value="name"
          onChange={ ({ target: { value } }) => setInputRadio(
            { option: value, letter: 's' },
          ) }
        />
      </label>
      <label>
        primeira letra
        <input
          type="radio"
          name="search-radio"
          value="firstLetter"
          data-testid="first-letter-search-radio"
          onChange={ ({ target: { value } }) => setInputRadio(
            { option: value, letter: 'f' },
          ) }
        />
      </label>
      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ () => handleSearch() }
      >
        Pesquisar
      </button>
    </section>
  );
}

SearchBar.propTypes = {
  render: PropTypes.any,
}.isRequired;

export default SearchBar;
