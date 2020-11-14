import React, { Component } from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';


const LargeButton = styled.button`
  color: #ffb74d;
  font-size: 1em;
  margin: 1em;
  padding: 0.36em 1em;
  border: 2px solid #ffb74d;
  border-radius: 3px;
  background: none;
  cursor: pointer;
`;

const SmallButton = styled.button`
  color: #ffb74d;
  font-size: 1em;
  border: 2px solid #ffb74d;
  border-radius: 3px;
  cursor: pointer;
`



class Button extends Component {
    render(){
      // const linkStyle = {
      //   'max-width': '300px'
      // }
      //style={linkStyle}


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
