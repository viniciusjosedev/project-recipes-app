const BASE_URL_FOOD = 'https://www.themealdb.com/api/json/v1/1/';
const BASE_URL_DRINK = 'https://www.thecocktaildb.com/api/json/v1/1/';

export const fetchRecipes = async (searchType, searchWord, category) => {
  if (searchType === '/meals') {
    const requisicao = await (await fetch(`${BASE_URL_FOOD}search.php?s=`)).json();
    console.log(requisicao);
    return requisicao.meals;
  }
  if (searchType === '/drinks') {
    const requisicao = await (await fetch(`${BASE_URL_DRINK}search.php?s=`)).json();
    console.log(requisicao);
    return requisicao.drinks;
  }

  const pathOption = searchType.option === 'ingredient' ? 'filter' : 'search';
  const categoryUrl = category === 'meals' ? BASE_URL_FOOD : BASE_URL_DRINK;

  const response = await fetch(
    `${categoryUrl}${pathOption}.php?${searchType.letter}=${searchWord}`,
  );

  const data = await response.json();

  if (data[category] === null) {
    console.log('passou aqui');
    throw new Error('Not found');
  }

  return data[category];
};

export const fetchDetails = async (category, id) => {
  if (category === 'meals') {
    const requisicao = await (await fetch(`${BASE_URL_FOOD}lookup.php?i=${id}`)).json();
    return requisicao[category][0];
  }

  if (category === 'drinks') {
    const requisicao = await (await fetch(`${BASE_URL_DRINK}lookup.php?i=${id}`)).json();
    return requisicao[category][0];
  }
};
