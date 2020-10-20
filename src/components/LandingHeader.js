import React, { Component } from 'react';
import '../App.css';
import skisImage from '../images/skis-and-sticks.png';

class LandingHeader extends Component {
    render(){
        
        const headerStyle = {
            'margin-bottom': '-14px'
        }

        return (
        <div> 
            <h1  style={headerStyle} className="Header center orange-text text-lighten-2">MOUNTAIN <img src={skisImage} alt="skis" id="subHead"></img> SNOWPACK</h1>
            <div className="row center">
                <h5 className="header col s12 orange-text text-lighten-2">a backcountry snow app powered by SNOTEL</h5>
             </div>
        </div> 
        )
    }
}

export default LandingHeader;