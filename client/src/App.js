import React from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import LoginContainer from './containers/login/login';
import LeagueDashboard from './containers/dashboard/dashboard';
import { auth, checkAuth } from './lib/auth';
import './App.css';

checkAuth();

const PrivateRoute = ({
  path, component: Component,
}) => (
  <Route
    render={(props) => (auth.isAuthenticated ? (
      <Component {...props} />// eslint-disable-line react/jsx-props-no-spreading
    ) : (
      <Redirect to={{
        pathname: '/login',
      }}
      />
    ))}
  />
);


class App extends React.Component {
  render() {
    const App = () => (
      <div>
        <Switch>
          <Route exact path='/login' component={LoginContainer} />
          <PrivateRoute exact path='/dashboard' component={LeagueDashboard} />
        </Switch>
      </div>
    )
    return (
      <Switch>
        <App/>
      </Switch>
    );
  }
}

export default withRouter(App);
