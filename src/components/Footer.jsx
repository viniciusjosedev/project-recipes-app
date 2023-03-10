import React from 'react';
import { useHistory } from 'react-router-dom';
import drinkIcon from '../styles/images/drinkIcon.svg';
import mealIcon from '../styles/images/mealIcon.svg';
import styles from '../styles/css/Footer.module.css';

function Footer() {
  const history = useHistory();
  return (
    <footer
      data-testid="footer"
      className={ styles.footer }
    >

      <button
        onClick={ () => history.push('/drinks') }
      >
        <img
          data-testid="drinks-bottom-btn"
          src={ drinkIcon }
          alt="button search recipes drink"
        />
      </button>
      <button
        onClick={ () => history.push('/meals') }
      >
        <img
          data-testid="meals-bottom-btn"
          className={ styles.meals }
          src={ mealIcon }
          alt="button search recipes meal"
        />
      </button>
    </footer>
  );
}

export default Footer;
