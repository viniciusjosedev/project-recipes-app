const BASE_URL_FOOD = 'https://www.themealdb.com/api/json/v1/1/';
const BASE_URL_DRINK = 'https://www.thecocktaildb.com/api/json/v1/1/';

export default async function fetchRecipesAndCategoresInitial(path) {
  if (path === '/meals') {
    const requisicao = await (await fetch(`${BASE_URL_FOOD}search.php?s=`)).json();
    const requisaoCategory = await (await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list')).json();
    return { receitas: [requisicao.meals, true],
      category: requisaoCategory.meals };
  }
  const requisicao = await (await fetch(`${BASE_URL_DRINK}search.php?s=`)).json();
  const requisaoCategory = await (await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list')).json();
  return { receitas: [requisicao.drinks, true],
    category: requisaoCategory.drinks };
}
export const fetchRecipes = async (searchType, searchWord, category) => {
  const pathOption = searchType.option === 'ingredient' ? 'filter' : 'search';
  const categoryUrl = category === 'meals' ? BASE_URL_FOOD : BASE_URL_DRINK;

  const response = await fetch(
    `${categoryUrl}${pathOption}.php?${searchType.letter}=${searchWord}`,
  );

  const data = await response.json();

  if (data[category] === null) {
    throw new Error('Not found');
  }

  return [data[category], true];
};

export async function fetchCategores(name, path) {
  // console.log(name);
  if (path === '/drinks') {
    const requisicao = await (await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${name}`)).json();
    return [requisicao.drinks, false];
  }
  const requisicao = await (await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${name}`)).json();
  return [requisicao.meals, false];
}

export const fetchDetails = async (category, id) => {
  if (category === 'meals') {
    const requisicao = await (await fetch(`${BASE_URL_FOOD}lookup.php?i=${id}`)).json();
    return requisicao[category][0];
  }
  const requisicao = await (await fetch(`${BASE_URL_DRINK}lookup.php?i=${id}`)).json();
  // console.log(requisicao[category][0]);
  return requisicao[category][0];
};
