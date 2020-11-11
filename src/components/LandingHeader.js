import React, { Component } from 'react';
import '../App.css';
import skisImage from '../images/skis-and-sticks.png';

class LandingHeader extends Component {
    render(){
        
        const headerStyle = {
            'font-size': '3.3rem',
            'color': '#ffb74d',
            'font-weight': '350'
        }

        const textStyle = {
            'color': '#ffb74d'
            // 'font-weight': '400'
        }

        return (
        <div> 
            <h1  style={headerStyle} >MOUNTAIN <img src={skisImage} alt="skis" id="subHead"></img> SNOWPACK</h1>
            <div className="row center">
                <h5 style={textStyle}>a backcountry snow app powered by SNOTEL</h5>
             </div>
        </div> 
        )
    }
}

export default LandingHeader;