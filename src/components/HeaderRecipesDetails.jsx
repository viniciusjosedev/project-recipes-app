import PropTypes from 'prop-types';
import React from 'react';
import { addFavoriteRecipes,
  removeFavoriteRecipes } from '../helpers/setLocalStorage';
import whiteHeartIcon from '../styles/images/whiteHeartIcon.svg';
import blackHeartIcon from '../styles/images/blackHeartIcon.svg';
import funcGetImage from '../helpers/funcGetImage';
import iconShare from '../styles/images/shareIcon.svg';

export default function HeaderRecipesDetails({ favoriteRecipe,
  copyAndShowMessage, details, category, type, id, handleIcon }) {
  return (
    <>
      <div>
        {Object.keys(details).length > 0 && funcGetImage(details.strCategory) && (
          <img src={ funcGetImage(details.strCategory) } alt="" />
        )}
        {
          category === 'drinks'
            ? (
              <h4 data-testid="recipe-category">
                {`${details.strCategory} - ${details.strAlcoholic}`}
              </h4>
            ) : (<h4 data-testid="recipe-category">{ details.strCategory }</h4>)
        }
      </div>
      <div>
        <button
          type="button"
          onClick={ () => {
            const IN_PROGRESS = 'in-progress';
            copyAndShowMessage(window.location.href.includes(IN_PROGRESS)
              ? window.location.href.split(IN_PROGRESS)[0].slice(
                0,
                window.location.href.split(IN_PROGRESS)[0].length - 1,
              ) : window.location.href);
          } }
          data-testid="share-btn"
        >
          <img src={ iconShare } alt="" />
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
            // style={ { backgroundColor: 'yellow' } }
          />
        </button>
      </div>
    </>
  );
}

HeaderRecipesDetails.propTypes = {
  category: PropTypes.string,
  copyAndShowMessage: PropTypes.func,
  details: PropTypes.objectOf(PropTypes.objectOf),
  favoriteRecipe: PropTypes.any,
}.isRequired;
