import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function DoneRecipeCard(props) {
  const { index, image, category, name, doneDate, tags, id, type } = props;

  return (
    <div>
      <button
        type="button"
        data-testid={ `${index}-horizontal-share-btn` }
      >
        Share
      </button>
      <Link to={ `/${type}s/${id}` }>
        <img
          src={ image }
          alt="foto da receita"
          data-testid={ `${index}-horizontal-image` }
        />
      </Link>
      <h3 data-testid={ `${index}-horizontal-top-text>` }>{ category }</h3>
      <Link to={ `/${type}s/${id}` }>
        <h2 data-testid={ `${index}-horizontal-top-text>` }>{ name }</h2>
      </Link>
      <p data-testid={ `${index}-horizontal-done-date>` }>{ doneDate }</p>
      <ul>
        {
          tags.map((tag) => (
            <li
              data-testid={ `${index}-${tag}-horizontal-tag` }
              key={ `${index}${tag}` }
            >
              { tag }
            </li>
          ))
        }
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
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default DoneRecipeCard;
