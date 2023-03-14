import React, { useContext, useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import useCopy from '../context/customHooks/useCopy';
import DefaultContext from '../context/DefaultContext';
import { getIngredients } from '../helpers/ingredients';
import { fetchDetails } from '../services/foodAndDrink';
import style from '../styles/css/RecipeInProgress.module.css';
import HeaderRecipesDetails from '../components/HeaderRecipesDetails';
import { addProgressInRecipes,
  removeProgressInRecipes, addDoneRecipes } from '../helpers/setLocalStorage';
import LinkCopied from '../components/LinkCopied';

function RecipeInProgress() {
  const [ingredients, setIngredients] = useState([]);
  const [favoriteRecipe, setFavoriteRecipe] = useState(false);
  const { pathname } = useLocation();
  const history = useHistory();
  const id = pathname.split('/')[2];
  const category = pathname.split('/')[1];
  const type = category === 'meals' ? 'Meal' : 'Drink';
  const { details, setDetails } = useContext(DefaultContext);
  const [arrayChecked, setArrayChecked] = useState([]);
  const [showCopyMessage, copyAndShowMessage] = useCopy();

  const handleIcon = () => {
    setFavoriteRecipe(JSON.parse(localStorage.getItem('favoriteRecipes'))
      && JSON.parse(localStorage.getItem('favoriteRecipes'))
        .filter((e) => e.id === id).length > 0);
  };

  useEffect(() => {
    async function init() {
      const results = await fetchDetails(category, id);
      setDetails(results);
      setIngredients(getIngredients(results));
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
    <>
      <main className={ style.main }>
        <div className={ style.divInfoHeaderDetails }>
          <HeaderRecipesDetails
            favoriteRecipe={ favoriteRecipe }
            copyAndShowMessage={ copyAndShowMessage }
            details={ details }
            category={ category }
            type={ type }
            id={ id }
            handleIcon={ handleIcon }
          />
        </div>
        <div className={ style.divTitleHeader }>
          <h2 data-testid="recipe-title">{details[`str${type}`]}</h2>
        </div>
        <img
          data-testid="recipe-photo"
          src={ details[`str${type}Thumb`] }
          alt="imagem da receita"
          className={ style.imgBackGroundHeader }
        />
        <LinkCopied textCopied={ showCopyMessage } />
        <p className={ style.pIngredientes }>Ingredientes</p>
        <ul>
          {
            ingredients.map((ingredient, index) => (
              <label
                key={ index }
                className={ arrayChecked.includes(ingredient.name)
                  ? style.checked : null }
                data-testid={ `${index}-ingredient-step` }
              >
                <input
                  type="checkbox"
                  checked={ arrayChecked.includes(ingredient.name) }
                  onClick={ ({ target: { checked } }) => {
                  // console.log(checked);
                    if (checked) {
                      setArrayChecked([...arrayChecked, ingredient.name]);
                      addProgressInRecipes(ingredient.name, category, id);
                    } else {
                    // console.log('teste');
                      setArrayChecked(arrayChecked.filter((e) => e !== ingredient.name));
                      removeProgressInRecipes(ingredient.name, category, id);
                    }
                  } }
                />
                { `${ingredient.measure} of ${ingredient.name}` }
              </label>
            ))
          }
        </ul>
        <p className={ style.pIngredientes }>Instructions</p>

        <p
          className={ style.pInstructions }
          data-testid="instructions"
        >
          {details.strInstructions}
        </p>
        {
          category === 'meals' && (
            <>
              <p className={ style.pIngredientes }>Video</p>
              <iframe
                data-testid="video"
                width="336px"
                height="205.09px"
                src={ Object.keys(details).length > 0
                && `https://www.youtube.com/embed/${details.strYoutube.split('=')[1]}` }
                title="YouTube video player"
                allow="accelerometer; autoplay;
              clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowfullscreen
              />
            </>
          )
        }
      </main>
      <div className={ style.divSeparation }>
        <p />
      </div>
      <button
        type="button"
        data-testid="finish-recipe-btn"
        className={ style.buttonStartRecipe }
        onClick={ () => {
          addDoneRecipes(type, details);
          history.push('/done-recipes');
        } }
        disabled={ ingredients.length !== arrayChecked.length }
      >
        Finalizar Receita
      </button>
    </>
  );
}

export default RecipeInProgress;
