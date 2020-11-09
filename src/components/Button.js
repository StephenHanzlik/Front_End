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
  padding: 0.3em 0.3em;
  border: 2px solid #ffb74d;
  border-radius: 3px;
`

class Button extends Component {
    render(){
      let selected;
      this.props.selected ? selected  = {"background": "#3076AA"} : selected = {"background": "none"};
        return (
              <Link to={this.props.link}>
                {this.props.size === 'small' ? 
                  <SmallButton style={selected}>{this.props.text}</SmallButton>
                :
                  <LargeButton>{this.props.text}</LargeButton>
                }
              </Link>
        )
    }
}

export default Button;
