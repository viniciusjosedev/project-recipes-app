import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Switch, Route } from 'react-router-dom';
import LoginScreen from './pages/LoginScreen';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ LoginScreen } />
      <Route exact path="/meals" component={ Recipes } />
    </Switch>

  );
}

export default App;
