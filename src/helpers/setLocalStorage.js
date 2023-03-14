export const addFavoriteRecipes = (type, details) => {
  if (JSON
    .parse(localStorage.getItem('favoriteRecipes')) !== null) {
    const getStorage = JSON
      .parse(localStorage.getItem('favoriteRecipes'));
    getStorage.push({ id: details[`id${type}`],
      type: type.toLowerCase(),
      nationality: details.strArea ? details.strArea : '',
      category: details.strCategory,
      alcoholicOrNot: details.strAlcoholic ? details.strAlcoholic : null,
      name: details[`str${type}`],
      image: details[`str${type}Thumb`] });
    localStorage.setItem('favoriteRecipes', JSON.stringify(getStorage));
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

export const addProgressInRecipes = (ingredientes, category, id) => {
  if (JSON.parse(localStorage.getItem('inProgressRecipes')) !== null) {
    const arrayID = JSON.parse(localStorage
      .getItem('inProgressRecipes'))[category][id] !== undefined
      ? [...JSON.parse(localStorage
        .getItem('inProgressRecipes'))[category][id]] : [];
    localStorage.setItem(
      'inProgressRecipes',
      JSON.stringify({ ...JSON.parse(localStorage.getItem('inProgressRecipes')),
        [category]: { ...JSON.parse(localStorage.getItem('inProgressRecipes'))[category],
          [id]: [...arrayID, ingredientes] } }),
    );
  } else {
    localStorage.setItem(
      'inProgressRecipes',
      JSON.stringify({ meals: {}, drinks: {}, [category]: { [id]: [ingredientes] } }),
    );
  }
};

export const removeProgressInRecipes = (ingredientes, category, id) => {
  localStorage.setItem(
    'inProgressRecipes',
    JSON.stringify({ ...JSON.parse(localStorage.getItem('inProgressRecipes')),
      [category]: { ...JSON.parse(localStorage.getItem('inProgressRecipes'))[category],
        [id]: JSON.parse(localStorage
          .getItem('inProgressRecipes'))[category][id]
          .filter((e) => e !== ingredientes) } }),
  );
};

export const addDoneRecipes = (type, details) => {
  const dateNow = new Date();
  if (JSON
    .parse(localStorage.getItem('doneRecipes')) !== null) {
    localStorage.setItem('doneRecipes', JSON.stringify([...JSON
      .parse(localStorage.getItem('doneRecipes')),
    { id: details[`id${type}`],
      type: type.toLowerCase(),
      nationality: details.strArea ? details.strArea : '',
      category: details.strCategory,
      alcoholicOrNot: details.strAlcoholic ? details.strAlcoholic : null,
      name: details[`str${type}`],
      doneDate: dateNow.toISOString(),
      image: details[`str${type}Thumb`],
      tags: details.strTags !== null ? details.strTags.split(',') : [] }]));
  } else {
    localStorage.setItem('doneRecipes', JSON.stringify([
      { id: details[`id${type}`],
        type: type.toLowerCase(),
        nationality: details.strArea ? details.strArea : '',
        category: details.strCategory,
        alcoholicOrNot: details.strAlcoholic ? details.strAlcoholic : '',
        name: details[`str${type}`],
        doneDate: dateNow.toISOString(),
        image: details[`str${type}Thumb`],
        tags: details.strTags !== null ? details.strTags.split(',') : [] }]));
  }
};
