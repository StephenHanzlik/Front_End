import React, { Component } from 'react';
import NavBar from '../components/NavBar';
import PrimaryGraph from '../components/PrimaryGraph';
import Map from '../components/Map';
import styled from 'styled-components';

const MapWrapper = styled.div`
    display: flex;
    justify-content: center;
`;

class Console extends Component{
    render(){
        return(
            // eventualy pass props to graph and allow for 
            // customization of the dashboard
            <div>
                <NavBar/>
                <MapWrapper>
                    <Map/>
                </MapWrapper>
                <PrimaryGraph/>
            </div>
        )
    }
}

export default Console;