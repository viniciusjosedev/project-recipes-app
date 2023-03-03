import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Switch, Route } from 'react-router-dom';
import LoginScreen from './pages/LoginScreen';
import Search from './pages/Search';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ LoginScreen } />
      <Route exact path="/search/meals" component={ Search } />
      <Route exact path="/search/drinks" component={ Search } />
    </Switch>

  );
}

export default App;
