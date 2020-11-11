import React, { Component } from 'react';
import '../App.css';
import styled from 'styled-components';
import skisImage from '../images/skis-and-sticks.png';

class LandingHeader extends Component {
    render(){
        
        const headerStyle = {
            'font-size': '4.0rem',
            'color': '#ffb74d',
            'font-weight': '360'
        }

        const paragraphStyle = {
            'color': '#ffb74d',
            'font-size': '1.5rem',
            'font-weight': '380',
            'margin-top': '-44px'
        }

        const imageStyle = {
            'height': '100%',
            'margin-top': '3%'
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