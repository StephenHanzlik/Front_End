import React, { Component } from 'react';
import NavBar from '../components/NavBar';
import Graph from '../components/Graph';
import Map from '../components/Map';
import Footer from '../components/Footer';
import snowFlake from '../images/snowflake.jpg';
import GeoJsonFeatureCollection from '../classes/GeoJsonFeatureCollection';
import GeoJsonFeature from '../classes/GeoJsonFeature';
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

const PolaroidContainer = styled.div`
    width: 25%;
    background-color: #F5F5F5 //white smoke
    color: black
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    margin-top: 25px;
    margin-left: auto;
    margin-right: auto;
    border-radius: 7px;
    overflow: hidden;
    width: ${props => props.deviceType === 'isBigScreen' || props.deviceType === 'isDesktopOrLaptop' ? '55%': '80%'}}
`
const Row = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
`;

const Column = styled.div`
    display: flex;
    flex-direction: column;
`;

const PolaroidDiscription = styled.div`
    text-align: justify;
    padding: 7px 20px 13px;
`

class Console extends Component {

    constructor(props) {
        super(props);
        this.state = {
            stations: []
        };
        this.getStations = this.getStations.bind(this);
    }

    componentDidMount() {
        this.getStations();
    }

    getStations() {
        axios.get('/api/snotel/stations')
            .then(response => {
                this.setState({
                    stations: response.data
                })
            })
            .catch(error => console.log(error))
    }



    render() {
        const deviceType = this.props.deviceType;

        return (
            <div>
                <NavBar home={true} about={true} search={true} />
                    <h1>COLORADO</h1>
                    <div>stations cards will go here</div>
                <Footer/>
            </div>
        )
    }
}

export default Console;