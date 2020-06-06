import React, { Component } from 'react';
import NavBar from '../components/NavBar';
// import styled from 'styled-components';


class Details extends Component{

    constructor(props) {
        super(props);
        this.state = {
            stationTriplet: ''
        };
    }

    componentDidMount(){
        let url = window.location.href;
        let triplet = url.slice(url.indexOf("details/") + 8);
        console.log("triplet", triplet)
        this.setState({
            stationTriplet: triplet
        }, function(){console.log(this.state)})
    }

    render(){
        return(
            <NavBar></NavBar>
        )
    }
}

export default Details;