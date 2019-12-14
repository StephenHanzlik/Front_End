import React, { Component, useState } from 'react';
import styled from 'styled-components';
import {BrowserRouter as Router, Link} from 'react-router-dom';
import {withRouter} from 'react-router-dom';


const GenericButton = styled.button`
  color: #ffb74d;
  back-ground: black;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid #ffb74d;
  border-radius: 3px;
  background: none;
`;

class Button extends Component {
    constructor(props) {
        super(props);
        this.updateComponent = this.updateComponent.bind(this);
        this.state ={
            count: 0
        };
      }
      componentDidUpdate() {
       console.log("update")
      }
      
    updateComponent(){
        this.setState({count: 1});
        console.log("count", this.state.count)
        //This is not what we want.  We want to do this with state
        // setTimeout(function(){ window.location.reload(true);}, 500);
    }

    render(){
        return (
            // refactor the button text as props so this button can be reused
            <Router>
              <Link to="/console">
                 <GenericButton onClick={this.updateComponent}>SNOTEL Console</GenericButton>
              </Link>
            </Router>
        )
    }
}

export default withRouter(Button);
