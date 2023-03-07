import { useEffect, useState } from 'react';
import FavoriteRecipeCard from '../components/FavoriteRecipeCard';
import { removeFavoriteRecipes } from '../helpers/setLocalStorage';

function FavoriteRecipes() {
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [renderRecipes, setRenderRecipes] = useState(favoriteRecipes);

  useEffect(() => {
    const localStorageFavorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
    setFavoriteRecipes(localStorageFavorites);
    setRenderRecipes(localStorageFavorites);
  }, []);

  const handleFilter = (filterType) => {
    if (filterType === 'all') {
      setRenderRecipes(favoriteRecipes);
      return;
    }
    const filteredRecipes = favoriteRecipes
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
    removeFavoriteRecipes(recipeId);
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
