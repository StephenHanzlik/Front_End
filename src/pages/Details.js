import React, { Component } from 'react';
import NavBar from '../components/NavBar';
import Map from '../components/Map'
import styled from 'styled-components';

const MapWrapper = styled.div`
    width: 50%;
    background: red;
`;

const DataWrapper = styled.div`
    width: 50%;
    background: green;
`;


class Details extends Component{

    constructor(props) {
        super(props);
        this.state = {
            stationTriplet: ''
        };
    }

    componentDidMount(){
        let triplet = this.getStationTriplet();
        this.setState({
            stationTriplet: triplet
        })
    }

    //TODO:  Impliment redux to reduce API calls
    getStationTriplet(){
        let url = window.location.href;
        return url.slice(url.indexOf("details/") + 8);
    }

    getStationObservations(){

    }

    render(){
        return(
            <div>
                <NavBar/>
                <MapWrapper>
                    <Map
                        geoJson={this.state.geoJson}
                    />
                </MapWrapper>
                <DataWrapper>
                </DataWrapper>
            </div>

        )
    }
}

export default Details;