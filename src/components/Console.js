import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class Console extends Component{
    render(){
        return(
            <h1>I am console</h1>
        )
    }
}

export default withRouter(Console);