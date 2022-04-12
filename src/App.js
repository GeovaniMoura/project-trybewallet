import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login/Login';
import Wallet from './pages/Wallet/Wallet';

class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route
          exact
          path="/"
          render={ (props) => <Login { ...props } /> }
        />
        <Route
          exact
          path="/carteira"
          component={ Wallet }
        />
      </Switch>
    );
  }
}

export default App;
