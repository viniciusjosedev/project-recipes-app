import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import style from '../styles/css/FavoriteAndDoneRecipes.module.css';

function DoneRecipeCard(props) {
  const { index, image, category, name, doneDate, tags, type, id,
    nationality, alcoholicOrNot, handleShareClick } = props;

  const pathBase = window.location.href.replace('/done-recipes', '');
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
          data-testid={ `${index}-horizontal-image` }
          alt="foto da receita"
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
      <p data-testid={ `${index}-horizontal-done-date` }>{ doneDate }</p>
      <ul>
        {tags.slice(0, 2).map((tag) => (
          <li
            data-testid={ `${index}-${tag}-horizontal-tag` }
            key={ `${index}${tag}` }
          >
            {tag}
          </li>
        ))}
      </ul>

    </div>

  );
}

DoneRecipeCard.propTypes = {
  index: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  doneDate: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  nationality: PropTypes.string.isRequired,
  alcoholicOrNot: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  id: PropTypes.string.isRequired,
  handleShareClick: PropTypes.func.isRequired,
};

export default DoneRecipeCard;
