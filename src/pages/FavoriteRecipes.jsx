import { useState } from 'react';
import FavoriteRecipeCard from '../components/FavoriteRecipeCard';

const MOCK_FAVORITE_RCPS = [{
  id: '52977',
  type: 'drink',
  nationality: 'brazilian',
  category: 'Categoria',
  alcoholicOrNot: 'Non Alcoholic',
  name: 'Caipirinha',
  image: 'Link da imagem',
}, {
  id: '52978',
  type: 'meal',
  nationality: 'brazilian',
  category: 'Categoria',
  alcoholicOrNot: 'Non Alcoholic',
  name: 'Sopa',
  image: 'Link da imagem',
}];

function FavoriteRecipes() {
  // Essa linha será retirada quando tivermos a chave FavoriteRecipes no LocalStorage
  const [favoriteRecipes, setFavoriteRecipes] = useState(MOCK_FAVORITE_RCPS);
  const [renderRecipes, setRenderRecipes] = useState(favoriteRecipes);

  // useEffect(() => {
  //   setRenderRecipes(favoriteRecipes);
  // }, [favoriteRecipes]);

  const handleFilter = (filterType) => {
    if (filterType === 'all') {
      setRenderRecipes(favoriteRecipes);
      return;
    }
    const filteredRecipes = MOCK_FAVORITE_RCPS
      .filter((recipe) => recipe.type === filterType);
    setRenderRecipes(filteredRecipes);
  };

  const removeFromFavorite = (recipeId) => {
    const newFavoriteArray = favoriteRecipes
      .filter((recipe) => recipe.id !== recipeId);

    const newFavoriteFiltered = renderRecipes
      .filter((recipe) => recipe.id !== recipeId);
    // colocar aqui a edicão do locaStorage
    setFavoriteRecipes(newFavoriteArray);
    setRenderRecipes(newFavoriteFiltered);
  };

  return (
    <div>
      <button
        type="button"
        data-testid="filter-by-all-btn"
        value="all"
        onClick={ ({ target: { value } }) => handleFilter(value) }
      >
        All
      </button>
      <button
        type="button"
        data-testid="filter-by-meal-btn"
        value="meal"
        onClick={ ({ target: { value } }) => handleFilter(value) }
      >
        Meals
      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
        value="drink"
        onClick={ ({ target: { value } }) => handleFilter(value) }
      >
        Drinks
      </button>
      {
        renderRecipes.map((recipe, index) => (
          <FavoriteRecipeCard
            key={ index }
            { ...recipe }
            index={ index }
            removeFromFavorite={ removeFromFavorite }
          />
        ))
      }
    </div>
  );
}

export default FavoriteRecipes;
