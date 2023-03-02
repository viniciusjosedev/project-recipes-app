import { useState } from 'react';
import { fetchRecipes } from '../services/foodAndDrink';

function SearchBar() {
  const [inputRadio, setInputRadio] = useState({});
  const [searchWord, setSearchWord] = useState('');

  const handleSearch = async () => {
    console.log(await fetchRecipes(inputRadio, searchWord));
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
          value="nome"
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
          value="primeira-letra"
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
