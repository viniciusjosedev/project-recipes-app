import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styles from '../styles/css/RecipeCard.module.css';

function RecipeCard({ cardData: { recipe, index, pathname } }) {
  const category = pathname
    .split('/')[1] === 'drinks' ? 'Drink' : 'Meal';

  const propretyNames = {
    thumb: `str${category}Thumb`,
    name: `str${category}`,
  };

  return (
    <Link
      to={ `/${pathname.split('/')[1]
        .toLocaleLowerCase()}/${recipe[`id${category}`]}` }
      data-testid={ `${index}-recipe-card` }
      key={ index }
      className={ styles.divCard }
    >
      <img
        src={ recipe[propretyNames.thumb] }
        alt={ recipe[propretyNames.name] }
        data-testid={ `${index}-card-img` }
      />
      <p data-testid={ `${index}-card-name` }>
        { recipe[propretyNames.name] }
      </p>
    </Link>
  );
}

RecipeCard.propTypes = {
  cardData: PropTypes.shape({
    recipe: PropTypes.shape({}).isRequired,
    index: PropTypes.number.isRequired,
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};

export default RecipeCard;
