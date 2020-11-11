import React, { Component } from 'react';
import '../App.css';
import styled from 'styled-components';
import skisImage from '../images/skis-and-sticks.png';

class LandingHeader extends Component {
    render(){
        
        const headerStyle = {
            'font-size': '3.3rem',
            'color': '#ffb74d',
            'font-weight': '380'
        }

        const paragraphStyle = {
            'color': '#ffb74d',
            'font-size': '1.0rem',
            'font-weight': '400'
        }

        const imageStyle = {
            'height': '100%',
            'margin-top': '33px'
        }
        
        //TODO: defined at least twice. refactor as a component.
        const Row = styled.div`
            display: flex;
            flex-direction: row;
            justify-content: center;
        `;


        return (
        <div> 
            <Row>
                <h1 style={headerStyle} >MOUNTAIN</h1>
                <img style={imageStyle} src={skisImage} alt="skis" id="subHead"></img> 
                <h1 style={headerStyle}>SNOWPACK</h1>
            </Row>
            <div className="row center">
                <p style={paragraphStyle}>a backcountry snow app powered by SNOTEL</p>
             </div>
        </div> 
        )
    }
}

export default LandingHeader;