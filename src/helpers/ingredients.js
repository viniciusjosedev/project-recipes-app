export const getIngredients = (recipe) => {
  const recipeArr = Object.entries(recipe);
  const ingredients = recipeArr.filter((line) => (
    line[0].includes('Ingredient') && (line[1] !== null || line[1] !== '')))
    .map((ingredientLine) => ingredientLine[1]);

  console.log(ingredients);
  return ingredients;
};
