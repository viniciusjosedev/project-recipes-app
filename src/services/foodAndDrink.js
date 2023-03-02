const BASE_URL_FOOD = 'https://www.themealdb.com/api/json/v1/1/';
const BASE_URL_DRINK = 'https://www.thecocktaildb.com/api/json/v1/1/';

export const fetchRecipes = async (inputRadio, searchWord, a) => {
  const pathOption = inputRadio.option === 'ingredient' ? 'filter' : 'search';
  const categoryUrl = a === 'food' ? BASE_URL_FOOD : BASE_URL_DRINK;

  const response = await fetch(
    `${categoryUrl}${pathOption}.php?${inputRadio.letter}=${searchWord}`,
  );
  const data = await response.json();
  return data.meals;
};
