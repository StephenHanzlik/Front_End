import './App.css';
import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import MapPage from './pages/MapPage';
import Details from './pages/Details';

function App() {
  return (
        <div className="App">
        <Router basename={process.env.REACT_APP_ROUTER_BASE || ''}>
          <Switch>
            <Route exact path="/" component={LandingPage}/>
            <Route exact path="/map" component={MapPage}/>
            <Route path="/details" component={Details}/>
          </Switch>
        </Router>
      </div>
  );
}

export default App;


