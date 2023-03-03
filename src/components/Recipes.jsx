import { useLocation } from 'react-router-dom/cjs/react-router-dom';
import RecipeCard from './RecipeCard';

function Recipes({ renderRecipes }) {
  const { pathname } = useLocation();
  return (
    renderRecipes.map((recipe, index) => (
      <RecipeCard key={ index } cardData={ { recipe, index, pathname } } />
    ))
  );
}

export default Recipes;
