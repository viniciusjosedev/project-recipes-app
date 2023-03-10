import { useContext, useEffect, useMemo, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';
import DefaultContext from '../context/DefaultContext';
import RecipeCard from '../components/RecipeCard';
import fetchRecipesAndCategoresInitial, { fetchCategores }
  from '../services/foodAndDrink';
import styles from '../styles/css/Recipes.module.css';
import All from '../styles/images/All.svg';
import Cocoa from '../styles/images/cocoa.svg';
import Cocktail from '../styles/images/cocktail.svg';
import Other from '../styles/images/other.svg';
import Shake from '../styles/images/shake.svg';
import Drink from '../styles/images/drink.svg';

function Recipes() {
  const { searchedRecipes, searcheCategories,
    setSearchedRecipes, setSearcheCategories } = useContext(DefaultContext);
  const [renderRecipes, setRenderRecipes] = useState([]);
  const [renderCategories, setRenderCategories] = useState([]);
  const [buttonClick, setButtonClick] = useState('');
  const [loading, setLoading] = useState(true);
  const { pathname } = useLocation();
  const history = useHistory();
  const arrayImages = [Drink, Cocktail, Shake, Other, Cocoa];

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
    }
  }, [history, pathname, searcheCategories, searchedRecipes]);

  const fetchInitialRecipes = async () => {
    setLoading(true);
    const searchResults = await fetchRecipesAndCategoresInitial(pathname);
    // console.log(searchResults);
    setSearchedRecipes(searchResults.receitas);
    setSearcheCategories(searchResults.category);
    setLoading(false);
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
      setLoading(true);
      setButtonClick('');
      fetchInitialRecipes();
      setLoading(false);
    } else {
      setLoading(true);
      setButtonClick(name);
      setSearchedRecipes(await fetchCategores(name, pathname));
      setLoading(false);
    }
  };

  return (
    <>
      <section className={ styles.sectionCategores }>
        <button
          data-testid="All-category-filter"
          type="button"
          onClick={ fetchInitialRecipes }
        >
          <img src={ All } alt="" />
          <p>All</p>
        </button>
        {searcheCategories && renderCategories.map((e, index) => (
          <button
            key={ e.strCategory }
            data-testid={ `${e.strCategory}-category-filter` }
            onClick={ () => handleClick(e.strCategory) }
          >
            <img src={ arrayImages[index] } alt="" />
            <p>{e.strCategory}</p>
          </button>
        ))}
      </section>
      <section className={ styles.sectionRecipeCard }>
        {loading && (
          <Spinner color="success" />
        )}
        {
          renderRecipes && !loading && (
            renderRecipes.map((recipe, index) => (
              <RecipeCard key={ index } cardData={ { recipe, index, pathname } } />
            )))
        }
      </section>
      <div style={ { background: 'transparent', marginTop: '100px' } } />
    </>
  );
}

export default Recipes;
