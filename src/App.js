import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Switch, Route } from 'react-router-dom';
import LoginScreen from './pages/LoginScreen';
// import DefaultProvider from './context/DefaultProvider';
import Header from './components/Header';

function App() {
  return (
    <Switch>
      <Route
        exact
        path="/"
        render={ (props) => (
          <LoginScreen { ...props } />
        ) }
      />
      <Route
        exact
        path="/meals"
        render={ (props) => (
          <Header { ...props } />
        ) }
      />
      <Route
        exact
        path="/drinks"
        render={ (props) => (
          <Header { ...props } />
        ) }
      />
      <Route
        exact
        path="/meals/:id-da-receita"
        render={ (props) => (
          <LoginScreen { ...props } />
        ) }
      />
      <Route
        exact
        path="/drinks/:id-da-receita"
        render={ (props) => (
          <LoginScreen { ...props } />
        ) }
      />
      <Route
        exact
        path="/meals/:id-da-receita/in-progress"
        render={ (props) => (
          <LoginScreen { ...props } />
        ) }
      />
      <Route
        exact
        path="/drinks/:id-da-receita/in-progress"
        render={ (props) => (
          <LoginScreen { ...props } />
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
