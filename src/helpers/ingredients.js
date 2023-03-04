const getNames = (recipe) => {
  const recipeArr = Object.entries(recipe);
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
  console.log(ingredientMeasures);
  const ingredientList = ingredientNames.map((ingredient, index) => ({
    name: ingredient,
    measure: ingredientMeasures[index],
  }));

  return ingredientList;
};
