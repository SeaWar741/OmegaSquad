import React, { Component } from 'react';
import { Route,Router, Switch } from 'react-router';
import { Layout } from './components/Layout';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import history from './history';


import Login from './components/Login/';
import Home  from './components/Home';
import Game from './components/Game';
import Stats from './components/Stats';
import Leaderboard from './components/Leaderboard';


import './custom.css'

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Router history={history}>
          <Switch>
            <Route exact path='/' component={Login} />
            <Route path='/home' component={Home} />
            <Route path='/game' component={Game} />
            <Route path='/leaderboard' component={Leaderboard} />
            <Route path='/counter' component={Counter} />
            <Route path='/stats' component={Stats}/>
            <Route path='/fetch-data' component={FetchData} />
          </Switch>
        </Router> 
      </Layout>
    );
  }
}
