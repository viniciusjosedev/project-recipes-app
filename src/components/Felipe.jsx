import PropTypes from 'prop-types';

function DoneRecipeCard(props) {
  const { index, image, category, name, doneDate, tags,
    type, nationality, alcoholicOrNot } = props;

  console.log(type === 'meal');

  switch (type) {
  case (type === 'meal'):
    return (
      <div>
        <h1>MEAL</h1>
        <img
          src={ image }
          alt="foto da receita"
          data-testid={ `${index}-horizontal-image` }
        />
        <br />
        <h2 data-testid={ `${index}-horizontal-top-name` }>{name}</h2>
        <br />
        <h3 data-testid={ `${index}-horizontal-top-text` }>
          {nationality}
          {' '}
          -
          {' '}
          {category}
        </h3>
        <br />
        <p data-testid={ `${index}-horizontal-done-date>` }>{doneDate}</p>
        <br />
        <button
          type="button"
          data-testid={ `${index}-horizontal-share-btn` }
        >
          <img
            src="images/shareIcon.svg"
            alt="share icon"
          />
        </button>
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
    </div>);
  case (type === 'drink'):
    return (<div>
      <h1>DRINK</h1>
      <img
        src={ image }
        alt="foto da receita"
        data-testid={ `${index}-horizontal-image` }
      />
      <br />
      <h2 data-testid={ `${index}-horizontal-top-name` }>{name}</h2>
      <h3 data-testid={ `${index}-horizontal-top-text` }>
        {alcoholicOrNot}
      </h3>
      <br />
      <p data-testid={ `${index}-horizontal-done-date>` }>{doneDate}</p>
      <br />
      <button
        type="button"
        data-testid={ `${index}-horizontal-share-btn` }
      >
        <img
          src="images/shareIcon.svg"
          alt="share icon"
        />
      </button>
    </div>);
  default:
    return <p>not-meal and not-drink</p>;
  }
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
};

export default DoneRecipeCard;
