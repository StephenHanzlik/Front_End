import './App.css';
import React, { Component } from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Console from './pages/Console';

class App extends Component {
  render() {
    return (

      // https://blogg.kantega.no/webapp-with-create-react-app-and-spring-boot/
      // https://www.megadix.it/blog/create-react-app-servlet/
      // http://frugalisminds.com/react-js/deploy-react-js-in-tomcat/?__cf_chl_jschl_tk__=5c22dfc9c07850c8ceecec9e2ee0d72259b90fd1-1589553297-0-ASiNBqI3xQtJq1lkRAN6DkCMULXTYGGPRAheX8ekLJFMAGKYSQPRTmLxA44z25ri59UGjsRBf4ffNXZUrfnK1y0vvoSPk2yQ5yLSSNz-yziUa2X-bYAFnEwG4H-3Z4pepKjKoJQ9lfgCwACXV8U6qAT8nD5jtz4nx5C6IgMLWWjd5q0ZStTUXwzxx9OscBGH0I8onCg3Et8iVySYqqGxoUlqNH-ydl4c5sqt5mILw-Ll4JGtaJDQzw5cntWbUdHeZ5p1cNsf40CfI2a_d8nEf_0IbhYFCQ3fZKZddy7U9SmU3T_xXdR7vBxOc1RKN6p3ZA
      // https://create-react-app.dev/docs/deployment/

      <div className="App">
        <Router basename={process.env.REACT_APP_ROUTER_BASE || ''}>
          <Switch>
            <Route exact path="/" component={LandingPage}/>
            <Route exact path="/console" component={Console}/>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
