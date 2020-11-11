import React, { Component } from 'react';
import '../App.css';
import backGroundImg from '../images/landing-page-img.jpg';
import snotelStation from '../images/snotelStation.jpg';
import meteorBurst from '../images/meteorBurst.jpg';
import LandingHeader from '../components/LandingHeader';
import Button from '../components/Button';
import styled from 'styled-components';
import {withRouter} from 'react-router-dom';
import {animateScroll as scroll } from "react-scroll";

const Background = styled.div`
    background-image: url(${backGroundImg});
    background-size: 100%;
    width: 100%;
    height: 80vh;
    margin-top: -20vh
`;

// currently handled in CSS.  Should impliment with styled components
const LandingHeaderContainer = styled.div`
    margin-top: -60vh;
    height: 100vh;
`;

const AboutContentContainer = styled.div`
    margin-top: -5%;
    width: 100%;
    height: 1200px;
`;

const ButtonWrapper = styled.div`
    // height: 10px;
    display: flex;
    flex-direction: column;
`;

const ParagraphContainer = styled.div`
    width: 65%;
    margin-left: auto;
    margin-right: auto;
`

const PolaroidContainer = styled.div`
    width: 32%;
    background-color: white;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    margin-bottom: 25px;
    margin-left: auto;
    margin-right: auto;
`
const PolaroidDiscription = styled.div`
    text-align: center;
    padding: 10px 20px;
`

class LandingPage extends Component {

    scrollToAboutSection(){
        scroll.scrollTo('1000');
    }

    render(){
        const imgStyle = {
            'width': '100%'
        }

        const paragraphStyle = {
            'font-size': '22px',
            'margin-top': '30px',
            'margin-bottom': '30px'
        }

        const aboutButtonStyle = {
            'margin-top': '-18px'
        }

        return(
        <div>
            <Background/>
            <LandingHeaderContainer>
              <LandingHeader/>
                <ButtonWrapper>
                    <Button text="Explore Stations →" link="/console" />
                    <div style={aboutButtonStyle} onClick={() => this.scrollToAboutSection()}>
                        <Button text="About ↓" />
                    </div>
                </ButtonWrapper>
            </LandingHeaderContainer>
            <AboutContentContainer name='aboutSection'>
                <h3>SNOTEL and Mountain Snowpack</h3>
                <ParagraphContainer>
                    <p style={paragraphStyle}>SNOTEL stations are automated snow and weather observation stations run by the Natural Resources Conservation Service (NRCS).  They are located in remote
                    mountain areas and are powered by solar panels.  They are designed to operate unattended and without maintenance for a year.  The NRCS receives data
                    from the stations via meteor burst communications technology to collect data in near real time.  Meteor burst technology effectivly bounces VHF radio signals
                    off an ever-present band of iononized meteors 50 to 70 miles above the earths surface.  Because of this the entire system does not use any satellites.</p>
                </ParagraphContainer>
                <PolaroidContainer>
                    <img src={meteorBurst} alt='meteorBurst' style={imgStyle}/>
                    <PolaroidDiscription>
                        <p>Meteor burst technology</p>
                    </PolaroidDiscription>
                </PolaroidContainer>
                <ParagraphContainer>
                    <p style={paragraphStyle}>The Mountain Snowpack application uses APIs provided by the NRCS meant to deliver CSV files used in academic and government reports.  We convert these CSVs for on the fly graphing and station exlporation.
                    Because of the nature of meteor burst technology, this app is not always real time and it will sometimes appear as if current data is missing.  Check back in for the most up to date information or explore nearby stations and reference past data points to extrapolate current 
                    conditions.  This application primarly focuses on Snow Depth, Snow Water Equivalent, Air temperuature, and the 24 hours change in these values notaded as Δ.  This data is of importance to backcountry skiers, climbers, hikers, and other 
                    recreationalists who are interested in the current status of the snowpack.
                    </p>
                </ParagraphContainer>
                <PolaroidContainer>
                    <img src={snotelStation} alt='snotelStation' style={imgStyle}/>
                    <PolaroidDiscription>
                        <p>A typical SNOTEL station</p>
                    </PolaroidDiscription>
                </PolaroidContainer>
            </AboutContentContainer>
        </div> 
        )
    }
}

export default withRouter(LandingPage);