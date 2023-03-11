import AllDrinks from '../styles/images/All.svg';
import AllMeals from '../styles/images/AllMeals.svg';
import Cocoa from '../styles/images/cocoa.svg';
import Cocktail from '../styles/images/cocktail.svg';
import Other from '../styles/images/other.svg';
import Shake from '../styles/images/shake.svg';
import Ordinary from '../styles/images/drink.svg';
import Beef from '../styles/images/beef.svg';
import Breakfast from '../styles/images/breakfeast.svg';
import Chicken from '../styles/images/chicken.svg';
import Dessert from '../styles/images/dessert.svg';
import Goat from '../styles/images/goat.svg';

export default function funcGetImage(category) {
  const objectImage = {
    AllDrinks,
    AllMeals,
    Cocoa,
    Cocktail,
    Other,
    Shake,
    Ordinary,
    Beef,
    Breakfast,
    Chicken,
    Dessert,
    Goat,
  };
  return objectImage[category.split(' ')[0]];
}
