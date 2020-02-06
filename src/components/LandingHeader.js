import React, { Component } from 'react';
import '../App.css';
import skisImage from '../images/skis-and-sticks.png';

class LandingHeader extends Component {
    render(){
        return (
        <div> 
            <h1 className="Header center orange-text text-lighten-2">SUNSHINE <img src={skisImage} alt="skis" id="subHead"></img> DAYDREAM</h1>
            <div className="row center">
                <h5 className="header col s12 orange-text text-lighten-2">a backcountry snow and weather app</h5>
             </div>
        </div> 
        )
    }
}

export default LandingHeader;