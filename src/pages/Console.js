import React, { Component } from 'react';
import NavBar from '../components/NavBar';
import PrimaryGraph from '../components/PrimaryGraph';

class Console extends Component{

    render(){
        return(
            // eventualy pass props to graph and allow for 
            // customization of the dashboard
            <div>
                <NavBar/>
                <PrimaryGraph/>
            </div>
        )
    }
}

export default Console;