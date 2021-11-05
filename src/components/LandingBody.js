import React, { Component } from 'react';
import '../App.css';
import backGroundImg from '../images/landing-page-img.jpg';
import snotelStation from '../images/snotelStation.jpg';
import dragonstailDan from '../images/dragonstail_dan.jpg';
import meteorBurst from '../images/meteorBurst.jpg';
import LandingHeader from '../components/LandingHeader';
import Button from '../components/Button';
import styled from 'styled-components';
import {withRouter} from 'react-router-dom';
import axios from 'axios';
import { useMediaQuery } from 'react-responsive';


const Background = styled.div`
    background-image: url(${backGroundImg});
    background-size: 100%;
    width: 100%;
    height: 80vh;
    margin-top: -20vh
`;

const LandingHeaderContainer = styled.div`
    margin-top: -60vh
    height: 80vh;
`;

const AboutContentContainer = styled.div`
    margin-top: -8%;
    width: 100%;
    height: 1200px;
`;

const ButtonWrapper = styled.div`
    // height: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

const ParagraphContainer = styled.div`
    text-align: justify;
`

const PolaroidContainer = styled.div`
    background-color: white;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    // margin-bottom: 25px;
    margin-left: auto;
    margin-right: auto;
    border-radius: 5px;
    overflow: hidden;
`
const PolaroidDiscription = styled.div`
    text-align: center;
    // padding: 10px 20px;
`

const Row = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: ${ props => props.flexEnd ? "flex-end" : "flex-start" }; 
    margin-left: 13%;
    margin-right: 13%;
`;

const Column = styled.div`
    display: flex;
    flex-direction: column;
    width: 48em;
    height: 30em;
    justify-content: center;
`;


const Input = styled.input`
    padding: 0.5em;
    margin: 0.5em;
    height: 10%;
    width: 8%;
    background: ${ props => props.textEntered ? "rgba(255,239,213,0.6)" : "none" }; 
    border: 2px solid #ffb74d !important;
    outline: none;
    border-radius: 3px;
    margin-left: auto;
    margin-right: auto;
    margin-top: -3px;
    text-align: center;
`;

const Ul = styled.ul`
    list-style-type: none;
    display: ${ props => props.textEntered ? "block" : "none" }; 
    background: ${ props => props.textEntered ? "rgba(255,239,213,0.6)" : "none" }; 
    height: 8%;
    width: 8%;
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
`

const StateCardContainer = styled.div`
    margin-top: -8%;
    width: 100%;
    height: 1200px;
`;

class LandingBody extends Component {

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

    handleSearchChange(ev){
        this.setState({ 
            searchPlaceHolder: true,
            searchText: ev.target.value 
        }); 
    }

    

    generateStateCards() {
        const states = [
            "Colorado",
            "California",
            "Utah",
            "Washington",
            "Oregon",
            "New Mexico",
            "Alaska",
            "Montana",
            "Idaho",
            "Arizona",
            "Nevada",
            "Wyoming",
            "South Dakota"
        ];
        return 
    }

    render(){
        console.log("Landing Page - this.state.stations", this.state.stations);

        const stationsList = this.state.stations
        .filter(station => station.name.includes(this.state.searchText.toUpperCase()))
        .map((station, index) => <li key={index} id={station.triplet}>{station.name}</li>);

        return(
        <div>
            <div className={`background-${this.props.deviceType}`}/>
            <LandingHeaderContainer>
              <LandingHeader/>
                <ButtonWrapper>
                    <Button text="Explore Stations →" link="/console" />
                    <div>
                        <Input 
                            onChange={this.handleSearchChange} 
                            onSelect={this.handleSearchChange} 
                            value={this.state.textEntered} 
                            type="text"
                            textEntered={this.state.searchPlaceHolder} 
                            placeholder="&#128269;  " 
                            id={"searchInput"}
                            className='input::placeholder'
                        />
                        <Ul 
                            textEntered={this.state.searchPlaceHolder} 
                            onClick={(ev)=> window.location.href = `/details/${ev.target.id}`}
                        >
                            {stationsList}
                        </Ul>
                    </div>
                </ButtonWrapper>
            </LandingHeaderContainer>
            <StateCardContainer>
            </StateCardContainer>
        </div> 
        )
    }
}

export default LandingBody;