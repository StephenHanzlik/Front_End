import React, { Component } from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';

const Nav = styled.div`
  //teal
  // background: #4db6ac;
  //gray
  // background: rgba(0, 0, 0, .5);
  //graph border
  // background: #A6CEE3;
  //splash background 
  background: #3076AA;
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
        'font-weight': '500',
        'text-decoration': 'none'
      }
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