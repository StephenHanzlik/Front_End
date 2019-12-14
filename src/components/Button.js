import React, { Component } from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';


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

    render(){
        return (
            // refactor the button text as props so this button can be reused
              <Link to="/console">
                 <GenericButton >SNOTEL Console</GenericButton>
              </Link>
        )
    }
}

export default Button;
