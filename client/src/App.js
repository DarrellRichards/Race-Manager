import React from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import LoginContainer from './containers/login/login';
import LeagueDashboard from './containers/dashboard/dashboard';
import RegisterController from './containers/register/register';
import SeasonContainer from './containers/season/season';
import LeagueViewDashboard from './containers/league_viewer/dashboard';
import CreateLeagues from './containers/create/leagues/leagues';
import CreateSeries from './containers/create/series/series';
import CreateEvent from './containers/create/events/events';
import UploadContainer from './containers/results/upload';
import ResultContainer from './containers/results/results';
import { auth, checkAuth } from './lib/auth';
import './App.css';

checkAuth();

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    auth.isAuthenticated === true
      ? <Component {...props} />
      : <Redirect to='/login' />
  )} />
)

// const PrivateRoute = ({
//   path, component: Component,
// }) => (
//   <Route
//     render={(props) => (auth.isAuthenticated ? (
//       <Component {...props} />// eslint-disable-line react/jsx-props-no-spreading
//     ) : (
//       <Redirect to={{
//         pathname: '/login',
//       }}
//       />
//     ))}
//   />
// );


class App extends React.Component {
  render() {
    const App = () => (
      <div>
        <Switch>
          <Route exact path='/login' component={LoginContainer} />
          <Route exact path='/register' component={RegisterController} />
          <PrivateRoute exact path='/create/league' component={CreateLeagues} />
          <PrivateRoute path='/league/:id' component={LeagueViewDashboard} />
          <PrivateRoute path='/season/:id/create/event/:series' component={CreateEvent} />
          <PrivateRoute path='/season/:id/upload/results/:event' component={UploadContainer} />
          <PrivateRoute path='/results/:result' component={ResultContainer} />
          <PrivateRoute path='/create/season/:series' component={CreateEvent} />
          <PrivateRoute path='/season/:id' component={SeasonContainer} />
          <Route path='/season/:id/create/series/:season' component={CreateSeries} />
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
