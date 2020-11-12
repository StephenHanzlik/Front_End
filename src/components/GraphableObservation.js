import React, { Component } from 'react';
import styled from 'styled-components';
// import Button from '../components/Button';

const Row = styled.div`
    display: flex;
    flex-direction: row !important;
    justify-content: center;
`;

class GraphableObservation extends Component {

    constructor(props) {
        super(props);
        this.state = {
            graphs: ['snowDepth', 'airTemperatureMax', 'airTemperatureMin']
        };
    }

    buildDisplayStringForType(graphType){
        switch(graphType){
            case 'snowDepth':
                return 'Snow Depth';
            case 'changeInSnowDepth':
                return 'Snow Depth Δ';
            case 'snowWaterEquivalent':
                return 'Snow Water Equivalent';
            case 'changeInSnowWaterEquivalent':
                return 'Snow Water Equivalent Δ';
            case 'airTemperatureObserved':
                return 'Air Temperature Observed';
            case 'airTemperatureAverage':
                return 'Air Temperature Average';
            case 'airTemperatureMin':
                return 'Air Temperature Minimum';
            case 'airTemperatureMax':
                return 'Air Temperature Maximum';
                
            default:
                return;
        }   
    }

    buildUnitStringForType(graphType){
        switch(graphType){
            case 'snowDepth':
                return '"';
            case 'changeInSnowDepth':
                return '"';
            case 'snowWaterEquivalent':
                return '"';
            case 'changeInSnowWaterEquivalent':
                return '"';
            case 'airTemperatureObserved':
                return '°F';
            case 'airTemperatureAverage':
                return '°F';
            case 'airTemperatureMin':
                return '°F';
            case 'airTemperatureMax':
                return '°F';
            default:
                return;
        }
    }

    render(){

        const paragraphStyle = {
            'margin': '0 0 0 0',
            'font-size': '23px'
        }

        const currentObservation = this.props.currentObservation;
        const graphType = this.props.graphType;

        return (
            <Row>
                <p style={paragraphStyle}>{this.buildDisplayStringForType(graphType)}: {currentObservation[graphType]}{currentObservation[graphType] ? this.buildUnitStringForType(graphType) : "no data"}</p>
            </Row>    
        )
    }
}

export default GraphableObservation;
