import React, { Component } from 'react';
import '../App.css';
import colorado from '../images/colorado.png';
import california from '../images/california.png';
import utah from '../images/utah.png';
import washington from '../images/washington.png';
import oregon from '../images/oregon.png';
import montana from '../images/montana.png';
import newMexico from '../images/newMexico.png';
import wyoming from '../images/wyoming.png';
import alaska from '../images/alaska.png';
import idaho from '../images/idaho.png';
import arizona from '../images/arizona.png';
import nevada from '../images/nevada.png';
import southDakota from '../images/southDakota.png';
import LandingHeader from '../components/LandingHeader';
import styled from 'styled-components';
import axios from 'axios';
import NavBar from '../components/NavBar';
import Footer from './Footer';

const LandingHeaderContainer = styled.div`
    margin-top: -60vh
    height: 65vh;
`;

const ButtonWrapper = styled.div`
    // height: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

const CardHeaderRow = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
`;

const Input = styled.input`
    padding: 0.5em;
    margin: 0.5em;
    height: 13px;
    width: ${props => props.deviceType === 'isBigScreen' || props.deviceType === 'isDesktopOrLaptop' ? '30%': '60%'};
    // background: ${props => props.textEntered ? "rgba(255,239,213,0.6)" : "none" }; 
    background: #f3f2ef; //linkedIn grey
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
    // background: ${ props => props.textEntered ? "rgba(255,239,213,0.6)" : "none" }; 
    background: #f3f2ef;
    height: 27%;
    width: 27%;
    margin-top: 0px;
    margin-left: auto;
    margin-right: auto;
    text-align: center;
    padding-left: 2%;
    padding-right: 2%;
    overflow-y: auto;
    overflow-x: hidden;
    max-height: 26vh;
    cursor: pointer;
    border-radius: 3px;
`

const CardContainer = styled.div`
    width: 100%;
    margin-bottom: 35px;
`;

const FlexWrapRow = styled.div`
    flex-wrap: wrap;
    display: flex;
    justify-content: center;
    width: 100%;
`;

class LandingBody extends Component {

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

    getStations() {
        axios.get('/api/snotel/stations')
            .then(response => {
                let tempStations = response.data;
                console.log("Landing Page - GET Stations Response", tempStations);
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
        }); 
    }

    highLightItem(e) {
        e.stopPropagation();
        e.target.style['margin-top'] = '-2px';
    }

    unHighLightItem(e) {
        e.stopPropagation();
        e.target.style['margin-top'] = '10px';
    }

    generateStateCards() {
        const states = [
            { "Colorado": colorado },
            { "California": california },
            { "Utah": utah },
            { "Washington": washington },
            { "Oregon": oregon },
            { "Montana": montana },
            { "New Mexico": newMexico },
            { "Wyoming": wyoming },
            { "Alaska": alaska },
            { "Idaho": idaho },
            { "Arizona": arizona },
            { "Nevada": nevada },
            { "South Dakota": southDakota} 
        ];
        return states;
    }

    render(){
        const deviceType = this.props.deviceType;

        const stationsList = this.state.stations
        .filter(station => station.name.includes(this.state.searchText.toUpperCase()))
        .map((station, index) => <li key={index} id={station.triplet}>{station.name}</li>);

        const stateCards = this.generateStateCards().map((state, index) => {
                const stateKey = Object.keys(state);
                let stateAbbrev;
                switch (stateKey[0]) {
                    case "Colorado":
                        stateAbbrev = "co";
                        break;
                    case "California":
                        stateAbbrev = "ca";
                        break;
                    case "Utah":
                        stateAbbrev = "ut";
                        break;
                    case "Washington":
                        stateAbbrev = "wa";
                        break;
                    case "Oregon":
                        stateAbbrev = "or";
                        break;
                    case "Montana":
                        stateAbbrev = "mt";
                        break;
                    case "New Mexico":
                        stateAbbrev = 'nm';
                        break;
                    case "Wyoming":
                        stateAbbrev = "wy";
                        break;
                    case "Alaska":
                        stateAbbrev = "ak";
                        break;
                    case "Idaho":
                        stateAbbrev = "id";
                        break;
                    case "Arizona":
                        stateAbbrev = "az";
                        break;
                    case "Nevada":
                        stateAbbrev = "nv";
                        break;
                    case "South Dakota":
                        stateAbbrev = "sd";
                        break;
                    default:
                        break;
                }
                const backGroundImgStyle = {
                    'background-image': `url(${state[stateKey]})`,
                    'background-size': '100%',
                    'background-repeat': 'no-repeat',
                    'background-position': 'center center',
                    'box-shadow': '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
                    'width': '250px',
                    'height': '166px',
                    'margin': '10px',
                    'border-radius': '5px', 
                    'overflow': 'hidden',
                    'opacity': '0.7',
                    'display': 'flex',
                    'justify-content': 'center',
                    'cursor': 'pointer'
                };
                const stateTextStyle = {
                    'background': 'white',
                    'border-radius': '2px',
                    'height': 'min-content',
                    'width': 'min-content',
                    'font-size': '1.4rem',
                    'font-weight': '500',
                    'padding': '0px 4px',
                    'white-space': 'nowrap',
                    'overflow': 'hidden'
                }
                return(
                <div style={backGroundImgStyle} onMouseEnter={this.highLightItem} onMouseLeave={this.unHighLightItem} onClick={(ev)=> window.location.href = `/states/${stateAbbrev}`}>
                    <p style={stateTextStyle}>{stateKey}</p>
                </div>)
        })

        return(
        <div>
            <NavBar map={true} about={true} isLanding={true}/>
            <div className={`background-${deviceType}`}/>
            <LandingHeaderContainer>
              <LandingHeader deviceType={deviceType}/>
                <ButtonWrapper>
                    {/* <Button text="Explore Stations →" link="/console" /> */}
                    <div>
                        <Input 
                            onChange={this.handleSearchChange} 
                            // onSelect={this.handleSearchChange} 
                            value={this.state.textEntered} 
                            type="text"
                            deviceType={deviceType}
                            // textEntered={this.state.searchPlaceHolder} 
                            placeholder="Enter a state or SNOTEL station  &#128269;  "
                            id={"searchInput"}
                            className='input::placeholder'
                        />
                        <Ul 
                            textEntered={this.state.searchPlaceHolder} 
                            onClick={(ev)=> window.location.href = `/stations/${ev.target.id}`}
                        >
                            {stationsList}
                        </Ul>
                    </div>
                </ButtonWrapper>
            </LandingHeaderContainer>
            <CardHeaderRow>
                <p className={`cardHeader-${deviceType}`}>Select a State to see the available Stations</p>
            </CardHeaderRow>
            <CardContainer>
                <FlexWrapRow>
                    {stateCards}
                </FlexWrapRow>
            </CardContainer>
            <Footer/>
        </div> 
        )
    }
}

export default LandingBody;