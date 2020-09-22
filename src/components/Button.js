import React, { Component } from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';


const LargeButton = styled.button`
  color: #ffb74d;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid #ffb74d;
  border-radius: 3px;
  background: none;
`;

const SmallButton = styled.button`
  color: #ffb74d;
  font-size: 1em;
  padding: 0.2em 0.2em;
  border: 2px solid #ffb74d;
  border-radius: 3px;
  background: none;
`

class Button extends Component {

    render(){
        return (
              <Link to={this.props.link}>
                {this.props.size === 'small' ? 
                  <SmallButton></SmallButton>
                :
                  <LargeButton>{this.props.text}</LargeButton>
                }

              </Link>
        )
    }
}

export default Button;
