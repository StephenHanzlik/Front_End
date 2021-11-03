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

        //TODO: defined at least twice. refactor as a component.
        const Row = styled.div`
            display: flex;
            flex-direction: row;
            justify-content: center;
        `;


        return (
        <div> 
            <Row>
                <h1 style={headerStyle}>Welcome to Mountain Snowpack!</h1>
            </Row>
            <div className="row center">
                <p style={paragraphStyle}>Access snowpack information based on the latest backcountry data</p>
             </div>
        </div> 
        )
    }
}

export default LandingHeader;