import React, { Component } from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import styled from 'styled-components';
import axios from 'axios';


const Ul = styled.ul`
    list-style-type: none;
    cursor: pointer;
`

const Row = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
`;

class Console extends Component {

    constructor(props) {
        super(props);
        this.state = {
            stations: []
        };
        this.stateName = undefined;
        this.stateAbbrev = undefined;
        this.getStations = this.getStations.bind(this);
        this.getStateName = this.getStateName.bind(this);
        this.getStateAbbrev = this.getStateAbbrev.bind(this);
    }

    componentDidMount() {
        this.getStations();
    }

    getStations() {
        axios.get(`/api/snotel/stations/state/${this.getStateAbbrev()}`)
            .then(response => {
                console.log("response.data", response.data)
                this.setState({
                    stations: response.data
                })
            })
            .catch(error => console.log(error))
    }

    getStateAbbrev() {
        const url = window.location.href;
        return url.slice(url.indexOf("states/") + 7);
    }

    getStateName() {
        const stateAbbrev = this.getStateAbbrev();
        let stateName;
        switch (stateAbbrev) {
            case "co":
                stateName = "Colorado";
                break;
            case "ca":
                stateName = "California";
                break;
            case "ut":
                stateName = "Utah";
                break;
            case "wa":
                stateName = "Washington";
                break;
            case "or":
                stateName = "Oregon";
                break;
            case "mt":
                stateName = "Montana";
                break;
            case "nm":
                stateName = "New Mexico";
                break;
            case "wy":
                stateName = "Wyoming";
                break;
            case "ak":
                stateName = "Alaska";
                break;
            case "id":
                stateName = "Idaho";
                break;
            case "az":
                stateName = "Arizona";
                break;
            case "nv":
                stateName = "Nevada";
                break;
            case "sd":
                stateName = "South Dakota";
                break;
            default:
                break;
        };
        return stateName;
    }

    render() {
        const stationNameStyle = {
            "color": "#293d52",
            'margin-top': '0px',
            'margin-bottom': '0px'
        };
        const stationElevationStyle = {
            "color": "#516171",
            'margin-top': '0px',
            'margin-bottom': '0px'
        };
        
        const stations = this.state.stations.map((station, index) => <li key={index} id={station.triplet}>
            <Row id={station.triplet}>
                <p id={station.triplet} style={stationNameStyle}>{station.name} -</p> 
                <p id={station.triplet} style={stationElevationStyle}>{station.elevation}ft</p>
            </Row>    
            </li>);

        return (
            <div>
                <NavBar home={true} about={true} search={true}/>
                    <h1>{this.getStateName()}</h1>
                    <div>
                        <Ul
                        onClick={(ev)=> window.location.href = `/stations/${ev.target.id}`}
                        >
                        {stations}
                        </Ul>
                    </div>
                <Footer/>
            </div>
        )
    }
}

export default Console;