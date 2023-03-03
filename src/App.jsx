import React from 'react';
import { Switch, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/Login';
import Search from './pages/Search';
import Header from './components/Header';

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
          <Search { ...props } />
        ) }
      />
      <Route
        exact
        path="/drinks"
        render={ (props) => (
          <Search { ...props } />
        ) }
      />
      <Route
        exact
        path="/meals/:id-da-receita"
        render={ (props) => (
          <Login { ...props } />
        ) }
      />
      <Route
        exact
        path="/drinks/:id-da-receita"
        render={ (props) => (
          <Login { ...props } />
        ) }
      />
      <Route
        exact
        path="/meals/:id-da-receita/in-progress"
        render={ (props) => (
          <Login { ...props } />
        ) }
      />
      <Route
        exact
        path="/drinks/:id-da-receita/in-progress"
        render={ (props) => (
          <Login { ...props } />
        ) }
      />
      <Route
        exact
        path="/profile"
        render={ (props) => (
          <Header { ...props } />
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
