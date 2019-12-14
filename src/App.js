import './App.css';
import React, { Component } from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Console from './pages/Console';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route exact path="/" component={LandingPage}/>
            <Route path="/console" component={Console}/>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
