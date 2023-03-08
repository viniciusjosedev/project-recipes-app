import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../styles/images/blackHeartIcon.svg';
import style from '../styles/css/FavoriteAndDoneRecipes.module.css';

function FavoriteRecipeCard(props) {
  const { index, image, category, name, id,
    type, removeFromFavorite, nationality, alcoholicOrNot, handleShareClick } = props;

  const pathBase = window.location.href.replace('/favorite-recipes', '');
  const detailsPath = `/${type}s/${id}`;
  const detailsCompletePath = `${pathBase}/${type}s/${id}`;

  return (
    <div>
      <button
        type="button"
        onClick={ () => handleShareClick(detailsCompletePath) }
      >
        <img
          src={ shareIcon }
          className={ style.shareBtnIcon }
          alt="compartilhar"
          data-testid={ `${index}-horizontal-share-btn` }
        />
      </button>
      <Link to={ detailsPath }>
        <img
          src={ image }
          className={ style.recipeCardImg }
          alt="foto da receita"
          data-testid={ `${index}-horizontal-image` }
        />
      </Link>
      {
        type === 'meal'
        && (
          <h3 data-testid={ `${index}-horizontal-top-text` }>
            {nationality}
            {' '}
            -
            {' '}
            {category}
          </h3>)

      }
      {
        type === 'drink'
        && (
          <h3 data-testid={ `${index}-horizontal-top-text` }>
            {alcoholicOrNot}
          </h3>)
      }
      <h3 data-testid={ `${index}-horizontal-top-text` }>{ category }</h3>
      <Link to={ detailsPath }>
        <h2 data-testid={ `${index}-horizontal-name` }>{ name }</h2>
      </Link>
      <button
        type="button"
        onClick={ () => removeFromFavorite(id) }
      >
        <img
          data-testid={ `${index}-horizontal-favorite-btn` }
          src={ blackHeartIcon }
          alt=""
        />
      </button>
    </div>
  );
}

FavoriteRecipeCard.propTypes = {
  index: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  removeFromFavorite: PropTypes.func.isRequired,
  nationality: PropTypes.string.isRequired,
  alcoholicOrNot: PropTypes.string.isRequired,
  handleShareClick: PropTypes.func.isRequired,
};

export default FavoriteRecipeCard;
