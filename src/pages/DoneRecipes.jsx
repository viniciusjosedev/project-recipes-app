import { useState, useEffect } from 'react';
import copy from 'clipboard-copy';
import DoneRecipeCard from '../components/DoneRecipeCard';

function DoneRecipes() {
  const [doneRecipes, setDoneRecipes] = useState([]);
  const [renderRecipes, setRenderRecipes] = useState([]);
  const [showCopyMessage, setShowCopyMessage] = useState(false);

  useEffect(() => {
    const localStorageDoneRecipes = JSON.parse(localStorage
      .getItem('doneRecipes')) !== null ? JSON.parse(localStorage
        .getItem('doneRecipes')) : [];
    setDoneRecipes(localStorageDoneRecipes);
    setRenderRecipes(localStorageDoneRecipes);
  }, []);

  const handleShareClick = (copiedLink) => {
    const TIME_TO_SHOW = 3000;
    copy(copiedLink);
    setShowCopyMessage(true);
    setTimeout(() => setShowCopyMessage(false), TIME_TO_SHOW);
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
