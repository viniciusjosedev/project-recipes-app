import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import copy from 'clipboard-copy';

function DoneRecipeCard(props) {
  const { index, image, category, name, doneDate, tags, type, id,
    nationality, alcoholicOrNot } = props;

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
          copy(value)
        ) }
      >
        Share
      </button>
      <Link to={ detailsPath }>
        <img
          src={ image }
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
        <h2 data-testid={ `${index}-horizontal-top-text` }>{ name }</h2>
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
};

export default DoneRecipeCard;
