import React, { Component } from 'react';
import styled from 'styled-components';
import Button from '../components/Button';

const Row = styled.div`
    display: flex;
    flex-direction: row !important;
    justify-content: center;
`;

class GraphableObservation extends Component {
    render(){

        const paragraphStyle = {
            'margin': '0 0 0 0',
            'font-size': '23px'
        }
      //props:

      //style
      //currentObservation
      //graphType
      //
        // const {snowDepth, changeInSnowDepth, snowWaterEquivalent, changeInSnowWaterEquivalent, 
        // airTemperatureObserved, airTemperatureAverage, airTemperatureMin, airTemperatureMax} = this.props.currentObservation;
        const currentObservation = this.props.currentObservation;
        const graphType = this.props.graphType;

        return (
            <Row>
                <p style={paragraphStyle}>Snow Depth: {currentObservation[graphType]}"</p>
                <div onClick={() => this.toggleGraph(graphType)}>
                    {this.state.graphs.indexOf(graphType) > -1 &&
                        <Button size={"small"} selected={true}/>
                    }
                    {this.state.graphs.indexOf(graphType) <= -1 &&
                        <Button size={"small"} selected={false}/>
                    }   
                </div>
            </Row>    
        )
    }
}

export default GraphableObservation;
