import React from 'react';
import { useHistory } from 'react-router-dom';
import style from '../styles/css/Profile.module.css';
import iconDoneRecipes from '../styles/images/iconDoneRecipes.svg';
import iconFavorites from '../styles/images/iconFavorites.svg';
import iconExit from '../styles/images/iconExit.svg';

function Profile() {
  const data = JSON.parse(localStorage.getItem('user')) !== null
    ? JSON.parse(localStorage.getItem('user')) : {};
  const { email } = data;
  const history = useHistory();
  const logoutAction = () => {
    history.push('/');
    localStorage.clear();
  };

  return (
    <main className={ style.main }>
      <h2 data-testid="profile-email">
        {email}
      </h2>
      <button
        data-testid="profile-done-btn"
        onClick={ () => history.push('/done-recipes') }
      >
        <img src={ iconDoneRecipes } alt="" />
        Done Recipes
      </button>
      <hr />
      <button
        data-testid="profile-favorite-btn"
        onClick={ () => history.push('/favorite-recipes') }
      >
        <img src={ iconFavorites } alt="" />
        Favorite Recipes
      </button>
      <hr />
      <button
        data-testid="profile-logout-btn"
        onClick={ logoutAction }
      >
        <img src={ iconExit } alt="" />
        Logout
      </button>
    </main>
  );
}

export default Profile;
