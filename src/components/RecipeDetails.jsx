import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom/cjs/react-router-dom';
import { fetchDetails } from '../services/foodAndDrink';
import { getIngredients } from '../helpers/ingredients';

function RecipeDetails() {
  const { pathname } = useLocation();
  const [details, setDetails] = useState({});
  const [ingredients, setIngredients] = useState([]);
  const category = pathname.split('/')[1];
  const type = category === 'meals' ? 'Meal' : 'Drink';

  useEffect(() => {
    const id = pathname.split('/')[2];

    const init = async () => {
      const results = await fetchDetails(category, id);
      console.log(results);
      setDetails(results);
      setIngredients(getIngredients(results));
    };
    init();
  }, []);

  return (
    <div>
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
            width="420"
            height="315"
            title="Video da receta"
            src={ details.strYoutube }
          >
            Teste
          </iframe>
        )
      }
    </div>
  );
}

export default RecipeDetails;
