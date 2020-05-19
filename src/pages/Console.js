import React, { Component } from 'react';
import NavBar from '../components/NavBar';
import Graph from '../components/Graph';
import Map from '../components/Map';
import styled from 'styled-components';
import axios from 'axios';

const MapWrapper = styled.div`
    display: flex;
    justify-content: center;
    padding-top: 20px;
`;

const GraphWrapper = styled.div`
    display: flex;
    justify-content: center;
`;

class Console extends Component{

    constructor(props) {
        super(props);
        this.state = {
            observations: '',
            stationTriplet: ''
        };
        this.getObservations = this.getObservations.bind(this);
    }

    getObservations(triplet){
        console.log('triplet', triplet)
        axios.get(`/EnosJava/api/snotel/observations/${triplet}?from=2019-10-14&to=2020-04-14`)
        .then(response => {
            this.setState({
                stationTriplet: triplet,
                observations: response.data
            })
        })
        .catch(error => console.log(error))
    }

    render(){
        return(
            // Todo: Make stations API call here and pass as props to Map
            <div>
                <NavBar/>
                <MapWrapper>
                    <Map
                        getObservations={this.getObservations}
                    />
                </MapWrapper>
                <GraphWrapper>
                    <Graph
                        observations={this.state.observations}
                    />
                </GraphWrapper>
                
            </div>
        )
    }
}

export default Console;