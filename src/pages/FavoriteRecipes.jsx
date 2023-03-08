import { useEffect, useState } from 'react';
import copy from 'clipboard-copy';
import FavoriteRecipeCard from '../components/FavoriteRecipeCard';
import { removeFavoriteRecipes } from '../helpers/setLocalStorage';

function FavoriteRecipes() {
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [renderRecipes, setRenderRecipes] = useState(favoriteRecipes);
  const [showCopyMessage, setShowCopyMessage] = useState(false);

  useEffect(() => {
    const localStorageFavorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
    setFavoriteRecipes(localStorageFavorites);
    setRenderRecipes(localStorageFavorites);
  }, []);

  const handleShareClick = (copiedLink) => {
    const TIME_TO_SHOW = 3000;
    copy(copiedLink);
    setShowCopyMessage(true);
    setTimeout(() => setShowCopyMessage(false), TIME_TO_SHOW);
  };

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
      { showCopyMessage && (
        <p>
          Link copied!
        </p>
      ) }
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
            handleShareClick={ handleShareClick }
          />
        ))
      }
    </div>
  );
}

export default FavoriteRecipes;
