export const addFavoriteRecipes = (type, details) => {
  if (JSON
    .parse(localStorage.getItem('favoriteRecipes')) !== null) {
    localStorage.setItem('favoriteRecipes', JSON.stringify([...JSON
      .parse(localStorage.getItem('favoriteRecipes')),
    { id: details[`id${type}`],
      type,
      nationality: details.strArea ? details.strArea : '',
      category: details.strCategory,
      alcoholicOrNot: details.strAlcoholic ? details.strAlcoholic : null,
      name: details[`str${type}`],
      image: details[`str${type}Thumb`] }]));
  } else {
    localStorage.setItem('favoriteRecipes', JSON.stringify([
      { id: details[`id${type}`],
        type: type.toLowerCase(),
        nationality: details.strArea ? details.strArea : '',
        category: details.strCategory,
        alcoholicOrNot: details.strAlcoholic ? details.strAlcoholic : '',
        name: details[`str${type}`],
        image: details[`str${type}Thumb`] }]));
  }
};

export const removeFavoriteRecipes = (id) => {
  localStorage.setItem('favoriteRecipes', JSON.stringify(JSON
    .parse(localStorage.getItem('favoriteRecipes'))
    .filter((e) => e.id !== id)));
};
