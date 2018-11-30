import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import {Button, Icon, Modal, Parallax} from 'react-materialize'

// https://react-materialize.github.io/#/

class App extends Component {
  render() {
    return (
      <div className="App">
        {/* <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header> */}
        <div>
          <Parallax imageSrc={require('./images/landing-page-img.jpg')}/>
            <div className="section white">
              <div className="row container">
                <h2 className="header">Parallax</h2>
                <p className="grey-text text-darken-3 lighten-3">Parallax is an effect where the background content or image in this case, is moved at a different speed than the foreground content while scrolling.</p>
              </div>
            </div>
          <Parallax imageSrc="http://materializecss.com/images/parallax2.jpg"/>
        </div>
        <Modal
          header='Modal Header'
          trigger={<Button waves='light'>OR ME!<Icon right>insert_chart</Icon></Button>}>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua.</p>
        </Modal>
      </div>
    );
  }
}

export default App;
