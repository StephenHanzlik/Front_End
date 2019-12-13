import React, { Component } from 'react';
import styled from 'styled-components';

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
            <GenericButton>SNOTEL Console</GenericButton>
        )
    }
}

export default Button;
