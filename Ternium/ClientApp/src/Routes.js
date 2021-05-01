import React, { Component } from 'react';
import { Route,Router, Switch,Redirect } from 'react-router';

import { FetchData } from './components/FetchData';
import history from './history';


import Login from './components/Login/';
import Home  from './components/Home';
import Game from './components/Game';
import Stats from './components/Stats';
import Leaderboard from './components/Leaderboard';
import Config from './components/Config';


//Redux
import { useSelector } from 'react-redux';


const ProtectedRoute = ({ component: Comp, loggedIn, path, ...rest }) => {
    return (
      <Route
        path={path}
        {...rest}
        render={(props) => {
          return loggedIn ? <Comp {...props} /> : <Redirect to="/" />;
        }}
      />
    );
};

const ProtectedRouteLogged = ({ component: Comp, loggedIn, path, ...rest }) => {
  return (
    <Route
      path={path}
      {...rest}
      render={(props) => {
        return !loggedIn ? <Comp {...props} /> : <Redirect to="/home" />;
      }}
    />
  );
};
  

const Routes = () => {
    const username = useSelector(state => state.usernameState.username)
    

    return (
        <Router history={history}>
          <Switch>
            <ProtectedRouteLogged loggedIn={username} exact path='/' component={Login} />

            <ProtectedRoute loggedIn={username} path='/home' component={Home} />
            <ProtectedRoute loggedIn={username} path='/game' component={Game} />
            <ProtectedRoute loggedIn={username} path='/leaderboard' component={Leaderboard} />
            <ProtectedRoute loggedIn={username} path='/stats' component={Stats}/>
            <ProtectedRoute loggedIn={username} path='/settings' component={Config}/>

            <Route path='/fetch-data' component={FetchData} />
          </Switch>
        </Router> 
    );
};

export default Routes;
