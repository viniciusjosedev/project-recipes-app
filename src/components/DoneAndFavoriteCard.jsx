import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import clipboardCopy from 'clipboard-copy';
import shareIcon from '../styles/images/shareIcon.svg';
import blackHeartIcon from '../styles/images/blackHeartIcon.svg';
import style from '../styles/css/DoneAndFavoriteCard.module.css';

function FavoriteRecipeCard({ index, image, category, name, id, doneDate, type, cardType,
  removeFromFavorite, nationality, alcoholicOrNot,
  tags, setTextCopied }) {
  const handleShareClick = (copiedLink) => {
    console.log('aqui');
    setTextCopied(true);
    clipboardCopy(copiedLink);
  };

  const url = cardType === 'doneRecipe' ? '/done-recipes' : '/favorite-recipes';

  const pathBase = window.location.href.replace(url, '');
  const detailsPath = `/${type}s/${id}`;
  const detailsCompletePath = `${pathBase}/${type}s/${id}`;

  return (
    <div className={ style.divFavoriteAndCard }>
      <Link to={ detailsPath }>
        <img
          src={ image }
          className={ style.recipeCardImg }
          alt="foto da receita"
          data-testid={ `${index}-horizontal-image` }
        />
      </Link>
      <div className={ style.divInfoLateral }>
        <div className={ style.divInfoLateralHeader }>
          <Link to={ detailsPath } data-testid={ `${index}-horizontal-name` }>
            { name }
          </Link>
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
          {cardType !== 'doneRecipe' && (
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
          )}
        </div>
        <div className={ style.divCategoryInfo }>
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
          <>
            <h3 data-testid={ `${index}-horizontal-top-text` }>
              {alcoholicOrNot}
              { category }
            </h3>
            {/* <h3 data-testid={ `${index}-horizontal-top-text` }>{ category }</h3> */}
          </>)
          }
          {/* <h3>*</h3> */}
        </div>
        {
          cardType === 'doneRecipe' && (
            <>
              <p data-testid={ `${index}-horizontal-done-date` }>{ doneDate }</p>
              <div className={ style.divP }>
                {tags.slice(0, 2).map((tag) => (
                  <p
                    data-testid={ `${index}-${tag}-horizontal-tag` }
                    key={ `${index}${tag}` }
                  >
                    {tag}
                  </p>
                ))}
              </div>
            </>
          )
        }
      </div>
      <div className={ style.divSpace } />
    </div>
  );
}

FavoriteRecipeCard.propTypes = {
  alcoholicOrNot: PropTypes.string.isRequired,
  cardType: PropTypes.string.isRequired, // handleShareClick: PropTypes.func.isRequired,
  category: PropTypes.string.isRequired,
  doneDate: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  nationality: PropTypes.string.isRequired,
  removeFromFavorite: PropTypes.func.isRequired,
  setTextCopied: PropTypes.func.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  type: PropTypes.string.isRequired,
};

export default FavoriteRecipeCard;
