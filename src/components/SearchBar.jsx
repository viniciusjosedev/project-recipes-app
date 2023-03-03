import { useContext, useState } from 'react';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import DefaultContext from '../context/DefaultContext';

function SearchBar() {
  const [inputRadio, setInputRadio] = useState({});
  const [searchWord, setSearchWord] = useState('');
  const { pathname } = useLocation();

  const { executeSearch } = useContext(DefaultContext);

  const handleSearch = () => {
    if (inputRadio.option === 'firstLetter' && searchWord.length > 1) {
      global.alert('Your search must have only 1 (one) character');
    }
    const categorySearch = pathname.split('/')[2];
    executeSearch(inputRadio, searchWord, categorySearch);
  };

  return (
    <div>
      <h1>Pesquisa</h1>
      <input
        type="text"
        placeholder="termo de busca"
        value={ searchWord }
        onChange={ ({ target: { value } }) => setSearchWord(value) }
      />
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
    </div>
  );
}

export default SearchBar;
