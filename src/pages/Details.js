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
        let url = window.location.href;
        let triplet = url.slice(url.indexOf("details/") + 8);
        console.log("triplet", triplet)
        this.setState({
            stationTriplet: triplet
        }, function(){console.log(this.state)})
    }

    render(){
        return(
            <div>
                <NavBar/>
                <MapWrapper>
                    <Map></Map>
                </MapWrapper>
                <DataWrapper>
                </DataWrapper>
            </div>

        )
    }
}

export default Details;