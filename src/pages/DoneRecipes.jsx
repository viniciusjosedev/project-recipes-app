import { useContext } from 'react';
import DefaultContext from '../context/DefaultContext';
import DoneRecipeCard from '../components/DoneRecipeCard';

function DoneRecipes() {
  // Essa linha será retyirada quando tivermos a chave doneRecipes no LocalStorage
  const { MOCK_DONE_RCPS } = useContext(DefaultContext);

  return (
    <div>
      <button
        type="button"
        data-testid="filter-by-all-btn"
      >
        All
      </button>
      <button
        type="button"
        data-testid="filter-by-meal-btn"
      >
        Meals
      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
      >
        Drinks
      </button>
      {
        MOCK_DONE_RCPS.map((recipe, index) => (
          <DoneRecipeCard
            key={ index }
            { ...recipe }
            index={ index }
          />
        ))
      }
    </div>
  );
}

export default DoneRecipes;
