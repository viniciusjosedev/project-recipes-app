import { useEffect, useState, useContext } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import clipboardCopy from 'clipboard-copy';
import { fetchDetails } from '../services/foodAndDrink';
import { getIngredients, getRecomendations } from '../helpers/ingredients';
import style from '../styles/css/RecipeDetails.module.css';
import { addFavoriteRecipes, removeFavoriteRecipes } from '../helpers/setLocalStorage';
import whiteHeartIcon from '../styles/images/whiteHeartIcon.svg';
import blackHeartIcon from '../styles/images/blackHeartIcon.svg';
import DefaultContext from '../context/DefaultContext';

function RecipeDetails() {
  // console.log(match);
  const { details, setDetails } = useContext(DefaultContext);
  const { pathname } = useLocation();
  const [ingredients, setIngredients] = useState([]);
  const [recomendations, setRecomendations] = useState([]);
  const [disabledButton, setDisabledButton] = useState(true);
  const [optionButton, setOptionButton] = useState();
  const [textCopied, setTextCopied] = useState(false);
  const [favoriteRecipe, setFavoriteRecipe] = useState(false);
  const history = useHistory();
  const category = pathname.split('/')[1];
  const type = category === 'meals' ? 'Meal' : 'Drink';
  const typeInverse = category === 'meals' ? 'Drink' : 'Meal';
  const id = pathname.split('/')[2];

  const funcOptionsButton = () => {
    if (JSON.parse(localStorage.getItem('doneRecipes')) !== null
      && JSON.parse(localStorage.getItem('doneRecipes'))
        .filter((e) => e.id === id).length > 0) {
      setDisabledButton(false);
    } else if (JSON.parse(localStorage.getItem('inProgressRecipes')) !== null
        && Object.keys(JSON.parse(localStorage.getItem('inProgressRecipes'))[category])
          .filter((e) => e === id).length > 0) {
      setOptionButton('continue');
      setDisabledButton(true);
    } else {
      setDisabledButton(true);
      setOptionButton('start');
    }
  };

  const handleIcon = () => {
    setFavoriteRecipe(JSON.parse(localStorage.getItem('favoriteRecipes'))
      && JSON.parse(localStorage.getItem('favoriteRecipes'))
        .filter((e) => e.id === id).length > 0);
  };

  useEffect(() => {
    const NUMBER_MAX_RECOMENDATIONS = 6;
    const init = async () => {
      funcOptionsButton();
      handleIcon();
      const results = await fetchDetails(category, id);
      setDetails(results);
      setIngredients(getIngredients(results));
      setRecomendations((await getRecomendations(pathname.split('/')[1]))
        .slice(0, NUMBER_MAX_RECOMENDATIONS));
    };
    init();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <main className={ style.main }>
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
              <li
                key={ index }
                data-testid={ `${index}-ingredient-name-and-measure` }
              >
                { `${ingredient.measure} of ${ingredient.name}` }
              </li>
            ))
          }
        </ul>
        <p data-testid="instructions">{details.strInstructions}</p>
        {
          category === 'meals' && (
            <iframe
              data-testid="video"
              width="560"
              height="315"
              src={ Object.keys(details).length > 0
                && `https://www.youtube.com/embed/${details.strYoutube.split('=')[1]}` }
              title="YouTube video player"
              allow="accelerometer; autoplay;
              clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen
            />
          )
        }
        <div
          className={ style.divRecomendationCard }
        >
          {recomendations.length > 0 && recomendations.map((e, index) => (
            <div
              key={ e[`str${typeInverse}`] }
              data-testid={ `${index}-recommendation-card` }
            >
              <img
                src={ `${e[`str${typeInverse}Thumb`]}` }
                alt=""
              />
              <h4
                data-testid={ `${index}-recommendation-title` }
              >
                {`${e[`str${typeInverse}`]}`}
              </h4>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={ () => {
            clipboardCopy(window.location.href);
            setTextCopied(true);
          } }
          data-testid="share-btn"
        >
          Compartilhar
        </button>
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
        { textCopied && (
          <p>
            Link copied!
          </p>
        ) }
        {disabledButton && (
          <button
            data-testid="start-recipe-btn"
            type="button"
            className={ style.buttonStartRecipe }
            onClick={ () => history.push(`${pathname}/in-progress`) }
          >
            {optionButton === 'start' ? 'Start Recipes' : 'Continue Recipes'}
          </button>
        )}
      </main>
      <footer className={ style.footer } />
    </>
  );
}

export default RecipeDetails;
