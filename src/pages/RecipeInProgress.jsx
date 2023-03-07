import React, { useContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import clipboardCopy from 'clipboard-copy';
import DefaultContext from '../context/DefaultContext';
import { getIngredients } from '../helpers/ingredients';
import { removeFavoriteRecipes,
  addFavoriteRecipes,
  addProgressInRecipes, removeProgressInRecipes } from '../helpers/setLocalStorage';
import whiteHeartIcon from '../styles/images/whiteHeartIcon.svg';
import blackHeartIcon from '../styles/images/blackHeartIcon.svg';
import { fetchDetails } from '../services/foodAndDrink';
import styles from '../styles/css/RecipeInProgress.module.css';

function RecipeInProgress() {
  const [ingredients, setIngredients] = useState([]);
  const [favoriteRecipe, setFavoriteRecipe] = useState(false);
  const { pathname } = useLocation();
  const id = pathname.split('/')[2];
  const category = pathname.split('/')[1];
  const type = category === 'meals' ? 'Meal' : 'Drink';
  const { details, setDetails } = useContext(DefaultContext);
  const [arrayChecked, setArrayChecked] = useState([]);

  const handleIcon = () => {
    setFavoriteRecipe(JSON.parse(localStorage.getItem('favoriteRecipes'))
      && JSON.parse(localStorage.getItem('favoriteRecipes'))
        .filter((e) => e.id === id).length > 0);
  };

  useEffect(() => {
    async function init() {
      if (details.length > 0 && details.some((e) => e[`id${type}`] === id)) {
        setIngredients(getIngredients(details));
        handleIcon();
      } else {
        const results = await fetchDetails(category, id);
        setDetails(results);
        setIngredients(getIngredients(results));
      }
      const getStorage = JSON.parse(localStorage.getItem('inProgressRecipes'));
      if (getStorage !== null
        && Object.keys(getStorage[category]).some((e) => e === id)) {
        // console.log(getStorage[category][id]);
        setArrayChecked(getStorage[category][id]);
      }
      handleIcon();
    }
    init();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main>
      <img
        data-testid="recipe-photo"
        src={ details[`str${type}Thumb`] }
        alt="imagem da receita"
      />
      <h2 data-testid="recipe-title">{details[`str${type}`]}</h2>
      {
        category === 'drinks'
          ? (
            <h4 data-testid="recipe-category">
              {`${details.strCategory} - ${details.strAlcoholic}`}
            </h4>
          ) : (<h4 data-testid="recipe-category">{ details.strCategory }</h4>)
      }
      <p>Ingredientes</p>
      <ul>
        {
          ingredients.map((ingredient, index) => (
            <label
              key={ index }
              className={ arrayChecked.includes(ingredient.name)
                ? styles.checked : null }
              data-testid={ `${index}-ingredient-step` }
            >
              { `${ingredient.measure} of ${ingredient.name}` }
              <input
                type="checkbox"
                checked={ arrayChecked.includes(ingredient.name) }
                onClick={ ({ target: { checked } }) => {
                  // console.log(checked);
                  if (checked) {
                    setArrayChecked([...arrayChecked, ingredient.name]);
                    addProgressInRecipes(ingredient.name, category, id);
                  } else {
                    console.log('teste');
                    setArrayChecked(arrayChecked.filter((e) => e !== ingredient.name));
                    removeProgressInRecipes(ingredient.name, category, id);
                  }
                } }
              />
            </label>
          ))
        }
      </ul>
      <p data-testid="instructions">{details.strInstructions}</p>
      <button
        type="button"
        onClick={ () => {
          if (favoriteRecipe) {
            removeFavoriteRecipes(id);
          } else {
            addFavoriteRecipes(type, details);
          }
          handleIcon();
        } }
      >
        <img
          data-testid="favorite-btn"
          src={ favoriteRecipe ? blackHeartIcon : whiteHeartIcon }
          alt=""
        />
      </button>
      <button
        type="button"
        onClick={ () => {
          clipboardCopy(window.location.href);
          // setTextCopied(true);
        } }
        data-testid="share-btn"
      >
        Compartilhar
      </button>
      <button
        type="button"
        data-testid="finish-recipe-btn"
      >
        Finalizar Receita
      </button>
    </main>
  );
}

export default RecipeInProgress;
