import React from 'react';
import { Switch, Route } from 'react-router';
import App from './App';
import MovieDescription from './features/MovieList/MovieDescription/MovieDescription';
import Login from './features/Auth/Login/Login';
import Actors from './features/Actors/Actors';
import EditMovie from './features/MovieList/EditMovie/EditMovie';
import Registration from './features/Auth/Registration/Registration';
import PrivateRoute from './features/PrivateRoute/PrivateRoute';

class Routes extends React.Component {
  render() {
    return (
      <div>
        <Switch>
          <PrivateRoute
            component={App}
            exact
            path='/'
          />
          <PrivateRoute
            component={MovieDescription}
            exact
            path='/movies/:id'
          />
          <Route
            component={Login}
            exact
            path='/login'
          />
          <Route
            component={Registration}
            exact
            path='/registration'
          />
          <PrivateRoute
            component={Actors}
            exact
            path='/actors/:id'
          />
          <PrivateRoute
            component={EditMovie}
            exact
            path='/editMovie/:id'
          />
        </Switch>
      </div>
    );
  }
}

export default Routes;
