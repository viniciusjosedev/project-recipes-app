import React from 'react';
import { useHistory } from 'react-router-dom';

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
    <div>
      <h2 data-testid="profile-email">
        {email}
      </h2>
      <button
        data-testid="profile-done-btn"
        onClick={ () => history.push('/done-recipes') }
      >
        Done Recipes
      </button>
      <button
        data-testid="profile-favorite-btn"
        onClick={ () => history.push('/favorite-recipes') }

      >
        Favorite Recipes

      </button>
      <button
        data-testid="profile-logout-btn"
        onClick={ logoutAction }
      >
        Logout

      </button>
    </div>
  );
}

export default Profile;
