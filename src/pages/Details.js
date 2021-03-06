import React, { Component } from 'react';
import NavBar from '../components/NavBar';
import Map from '../components/Map';
import ArrowButton from '../components/ArrowButton';
import Button from '../components/Button';
import Graph from '../components/Graph';
import GeoJsonFeatureCollection from '../classes/GeoJsonFeatureCollection';
import GeoJsonFeature from '../classes/GeoJsonFeature';
import styled from 'styled-components';
import axios from 'axios';
import GraphableObservation from '../components/GraphableObservation';

const MapWrapper = styled.div`
    padding-right: 10px;
`;

const DataWrapper = styled.div`
    // padding-left: 10px;
    height: 10px;
    display: flex;
    flex-direction: column;
`;

const DisplayRow = styled.div`
    margin-top: 10px;
    display: flex;
    justify-content: center;
    // overflow: scroll;
`;

const Row = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
`;

const GraphRow = styled.div`
    margin-top: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
`

class Details extends Component {

    constructor(props) {
        super(props);
        this.state = {
            stationTriplet: '',
            stationName: '',
            stationElevation: '',
            lat: '',
            lng: '',
            geoJson: '',
            observations: '',
            currentObservationIndex: '',
            mountGraph: false,
            graphs: ['snowDepth', 'airTemperatureMax', 'airTemperatureMin'],
            startDate: "",
            endDate: "",
            relativeTime: 5184000000
        };
        this.toggleGraph = this.toggleGraph.bind(this);
        this.handleRelativeTimeSubmit = this.handleRelativeTimeSubmit.bind(this);
        this.handleRelativeTimeChange = this.handleRelativeTimeChange.bind(this);
        this.handleAbsoluteTimeSubmit = this.handleAbsoluteTimeSubmit.bind(this);
    }

    componentDidMount() {
        //currently setting station observations to state but not triplet
        //TODO: Should also configure zoom and center as props to map
        let stationTriplet = this.getStationTriplet();
        this.getStation(stationTriplet);
        this.getStations();
        this.getObservations(stationTriplet);
        this.getRelativeDate();
    }

    getRelativeDate() {
        let currentDate = Date.now();
        let startDate = currentDate - this.state.relativeTime;

        currentDate = new Date(currentDate).toJSON().slice(0, 10)
        startDate = new Date(startDate).toJSON().slice(0, 10)

        this.setState({
            startDate: startDate,
            endDate: currentDate
        })
    }

    //TODO:  Impliment redux to reduce API calls
    getStationTriplet() {
        let url = window.location.href;
        return url.slice(url.indexOf("details/") + 8);
    }

    getStation(triplet) {
        axios.get(`/api/snotel/stations/${triplet}`)
            .then(response => {
                let observation = response.data[0];
                //  let stationGeoJson = this.convertToGeoJson(response.data);
                this.setState({
                    stationTriplet: observation.triplet,
                    stationName: observation.name,
                    stationElevation: observation.elevation,
                    lat: JSON.parse(observation.location).lat,
                    lng: JSON.parse(observation.location).lng,
                    // geoJson: stationGeoJson
                })
            })
            .catch(error => console.log(error))
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

    getObservations(triplet, currentDate = Date.now()) {
        //console component is hard coded for 90 days of snow data.  This will be configurable.
        // if (!startDate) {
            // let currentDate = Date.now();
            let startDate = currentDate - this.state.relativeTime

            currentDate = new Date(currentDate).toJSON().slice(0, 10)
            startDate = new Date(startDate).toJSON().slice(0, 10)
        // }

        axios.get(`/api/snotel/observations/${triplet}?from=${startDate}&to=${new Date().toJSON().slice(0, 10)}`)
            .then(response => {
                this.setState({
                    observations: response.data,
                    currentObservationIndex: response.data.length - 1
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

    previousObservation() {
        const currentIndex = this.state.currentObservationIndex;
        if (currentIndex > 0) {
            let newIndex = currentIndex - 1;
            this.setState({
                currentObservationIndex: newIndex
            })
        } else {
            //TODO:  Nicer notifactions.  Prompt user to graph for more historical data.
            alert("You are on the last item.  Use Graph for more historical data.");
        }
    }

    nextObservation() {
        const currentIndex = this.state.currentObservationIndex;
        if (currentIndex < this.state.observations.length - 1) {
            let newIndex = currentIndex + 1;
            this.setState({
                currentObservationIndex: newIndex
            })
        } else {
            //TODO:  Nicer notifactions. 
            alert("You are on the current day.");
        }
    }

    toggleGraph(graphType) {
        let tempGraphs = this.state.graphs;
        let index = tempGraphs.indexOf(graphType);
        index > -1 ? tempGraphs.splice(index, 1) : tempGraphs.push(graphType)
        console.log("tempGraphs", tempGraphs);
        this.setState({
            graphs: tempGraphs
        })
    }

    handleRelativeTimeChange(event) { 
        this.setState({
            relativeTime: event.target.value
        })
    }
    
    handleRelativeTimeSubmit(event) {
        event.preventDefault();
        this.getObservations(this.state.stationTriplet);
    }

    handleAbsoluteTimeSubmit(event) {
        event.preventDefault();
        console.log("event.target.value", event.target.value);  
        this.getObservations(this.state.stationTriplet);
    }

    handleAbsoluteStartChange(event) {
        event.preventDefault(); 
        this.setState({
            startDate: event.target.value
        })
    }

    handleAbsoluteEndChange(event) {
        event.preventDefault();
        this.setState({
            endDate: event.target.value
        })
    }

    render() {

        const stationNameStyle = {
            'margin': '0 0 0 0',
            'font-size': '30px'
        }

        const stationElevationStyle = {
            'margin-bottom': '-14px',
            'margin-top': '-6px',
            'font-size': '25px'
        }

        const dateStyle = {
            'margin-top': '10px',
            'font-size': '20px'
        }

        const timeSelectStyle = {
            'display': 'initial',
            'max-width': '80px'
        }

        const searchFieldStyle = {
            'display': 'flex'
        }

        const graphTypes = ['snowDepth', 'changeInSnowDepth', 'snowWaterEquivalent', 'changeInSnowWaterEquivalent', 
            'airTemperatureObserved', 'airTemperatureAverage', 'airTemperatureMin', 'airTemperatureMax'];

        let currentObservation;
        let observations = this.state.observations;

        if (observations) {
            currentObservation = observations[this.state.currentObservationIndex];
        }

        return (
            <div>{
                this.state && this.state.geoJson && this.state.observations &&
                <div>
                    <NavBar link={"explore"}/>
                    <DisplayRow>
                        <MapWrapper>
                            <Map
                                getObservations={this.getObservations}
                                geoJson={this.state.geoJson}
                                lng={this.state.lng}
                                lat={this.state.lat}
                                zoom={12}
                                mapHeight={43}
                                mapWidth={30}
                            />
                        </MapWrapper>
                        <DataWrapper>
                                <p style={stationNameStyle}>{this.state.stationName}</p>
                                <p style={stationElevationStyle}>{this.state.stationElevation}ft</p>
                                <Row>
                                    <div onClick={() => this.previousObservation("test value 1")}>
                                        <ArrowButton leftArrow={true} />
                                    </div>
                                    <p style={dateStyle}>{currentObservation.date}</p>
                                    <div onClick={() => this.nextObservation("test value 2")}>
                                        <ArrowButton rightArrow={true} />
                                    </div>
                                </Row>
                                {graphTypes.map(graphType => (
                                    <GraphableObservation
                                        currentObservation={currentObservation}
                                        graphType={graphType}
                                        toggleGraph={this.toggleGraph}
                                        graphs={this.state.graphs}
                                    />
                                ))}
                        </DataWrapper>
                    </DisplayRow>
                    {/* <Row>
                        <form onSubmit={this.handleRelativeTimeSubmit}>
                            <select style={timeSelectStyle} name={'selectRelativeTimeInterval'} value={this.state.relativeTime} onChange={this.handleRelativeTimeChange}>
                                <option value="604800000">7 days</option>
                                <option value="2592000000">30 days</option>
                                <option value="5184000000">60 days</option>
                                <option value="7776000000">90 days</option>
                                <option value="31536000000">365 days</option>
                            </select>
                            <input type="submit" value="Submit" />
                        </form>
                        <form onSubmit={this.handleAbsoluteTimeSubmit} style={searchFieldStyle}>
                            <label>
                                Start Date: <input type="text" onChange={this.handleAbsoluteStartChange} value={this.state.startDate} name="startDate"/>
                            </label>
                            <label>
                                End Date: <input type="text" onChange={this.handleAbsoluteEndChange} value={this.state.endDate} name="endDate"/>
                            </label>
                            <input type="submit" value="Submit" />
                        </form>
                    </Row> */}
                    <GraphRow>
                        {
                            this.state.graphs.map(graph => (
                                    <Graph
                                        graphType={graph}
                                        observations={this.state.observations}
                                    />  
                                ))
                        }
                    </GraphRow>
                    
                </div>
            }</div>
        )
    }
}

export default Details;