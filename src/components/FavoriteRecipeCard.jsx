import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function FavoriteRecipeCard(props) {
  const { index, image, category, name, id, type, removeFromFavorite } = props;

  const pathBase = window.location.href.replace('/done-recipes', '');
  const detailsPath = `/${type}s/${id}`;
  const detailsCompletePath = `${pathBase}/${type}s/${id}`;

  return (
    <div>
      <button
        type="button"
        value={ detailsCompletePath }
        data-testid={ `${index}-horizontal-share-btn` }
        onClick={ ({ target: { value } }) => (
          navigator.clipboard.writeText(value)
        ) }
      >
        Share
      </button>
      <Link to={ detailsPath }>
        <img
          src={ image }
          alt="foto da receita"
          data-testid={ `${index}-horizontal-image` }
        />
      </Link>
      <h3 data-testid={ `${index}-horizontal-top-text` }>{ category }</h3>
      <Link to={ detailsPath }>
        <h2 data-testid={ `${index}-horizontal-top-text` }>{ name }</h2>
      </Link>
      <button
        type="button"
        value={ id }
        onClick={ ({ target: { value } }) => removeFromFavorite(value) }
      >
        Favoritar
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
};

export default FavoriteRecipeCard;
