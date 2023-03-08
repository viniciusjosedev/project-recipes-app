import React from 'react';

function Profile() {
  const data = JSON.parse(localStorage.getItem('user'));
  const { email } = data;
  return (
    <div>
      <h2 data-testid="profile-email">
        {email}
      </h2>
      <button data-testid="profile-done-btn">Done Recipes</button>
      <button data-testid="profile-favorite-btn">Favorite Recipes</button>
      <button data-testid="profile-logout-btn">Logout</button>
    </div>
  );
}

export default Profile;
