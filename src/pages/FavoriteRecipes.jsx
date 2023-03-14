import { useEffect, useState } from 'react';
import DoneAndFavoriteCard from '../components/DoneAndFavoriteCard';
import { removeFavoriteRecipes } from '../helpers/setLocalStorage';
// import useCopy from '../context/customHooks/useCopy';
import style from '../styles/css/FavoriteRecipes.module.css';
import AllEat from '../styles/images/AllEat.svg';
import All from '../styles/images/All.svg';
import AllMeals from '../styles/images/AllMeals.svg';
import LinkCopied from '../components/LinkCopied';

function FavoriteRecipes() {
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [renderRecipes, setRenderRecipes] = useState(favoriteRecipes);
  const [textCopied, setTextCopied] = useState(false);

  useEffect(() => {
    const localStorageFavorites = JSON.parse(localStorage.getItem('favoriteRecipes'))
      !== null ? JSON.parse(localStorage.getItem('favoriteRecipes')) : [];
    setFavoriteRecipes(localStorageFavorites);
    setRenderRecipes(localStorageFavorites);
  }, []);

  // const handleShareClick = (copiedLink) => {
  //   copyAndShowMessage(copiedLink);
  // };

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
    <main className={ style.main }>
      <div className={ style.divButtons }>
        <button
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ () => handleFilter('all') }
        >
          <img src={ AllEat } alt="" />
          All
        </button>
        <button
          type="button"
          data-testid="filter-by-meal-btn"
          name="meal"
          onClick={ () => handleFilter('meal') }
        >
          <img src={ AllMeals } alt="" />
          Meals
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
          name="drink"
          onClick={ () => handleFilter('drink') }
        >
          <img src={ All } alt="" />
          Drinks
        </button>
      </div>
      <LinkCopied textCopied={ textCopied } />
      <section>
        {
          renderRecipes.map((recipe, index) => (
            <DoneAndFavoriteCard
              key={ index }
              { ...recipe }
              index={ index }
              removeFromFavorite={ removeFromFavorite }
              // handleShareClick={ handleShareClick }
              cardType="favoriteRecipe"
              setTextCopied={ setTextCopied }
            />
          ))
        }
      </section>
    </main>
  );
}

export default FavoriteRecipes;
