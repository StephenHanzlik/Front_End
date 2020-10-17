import React, { Component } from 'react';
import '../App.css';
import backGroundImg from '../images/landing-page-img.jpg';
import snotelStation from '../images/snotelStation.jpg';
import meteorBurst from '../images/meteorBurst.png';
import LandingHeader from '../components/LandingHeader';
import Button from '../components/Button';
import styled from 'styled-components';
import {withRouter} from 'react-router-dom';
import { Link, animateScroll as scroll } from "react-scroll";

const Background = styled.div`
    background-image: url(${backGroundImg});
    background-size: 100%;
    width: 100%;
    height: 100vh;
`;

// currently handled in CSS.  Should impliment with styled components
const LandingHeaderContainer = styled.div`
    margin-top: -44%;
    height: 100vh;
`;

const AboutContentContainer = styled.div`
    width: 100%
    height: 1200px;
`;

const ButtonWrapper = styled.div`
    // height: 10px;
    display: flex;
    flex-direction: column;
`;

class LandingPage extends Component {

    // scrollToAbout(){
        // scroll
    // }

    render(){
        return(
        <div>
            <Background/>
            <LandingHeaderContainer>
              <LandingHeader/>
                <ButtonWrapper>
                    <Button text="Explore Stations →" link="/console" />
                    <Button text="About ↓"/>
                    {/* <Link
                        activeClass="active"
                        to="section1"
                        spy={true}
                        smooth={true}
                        offset={-70}
                        duration={500}
                    ></Link> */}
                </ButtonWrapper>
            </LandingHeaderContainer>
            <AboutContentContainer>
                <h2>About SNOTEL</h2>
                <img src={snotelStation} alt='snotelStation'/>
                <p>SNOTEL stations are automated snow and weather observation stations run by the Natrual Resources Conservation Service (NRCS).  They are located in remote
                    mountain areas and are primarily powered by solar panels.  They are designed to operate unattended and without mantaince for a year.  The NRCS recieves data
                    from the stations via meteor burst communications technology to collect data in near real time.  Meteor burst technology effectivly bounces VHF radio signals
                    off an ever-present band of iononized meteors 50 to 70 miles above the earths surface.  Because of this the entire system does not use any satellites.</p>
                <img src={meteorBurst} alt='meteorBurst'/>
            </AboutContentContainer>
        </div> 
        )
    }
}

export default withRouter(LandingPage);