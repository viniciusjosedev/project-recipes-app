function SearchBar() {
  return (
    <div>
      <h1>Pesquisa</h1>
      <label>
        ingrediente
        <input type="radio" name="search-radio" data-testid="ingredient-search-radio" />
      </label>
      <label>
        nome
        <input type="radio" name="search-radio" data-testid="name-search-radio" />
      </label>
      <label>
        primeira letra
        <input type="radio" name="search-radio" data-testid="first-letter-search-radio" />
      </label>
      <button
        type="button"
        data-testid="exec-search-btn"
      >
        Pesquisar
      </button>
    </div>
  );
}

export default SearchBar;
