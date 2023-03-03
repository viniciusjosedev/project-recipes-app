const funcNameHeader = (value) => {
  if (value === '/meals') {
    return ['Meals', true];
  } if (value === '/drinks') {
    return ['Drinks', true];
  }
  if (value === '/profile') {
    return ['Profile', false];
  }
  if (value === '/done-recipes') {
    return ['Done Recipes', false];
  }
  if (value === '/favorite-recipes') {
    return ['Favorite Recipes', false];
  }
};

export default funcNameHeader;
