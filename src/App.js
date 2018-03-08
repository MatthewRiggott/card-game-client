import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import Lobby from './pages/lobby/Lobby';
import GameSession from './pages/session/GameSession';
import RegistrationModal from './pages/signup/RegistrationModal';

class App extends Component {
  render() {
    const isAuthenticated = !!localStorage.getItem["currentPlayer"];
    if(!isAuthenticated) {
      return <RegistrationModal />
    }
    return (
      <BrowserRouter>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Welcome to React</h1>
          </header>
          <Switch>
            <Route exact path="/game/:id" component={GameSession} />
            <Route exact path="/" component={Lobby} />
          </Switch>
          
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
