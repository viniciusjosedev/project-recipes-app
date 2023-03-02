import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Switch, Route } from 'react-router-dom';
import LoginScreen from './pages/LoginScreen';
import SearchBar from './pages/SearchBar';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ LoginScreen } />
      <Route exact path="/search" component={ SearchBar } />
    </Switch>

  );
}

export default App;
