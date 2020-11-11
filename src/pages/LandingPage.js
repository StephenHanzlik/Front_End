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
import axios from 'axios';

const Background = styled.div`
    background-image: url(${backGroundImg});
    background-size: 100%;
    width: 100%;
    height: 80vh;
    margin-top: -20vh
`;

const LandingHeaderContainer = styled.div`
    margin-top: -60vh
    height: 80vh;
`;

const AboutContentContainer = styled.div`
    margin-top: -8%;
    width: 100%;
    height: 1200px;
`;

const ButtonWrapper = styled.div`
    // height: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

const ParagraphContainer = styled.div`
    width: 44%;
    margin-left: auto;
    margin-right: auto;
    text-align: left;
`

const PolaroidContainer = styled.div`
    width: 32%;
    background-color: white;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    margin-bottom: 25px;
    margin-left: auto;
    margin-right: auto;
    border-radius: 5px;
    overflow: hidden;
`
const PolaroidDiscription = styled.div`
    text-align: center;
    padding: 10px 20px;
`

const Input = styled.input`
    padding: 0.5em;
    margin: 0.5em;
    height: 10%;
    width: 8%;
    background: ${ props => props.textEntered ? "rgba(255,239,213,0.6)" : "none" }; 
    border: 2px solid #ffb74d !important;
    outline: none;
    border-radius: 3px;
    margin-left: auto;
    margin-right: auto;
    margin-top: -3px;
    text-align: center;
`;

const Ul = styled.ul`
    list-style-type: none;
    display: ${ props => props.textEntered ? "block" : "none" }; 
    background: ${ props => props.textEntered ? "rgba(255,239,213,0.6)" : "none" }; 
    height: 8%;
    width: 8%;
    margin-top: 0px;
    margin-left: auto;
    margin-right: auto;
    text-align: center;
    padding-left: 2%;
    padding-right: 2%;
    overflow: scroll;
    max-height: 26vh;
`

class LandingPage extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            searchPlaceHolder: false, 
            searchText: '',
            stations: []
        }
        this.handleSearchChange = this.handleSearchChange.bind(this);
    }

    componentDidMount() {
        this.getStations();
    }

    scrollToAboutSection(){
        scroll.scrollTo('1000');
    }

    getStations() {
        axios.get('/api/snotel/stations')
            .then(response => {
                let tempStations = response.data;
                this.setState({
                    stations: tempStations
                })
            })
            .catch(error => console.log(error))
    }

    handleSearchChange(ev){
        this.setState({ 
            searchPlaceHolder: true,
            searchText: ev.target.value 
        },
        console.log("this.state.searchPlaceHolder", this.state.searchPlaceHolder),
        console.log("this.state.searchText", this.state.searchText)
        ); 
    }

    render(){
        const imgStyle = {
            'width': '100%',
            'height': '100%',
        }

        const paragraphStyle = {
            'font-size': '18px',
            // 'margin-top': '0px',
            'margin-bottom': '30px'
        }

        const aboutButtonStyle = {
            'margin-top': '-18px'
        }

        const aboutHeaderStyle = {
            'font-size': '1.3rem',
            'font-weight': '600',
            'margin-bottom': '0px'
        }

        const stationsList = this.state.stations
        .filter(station => station.name.includes(this.state.searchText.toUpperCase()))
        .map((station, index) => <li key={index}>{station.name}</li>);

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
                    <div>
                        <Input onChange={this.handleSearchChange} onSelect={this.handleSearchChange} value={this.state.textEntered} type="text"
                        textEntered={this.state.searchPlaceHolder} placeholder="&#128269;" className='input::placeholder'
                        />
                        <Ul textEntered={this.state.searchPlaceHolder}>{stationsList}</Ul>
                    </div>
                </ButtonWrapper>
            </LandingHeaderContainer>
            <AboutContentContainer name='aboutSection'>
                <h3 style={aboutHeaderStyle}>SNOTEL and Mountain Snowpack</h3>
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