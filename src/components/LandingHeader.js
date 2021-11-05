import React, { Component } from 'react';
import '../App.css';
import styled from 'styled-components';

class LandingHeader extends Component {
    render(){
        
        //TODO: defined at least twice. refactor as a component.
        const Row = styled.div`
            display: flex;
            flex-direction: row;
            justify-content: center;
        `;

        const deviceType = this.props.deviceType;

        return (
        <div> 
            <Row>
                <h1 className={`landingHeader-${deviceType}`}>Welcome to Mountain Snowpack!</h1>
            </Row>
            <div className='row center'>
                <p className={`landingParagraph-${deviceType}`}>Access snowpack information based on the latest backcountry data</p>
             </div>
        </div> 
        )
    }
}

export default LandingHeader;