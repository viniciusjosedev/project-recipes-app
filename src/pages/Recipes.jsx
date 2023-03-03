import { useContext, useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom/cjs/react-router-dom';
import DefaultContext from '../context/DefaultContext';
import RecipeCard from '../components/RecipeCard';

function Recipes() {
  const { searchedRecipes, init } = useContext(DefaultContext);
  const [renderRecipes, setRenderRecipes] = useState([]);
  const { pathname } = useLocation();
  const history = useHistory();

  const RECIPES_TO_RENDER = 12;
  useEffect(() => {
    if (searchedRecipes.length === 0) {
      init(pathname);
      return;
    }
    const category = pathname
      .split('/')[1] === 'drinks' ? 'Drink' : 'Meal';
    // Melhorar a Lógica aqui
    if (searchedRecipes.length > 1) {
      setRenderRecipes(searchedRecipes.slice(0, RECIPES_TO_RENDER));
    } else if (searchedRecipes.length === 1) {
      const type = pathname.split('/')[1];
      const id = searchedRecipes[0][`id${category}`];
      history.push(`/${type}/${id}`);
    }
  }, [searchedRecipes, history, pathname, init]);
  return (
    <div>
      {
        renderRecipes.length > 1 && (
          renderRecipes.map((recipe, index) => (
            <RecipeCard key={ index } cardData={ { recipe, index, pathname } } />
          )))
      }
    </div>
  );
}

export default Recipes;
