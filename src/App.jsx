import React from 'react';
import { Switch, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/Login';
import Search from './pages/Search';
import Header from './components/Header';
import RecipeDetails from './components/RecipeDetails';
import Footer from './components/Footer';

function App() {
  return (
    <Switch>
      <Route
        exact
        path="/"
        render={ (props) => (
          <Login { ...props } />
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
        path="/meals/:id"
        render={ (props) => (
          <RecipeDetails { ...props } />
        ) }
      />
      <Route
        path="/drinks/:id"
        render={ (props) => (
          <RecipeDetails { ...props } />
        ) }
      />
      <Route
        exact
        path="/meals/:id/in-progress"
        render={ (props) => (
          <Login { ...props } />
        ) }
      />
      <Route
        exact
        path="/drinks/:id/in-progress"
        render={ (props) => (
          <Login { ...props } />
        ) }
      />
      <Route
        exact
        path="/profile"
        render={ (props) => (
          <>
            <Header { ...props } />
            <Footer { ...props } />
          </>
        ) }
      />
      <Route
        exact
        path="/done-recipes"
        render={ (props) => (
          <Header { ...props } />
        ) }
      />
      <Route
        exact
        path="/favorite-recipes"
        render={ (props) => (
          <Header { ...props } />
        ) }
      />
    </Switch>

  );
}

export default App;
