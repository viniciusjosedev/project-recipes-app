import { useContext, useState } from 'react';
import DefaultContext from '../context/DefaultContext';
import DoneRecipeCard from '../components/DoneRecipeCard';

function DoneRecipes() {
  // Essa linha será retyirada quando tivermos a chave doneRecipes no LocalStorage
  const { MOCK_DONE_RCPS } = useContext(DefaultContext);
  const [renderRecipes, setRenderRecipes] = useState(MOCK_DONE_RCPS);

  const handleFilter = (filterType) => {
    console.log(filterType);
    if (filterType === 'all') {
      setRenderRecipes(MOCK_DONE_RCPS);
      return;
    }
    const filteredRecipes = MOCK_DONE_RCPS.filter((recipe) => recipe.type === filterType);
    setRenderRecipes(filteredRecipes);
  };

  return (
    <div>
      <button
        type="button"
        data-testid="filter-by-all-btn"
        value="all"
        onClick={ ({ target: { value } }) => handleFilter(value) }
      >
        All
      </button>
      <button
        type="button"
        data-testid="filter-by-meal-btn"
        value="meal"
        onClick={ ({ target: { value } }) => handleFilter(value) }
      >
        Meals
      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
        value="drink"
        onClick={ ({ target: { value } }) => handleFilter(value) }
      >
        Drinks
      </button>
      {
        renderRecipes.map((recipe, index) => (
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
