import React, { Component } from 'react';
import '../App.css';
import backGroundImg from '../images/landing-page-img.jpg';
import LandingHeader from '../components/LandingHeader';
import Button from '../components/Button';
import styled from 'styled-components';
import {withRouter} from 'react-router-dom';


const Background = styled.div`
    background-image: url(${backGroundImg});
    background-size: 100%;
    width: 100%;
    height: 100vh;
`;

// currently handled in CSS.  Should impliment with styled components
const LandingHeaderContainer = styled.div`
    margin-top: -44%;
`;

const AboutContentContainer = styled.div`
    width: 100%
    height: 1200px;
`;

class LandingPage extends Component {
    render(){
        return(
        <div>
            <Background/>
            <LandingHeaderContainer>
              <LandingHeader/>
                <Button/>
            </LandingHeaderContainer>
            <AboutContentContainer/>
        </div> 
        )
    }
}

export default withRouter(LandingPage);