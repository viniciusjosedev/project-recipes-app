const getNames = (recipe) => {
  const recipeArr = Object.entries(recipe);
  // console.log(recipeArr);
  const ingredientNames = recipeArr.filter((line) => {
    const nullEmpty = line[1] === null || line[1] === '';
    return line[0].includes('Ingredient') && (!nullEmpty);
  })
    .map((ingredientLine) => ingredientLine[1]);
  return ingredientNames;
};

const getMeasures = (recipe) => {
  const recipeArr = Object.entries(recipe);
  const measures = recipeArr.filter((line) => {
    const nullEmpty = line[1] === null || line[1] === ' ';
    return line[0].includes('Measure') && (!nullEmpty);
  })
    .map((ingredientLine) => ingredientLine[1]);
  return measures;
};

export const getIngredients = (recipe) => {
  const ingredientNames = getNames(recipe);
  const ingredientMeasures = getMeasures(recipe);
  // console.log(ingredientNames, ingredientMeasures);
  const ingredientList = ingredientNames.map((ingredient, index) => ({
    name: ingredient,
    measure: ingredientMeasures[index],
  }));

  return ingredientList;
};

export const getRecomendations = async (path) => {
  if (path === 'meals') {
    const requisicao = await (await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=')).json();
    // console.log(requisicao.drinks);
    return requisicao.drinks;
  } const requisicao = await (await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')).json();
  // console.log(requisicao.meals);
  return requisicao.meals;
};
