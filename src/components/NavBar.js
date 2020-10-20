import React, { Component } from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';

const Nav = styled.div`
  background: #4db6ac;
`;
const NavHeader = styled.div`
  max-width: 95%;
  padding: 10px 10px;
  width: 100%;
  display: flex;
  align-items: center;
  margin: 0 auto;
`;

class NavBar extends Component {

    render(){
      const linkParagraphStyle = {
        'color': '#ffb74d',
        'font-size': '20px',
        'padding': '0px 13px 0px 13px',
        'font-weight': '500'
      }
      console.log('this.props', this.props)
        return (
            <Nav>
            <NavHeader>
              <Link style={linkParagraphStyle} to='/'>Home</Link>
              {this.props.link === 'explore' && 
                <Link style={linkParagraphStyle} to='/console'>Explore</Link>
              }
              
            </NavHeader>
          </Nav>
        )
    }
}

export default NavBar;