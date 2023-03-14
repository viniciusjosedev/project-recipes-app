import { useState, useEffect } from 'react';
// import clipboardCopy from 'clipboard-copy';
// import useCopy from '../context/customHooks/useCopy';
import DoneAndFavoriteCard from '../components/DoneAndFavoriteCard';
import AllEat from '../styles/images/AllEat.svg';
import All from '../styles/images/All.svg';
import AllMeals from '../styles/images/AllMeals.svg';
import style from '../styles/css/DoneRecipes.module.css';
import LinkCopied from '../components/LinkCopied';

function DoneRecipes() {
  const [doneRecipes, setDoneRecipes] = useState([]);
  const [renderRecipes, setRenderRecipes] = useState([]);
  const [textCopied, setTextCopied] = useState(false);

  useEffect(() => {
    const localStorageDoneRecipes = JSON.parse(localStorage
      .getItem('doneRecipes')) !== null ? JSON.parse(localStorage
        .getItem('doneRecipes')) : [];
    setDoneRecipes(localStorageDoneRecipes);
    setRenderRecipes(localStorageDoneRecipes);
  }, []);

  const handleFilter = (filterType) => {
    // console.log(filterType);
    if (filterType === 'all') {
      setRenderRecipes(doneRecipes);
      return;
    }
    const filteredRecipes = doneRecipes.filter((recipe) => recipe.type === filterType);
    setRenderRecipes(filteredRecipes);
  };

  return (
    <main className={ style.main }>
      <div className={ style.divButtons }>
        <button
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ () => handleFilter('all') }
        >
          <img src={ AllEat } alt="" />
          All
        </button>
        <button
          type="button"
          data-testid="filter-by-meal-btn"
          name="meal"
          onClick={ () => handleFilter('meal') }
        >
          <img src={ AllMeals } alt="" />
          Meals
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
          name="drink"
          onClick={ () => handleFilter('drink') }
        >
          <img src={ All } alt="" />
          Drinks
        </button>
      </div>
      <LinkCopied textCopied={ textCopied } />
      <section>
        {
          renderRecipes.map((recipe, index) => (
            <DoneAndFavoriteCard
              key={ index }
              { ...recipe }
              index={ index }
              // handleShareClick={ handleShareClick }
              cardType="doneRecipe"
              setTextCopied={ setTextCopied }
            />
          ))
        }
      </section>
    </main>
  );
}

export default DoneRecipes;
