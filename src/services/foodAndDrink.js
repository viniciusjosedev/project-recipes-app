export const fetchRecipes = async (inputRadio, searchWord) => {
  const BASE_URL_FOOD = 'https://www.themealdb.com/api/json/v1/1/';
  const pathOption = inputRadio.option === 'ingredient' ? 'filter' : 'search';

  const response = await fetch(
    `${BASE_URL_FOOD}${pathOption}.php?${inputRadio.letter}=${searchWord}`,
  );
  const data = await response.json();
  return data.meals;
};
