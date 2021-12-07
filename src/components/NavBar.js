import React, { Component } from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';
import axios from 'axios';

const Nav = styled.div`
  // background: #3076AA; //blue from sky
  // background: #f3f2ef; //linked in grey
  // background: #0d090a //opensnow black
  background: #293d52; //opensnow blue
  height: 48px;
`;
const NavHeader = styled.div`
  max-width: 95%;
  padding: ${props => props.isLanding ? '10px 10px' : ''};
  width: 100%;
  display: flex;
  align-items: center;
  margin: 0 auto;
`;

const Input = styled.input`
    padding: 0.5em;
    margin: 0.5em;
    height: 10%;
    width: 190px;
    background: #f3f2ef;
    outline: none;
    border-radius: 3px;
    margin-left: auto;
    text-align: center;
    border: 2px solid #ffb74d !important;
`;

const Ul = styled.ul`
    list-style-type: none;
    display: ${ props => props.textEntered ? "block" : "none" }; 
    // background: ${ props => props.textEntered ? "rgba(255,239,213,0.6)" : "none" }; 
    background: #ffffff;
    height: 27%;
    width: 87%;
    margin-top: 0px;
    margin-left: auto;
    margin-right: auto;
    text-align: center;
    padding-left: 2%;
    padding-right: 2%;
    overflow-y: auto;
    overflow-x: hidden;
    max-height: 26vh;
    cursor: pointer;
    border-radius: 3px;
`

class NavBar extends Component {

    constructor(props) {
      super(props);
      this.state = { 
          searchPlaceHolder: false, 
          searchText: '',
          stations: []
      }
      this.handleSearchChange = this.handleSearchChange.bind(this);
    }

    componentDidMount() {
      this.getStations();
    }

    handleSearchChange(ev) {
      this.setState({ 
          searchPlaceHolder: true,
          searchText: ev.target.value 
      }); 
    };

    getStations() {
      axios.get('/api/snotel/stations')
          .then(response => {
              let tempStations = response.data;
              console.log("Landing Page - GET Stations Response", tempStations);
              this.setState({
                  stations: tempStations
              })
          })
          .catch(error => console.log(error))
  }

    render(){
      const isLanding = this.props.isLanding;
      const linkParagraphStyle = {
        'color': '#ffb74d',
        'font-size': '20px',
        'padding': '0px 10px 0px 10px',
        'font-weight': '500',
        'text-decoration': 'none',
        'align-self': 'flex-start',
        'margin-top': isLanding ? '0px' : '10px'
      };

      const searchContainerStyle = {
        'margin-left': 'auto',
        'z-index': '99'
      };

      const stationsList = this.state.stations
      .filter(station => station.name.includes(this.state.searchText.toUpperCase()))
      .map((station, index) => <li key={index} id={station.triplet}>{station.name}</li>);

        return (
            <Nav>
            <NavHeader isLanding={isLanding} >
              {/* <Link style={linkParagraphStyle} to='/'>Home</Link> */}
              {/* {this.props.link === 'explore' && 
                <Link style={linkParagraphStyle} to='/console'>Explore</Link>
              } */}
              {this.props.home && 
                <Link style={linkParagraphStyle} to='/'>Home</Link>
              }
              {this.props.map && 
                <Link style={linkParagraphStyle} to='/map'>Map</Link>
              }
              {this.props.about && 
                <Link style={linkParagraphStyle} to='/about'>About</Link>
              }
              {this.props.search &&
                <div style={searchContainerStyle}>
                  <Input 
                  onChange={this.handleSearchChange} 
                  value={this.state.textEntered} 
                  type="text"
                  //  textEntered={this.state.searchPlaceHolder} 
                  placeholder="Search by station name &#128269;  " 
                  id={"searchInput"}
                  className='input::placeholder'
                  /> 
                  <Ul 
                  textEntered={this.state.searchPlaceHolder} 
                  onClick={(ev)=> window.location.href = `/stations/${ev.target.id}`}
                  >
                  {stationsList}
                  </Ul>    
                </div>
           
              }
              
            </NavHeader>
          </Nav>
        )
    }
}

export default NavBar;