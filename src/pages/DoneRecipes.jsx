import { useState, useEffect } from 'react';
import DoneRecipeCard from '../components/DoneRecipeCard';
import useCopy from '../context/customHooks/useCopy';

function DoneRecipes() {
  const [doneRecipes, setDoneRecipes] = useState([]);
  const [renderRecipes, setRenderRecipes] = useState([]);
  const [showCopyMessage, copyAndShowMessage] = useCopy();

  useEffect(() => {
    const localStorageDoneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    setDoneRecipes(localStorageDoneRecipes);
    setRenderRecipes(localStorageDoneRecipes);
  }, []);

  const handleShareClick = (copiedLink) => {
    copyAndShowMessage(copiedLink);
  };

  const handleFilter = (filterType) => {
    console.log(filterType);
    if (filterType === 'all') {
      setRenderRecipes(doneRecipes);
      return;
    }
    const filteredRecipes = doneRecipes.filter((recipe) => recipe.type === filterType);
    setRenderRecipes(filteredRecipes);
  };

  return (
    <div>
      { showCopyMessage && (
        <p>
          Link copied!
        </p>
      ) }
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
            handleShareClick={ handleShareClick }
          />
        ))
      }
    </div>
  );
}

export default DoneRecipes;
