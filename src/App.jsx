import React from 'react';
import { Switch, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/Login';
import Search from './pages/Search';
import Header from './components/Header';
import RecipeDetails from './pages/RecipeDetails';
import Footer from './components/Footer';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';
import RecipeInProgress from './pages/RecipeInProgress';
import Profile from './pages/Profile';

function App() {
  return (
    <Switch>
      <Route
        exact
        path="/meals/:id/in-progress"
        render={ (props) => (
          <RecipeInProgress { ...props } />
        ) }
      />
      <Route
        exact
        path="/drinks/:id/in-progress"
        render={ (props) => (
          <RecipeInProgress { ...props } />
        ) }
      />
      <Route
        exact
        path="/meals/:id"
        render={ (props) => (
          <RecipeDetails { ...props } />
        ) }
      />
      <Route
        exact
        path="/drinks/:id"
        render={ (props) => (
          <RecipeDetails { ...props } />
        ) }
      />
      <Route
        exact
        path="/done-recipes"
        render={ (props) => (
          <>
            <Header { ...props } />
            <DoneRecipes />
            <Footer />
          </>
        ) }
      />
      <Route
        exact
        path="/favorite-recipes"
        render={ (props) => (
          <>
            <Header { ...props } />
            <FavoriteRecipes />
            <Footer />
          </>
        ) }
      />
      <Route
        exact
        path="/profile"
        render={ (props) => (
          <>
            <Header { ...props } />
            <Profile { ...props } />
            <Footer { ...props } />
          </>
        ) }
      />
      <Route
        exact
        path="/drinks"
        render={ (props) => (
          <>
            <Header { ...props } />
            <Search { ...props } />
            <Footer { ...props } />
          </>
        ) }
      />
      <Route
        exact
        path="/meals"
        render={ (props) => (
          <>
            <Header { ...props } />
            <Search { ...props } />
            <Footer { ...props } />
          </>
        ) }
      />
      <Route
        exact
        path="/"
        render={ (props) => (
          <Login { ...props } />
        ) }
      />
    </Switch>
  );
}

export default App;
