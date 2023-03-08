import { useContext, useEffect, useMemo, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import DefaultContext from '../context/DefaultContext';
import RecipeCard from '../components/RecipeCard';
import fetchRecipesAndCategoresInitial, { fetchCategores }
  from '../services/foodAndDrink';

function Recipes() {
  const { searchedRecipes, searcheCategories,
    setSearchedRecipes, setSearcheCategories } = useContext(DefaultContext);
  const [renderRecipes, setRenderRecipes] = useState([]);
  const [renderCategories, setRenderCategories] = useState([]);
  const [buttonClick, setButtonClick] = useState('');
  const { pathname } = useLocation();
  const history = useHistory();

  const RECIPES_TO_RENDER = 12;
  const CATEGORY_TO_RENDER = 5;

  useMemo(() => {
    const category = pathname
      .split('/')[1] === 'drinks' ? 'Drink' : 'Meal';
    if (searchedRecipes[0].length > 1) {
      setRenderRecipes(searchedRecipes[0].slice(0, RECIPES_TO_RENDER));
      setRenderCategories(searcheCategories.slice(0, searcheCategories.length
        > CATEGORY_TO_RENDER ? CATEGORY_TO_RENDER : searcheCategories.length));
    } else if (searchedRecipes[1] && searchedRecipes[0].length === 1) {
      const type = pathname.split('/')[1];
      const id = searchedRecipes[0][0][`id${category}`];
      history.push(`/${type}/${id}`);
    } else {
      setRenderRecipes(searchedRecipes[0]);
      // console.log(searchedRecipes[0].length
      //   > RECIPES_TO_RENDER ? RECIPES_TO_RENDER : searchedRecipes[0].length);
    }
  }, [history, pathname, searcheCategories, searchedRecipes]);

  const fetchInitialRecipes = async () => {
    const searchResults = await fetchRecipesAndCategoresInitial(pathname);
    // console.log(searchResults);
    setSearchedRecipes(searchResults.receitas);
    setSearcheCategories(searchResults.category);
  };

  useEffect(() => {
    async function init() {
      await fetchInitialRecipes();
    }
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const handleClick = async (name) => {
    if (buttonClick === name) {
      setButtonClick('');
      fetchInitialRecipes();
    } else {
      setButtonClick(name);
      setSearchedRecipes(await fetchCategores(name, pathname));
    }
  };

  return (
    <div>
      {searcheCategories && renderCategories.map((e) => (
        <button
          key={ e.strCategory }
          data-testid={ `${e.strCategory}-category-filter` }
          onClick={ () => handleClick(e.strCategory) }
        >
          {e.strCategory}
        </button>
      ))}
      <button
        data-testid="All-category-filter"
        type="button"
        onClick={ fetchInitialRecipes }
      >
        All
      </button>
      {
        renderRecipes && (
          renderRecipes.map((recipe, index) => (
            <RecipeCard key={ index } cardData={ { recipe, index, pathname } } />
          )))
      }
    </div>
  );
}

export default Recipes;
