import React, { Component } from 'react';
import NavBar from '../components/NavBar';
import Graph from '../components/Graph';
import Map from '../components/Map';
import SelectRelative from '../components/SelectRelative';
import snowFlake from '../images/snowflake.jpg';
import GeoJsonFeatureCollection from '../classes/GeoJsonFeatureCollection';
import GeoJsonFeature from '../classes/GeoJsonFeature';
import styled from 'styled-components';
import axios from 'axios';


const MapWrapper = styled.div`
    display: flex;
    justify-content: center;
    padding-top: 20px;
`;

const GraphWrapper = styled.div`
    display: flex;
    justify-content: center;
`;

class Console extends Component {

    constructor(props) {
        super(props);
        this.state = {
            observations: [],
            stationTriplet: '',
            geoJson: '',
            callMade: false,
            callReturned: false,
            latanceyTimeout: false,
            relativeTime: 5184000000
        };
        this.getObservations = this.getObservations.bind(this);
        this.getStations = this.getStations.bind(this);
        this.handleRelativeTimeChange = this.handleRelativeTimeChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this.getStations();
    }

    getStations() {
        axios.get('/api/snotel/stations')
            .then(response => {
                let stationGeoJson = this.convertToGeoJson(response.data);
                this.setState({
                    geoJson: stationGeoJson
                })
            })
            .catch(error => console.log(error))
    }

    getObservations(triplet) {
        //NRCS UI Report Gen
        //https://www.nrcs.usda.gov/wps/portal/wcc/home/quicklinks/imap#version=115&elements=D&networks=!&states=!&counties=!&hucs=&minElevation=&maxElevation=&elementSelectType=all&activeOnly=true&activeForecastPointsOnly=false&hucLabels=false&hucIdLabels=false&hucParameterLabels=false&stationLabels=&overlays=&hucOverlays=&basinOpacity=100&basinNoDataOpacity=100&basemapOpacity=100&maskOpacity=0&mode=stations&openSections=dataElement,parameter,date,basin,elements,location,networks&controlsOpen=true&popup=05K29:CO:SNOW&popupMulti=&base=esriNgwm&displayType=inventory&basinType=6&dataElement=SRVO&depth=-8&parameter=PCTAVG&frequency=MONTHLY&duration=custom&customDuration=1&dayPart=E&year=2020&month=4&day=19&monthPart=E&forecastPubMonth=5&forecastPubDay=1&forecastExceedance=50&seqColor=1&divColor=3&scaleType=D&scaleMin=&scaleMax=&referencePeriodType=POR&referenceBegin=1981&referenceEnd=2010&minimumYears=20&hucAssociations=true&lat=39.8167&lon=-105.6999&zoom=12.5
        let currentDate = Date.now();
        let startDate = currentDate - this.state.relativeTime;

        currentDate = new Date(currentDate).toJSON().slice(0, 10)
        startDate = new Date(startDate).toJSON().slice(0, 10)

        // TODO:  This is nasty and has the potential to be bug prone.  We should use call backs in each setState if possible to ensure things get 
        // updated in proper order
        this.setState({
            callMade: true,
            callReturned: false,
            latanceyTimeout: false
        });

        setTimeout(()=>{ 
            this.setState({
                latanceyTimeout: true
            });
        }, 20000); 

        axios.get(`/api/snotel/observations/${triplet}?from=${startDate}&to=${currentDate}`)
            .then(response => {
                this.setState({
                    //This is called in from props and set to state after the call.  Should change this
                    stationTriplet: triplet,
                    observations: response.data,
                    callReturned: true,
                    callMade: false,
                    latanceyTimeout: false
                })
            })
            .catch(error => console.log(error))
    }

    convertToGeoJson(stations) {

        let geoJsonFeatureCollection = new GeoJsonFeatureCollection();

        stations.forEach(station => {
            let location = JSON.parse(station.location);
            let geoJsonFeature = new GeoJsonFeature(location.lng, location.lat, station.name, station.elevation, station.triplet, station.timezone, station.wind);
            geoJsonFeatureCollection.data.features.push(geoJsonFeature);
        })

        return geoJsonFeatureCollection;
    };

    handleRelativeTimeChange(event) { 
        this.setState({
            relativeTime: event.target.value
        })
    }
    
    handleSubmit(event) {
        event.preventDefault();
        this.getObservations(this.state.stationTriplet);
    }

    render() {
        const paragraphCenteredStyle = {
            'width': '45%',
            'margin-top': '30px',
            'font-size': '20px'
        }
        const snowFlakeStyle = {
            'width': '45px',
            'height': '40px',
            'border-radius': '20px',
            'margin-bottom': '-10px'
        }

        const paragraphStyle = {
            'font-size': '20px'
        }

        const timeSelectStyle = {
            'display': 'initial',
            'max-width': '95px',
            'margin-top': '-10px'
        }

        return (
            <div>
                <NavBar/>
                <MapWrapper>
                    {this.state && this.state.geoJson &&
                        <Map
                            getObservations={this.getObservations}
                            geoJson={this.state.geoJson}
                            lng={-105.270546}
                            lat={40.014984}
                            zoom={4}
                            mapHeight={58}
                            mapWidth={87}
                        />
                    }
                </MapWrapper>
                <GraphWrapper>
                    {/* TODO: better logic here.  Perhaps checking state with specific flags for what to show
                    or having the logic in other components. */}
                    {this.state.observations.length >= 1 && this.state.callReturned &&
                    <div>
                        <Graph
                            graphType={'snowDepth'}
                            observations={this.state.observations}
                        />
                        {/* <SelectRelative
                            // handleRelativeTimeChange={this.handleRelativeTimeChange}
                            handleSubmit={this.handleSubmit}
                        /> */}
                        {/* This should probably be part of the graph component or its own componentif used on details page as well */}
                        <form onSubmit={this.handleSubmit}>
                            <select style={timeSelectStyle} name={'selectRelativeTimeInterval'} value={this.state.relativeTime} onChange={this.handleRelativeTimeChange}>
                                <option value="604800000">7 days</option>
                                <option value="2592000000">30 days</option>
                                <option value="5184000000">60 days</option>
                                <option value="7776000000">90 days</option>
                                <option value="31536000000">365 days</option>
                            </select>
                            <input type="submit" value="Submit" />
                        </form>
                    </div>
                    }
                    {this.state.observations.length < 1 && this.state.stationTriplet === '' && !this.state.callMade && 
                        <p style={paragraphCenteredStyle}>Select a station icon <img src={snowFlake} style={snowFlakeStyle} alt='snowFlake'/> to see an overview of the stations 
                        snow pack depth.  Click "Details" to see all available data for the station and access more graphing.</p>
                    }
                    <div>
                    {this.state.callMade && !this.state.callReturned &&
                        <div>
                            <p style={paragraphStyle}>Fetching snow pack data...</p>
                            <div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
                        </div>
                    }
                    {this.state.callMade && !this.state.callReturned && this.state.latanceyTimeout &&
                        <div>
                            <p style={paragraphStyle}>We are experiencing high latency from the NRCS. This happens sometimes.  We will keep waiting if you will.</p>
                            <p style={paragraphStyle}>If this continues please consider checking back in later.</p>
                        </div>  
                    }
                    </div>
                </GraphWrapper>

            </div>
        )
    }
}

export default Console;