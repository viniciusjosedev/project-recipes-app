const BASE_URL_FOOD = 'https://www.themealdb.com/api/json/v1/1/';
const BASE_URL_DRINK = 'https://www.thecocktaildb.com/api/json/v1/1/';

export const fetchRecipes = async (searchType, searchWord, category) => {
  const pathOption = searchType.option === 'ingredient' ? 'filter' : 'search';
  const categoryUrl = category === 'meals' ? BASE_URL_FOOD : BASE_URL_DRINK;

  const response = await fetch(
    `${categoryUrl}${pathOption}.php?${searchType.letter}=${searchWord}`,
  );

  if (!response.ok) {
    console.log('oi');
    throw new Error('Sorry, we haven\'t found any recipes for these filters.');
  }

  const data = await response.json();
  return data[category];
};
