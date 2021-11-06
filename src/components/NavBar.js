import React, { Component } from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';

const Nav = styled.div`
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

const Input = styled.input`
    padding: 0.5em;
    margin: 0.5em;
    height: 10%;
    width: 15%;
    background: ${ props => props.textEntered ? "rgba(255,239,213,0.6)" : "none" }; 
    border: 2px solid #ffb74d !important;
    outline: none;
    border-radius: 3px;
    margin-left: auto;
    // margin-top: -3px;
    text-align: center;
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
              {/* <Link style={linkParagraphStyle} to='/'>Home</Link> */}
              {/* {this.props.link === 'explore' && 
                <Link style={linkParagraphStyle} to='/console'>Explore</Link>
              } */}
              {this.props.home && 
                <Link style={linkParagraphStyle} to='/'>Home</Link>
              }
              {this.props.map && 
                <Link style={linkParagraphStyle} to='/console'>Map</Link>
              }
              {this.props.about && 
                <Link style={linkParagraphStyle} to='/about'>About</Link>
              }
              {this.props.search &&
                <Input 
                //  onChange={this.handleSearchChange} 
                //  onSelect={this.handleSearchChange} 
                //  value={this.state.textEntered} 
                 type="text"
                //  textEntered={this.state.searchPlaceHolder} 
                 placeholder="&#128269;  " 
                 id={"searchInput"}
                 className='input::placeholder'
                />                
              }
              
            </NavHeader>
          </Nav>
        )
    }
}

export default NavBar;