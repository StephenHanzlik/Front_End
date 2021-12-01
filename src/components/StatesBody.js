import React, { Component } from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import styled from 'styled-components';
import axios from 'axios';


const Ul = styled.ul`
`

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
        axios.get(`/api/snotel/stations/${this.getStateAbbrev()}`)
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
        const stations = this.state.stations.map((station, index) => <li key={index} id={station.triplet}>{station.name} - {station.elevation}</li>);

        return (
            <div>
                <NavBar home={true} about={true} search={true}/>
                    <h1>{this.getStateName()}</h1>
                    <div>
                        <Ul>{stations}</Ul>
                    </div>
                <Footer/>
            </div>
        )
    }
}

export default Console;