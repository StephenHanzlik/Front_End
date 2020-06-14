import './App.css';
import React, { Component } from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Console from './pages/Console';
import Details from './pages/Details';


class App extends Component {
  render() {
    return (

      <div className="App">
        <Router basename={process.env.REACT_APP_ROUTER_BASE || ''}>
          <Switch>
            <Route exact path="/" component={LandingPage}/>
            <Route exact path="/console" component={Console}/>
            <Route path="/details" component={Details}/>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
