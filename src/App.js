import React, { Component } from 'react';
import './App.css';
import styled from 'styled-components';
import backGroundImg from './images/landing-page-img.jpg';
import skisImage from './images/skis-and-sticks.png';
 

const Background = styled.div`
    background-image: url(${backGroundImg});
    background-size: 100%;
    width: 100%;
    height: 100vh;
`;
// currently handled in CSS.  Should impliment with styled components
// const Header = styled.div`
//     margin-top: -25%;
// `;

class App extends Component {
  render() {
    return (
      <div className="App">
        <Background/>
        <div> 
          <h1 id="header-1" className="Header center orange-text text-lighten-2">SUNSHINE <img src={skisImage} alt="skis" id="subHead"></img> DAYDREAM</h1>
           <div className="row center">
              <h5 className="header col s12 orange-text text-lighten-2">a backcountry snow and weather app</h5>
           </div>
        </div> 
      </div>
    );
  }
}

export default App;
