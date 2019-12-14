import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';


class Console extends Component{
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //       isActive: false,
    //     };
    //     this.myProp = this.myProp
    //   }


    render(){
        return(
            <h1>I am console</h1>
        )
    }
}

export default withRouter(Console);