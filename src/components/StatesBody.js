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
        this.getStations = this.getStations.bind(this);
        this.getStateName = this.getStateName.bind(this);
    }

    componentDidMount() {
        this.getStations();
    }

    getStations() {
        axios.get('/api/snotel/stations')
            .then(response => {
                console.log("response.data", response.data)
                this.setState({
                    stations: response.data
                })
            })
            .catch(error => console.log(error))
    }

    getStateName() {
        let url = window.location.href;
        return url.slice(url.indexOf("stations/") + 30);
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