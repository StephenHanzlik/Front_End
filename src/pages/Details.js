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
    flex-direction: row !important;
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
            graphs: ['snowDepth', 'airTemperatureMax', 'airTemperatureMin']
        };
        this.toggleGraph = this.toggleGraph.bind(this);
    }

    componentDidMount() {
        //currently setting station observations to state but not triplet
        //TODO: Should also configure zoom and center as props to map
        let stationTriplet = this.getStationTriplet();
        this.getStation(stationTriplet);
        this.getStations();
        this.getObservations(stationTriplet);
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

    getObservations(triplet, startDate) {
        //console component is hard coded for 90 days of snow data.  This will be configurable.
        if (!startDate) {
            let currentDate = Date.now();
            startDate = currentDate - 7776000000 //90 days

            currentDate = new Date(currentDate).toJSON().slice(0, 10)
            startDate = new Date(startDate).toJSON().slice(0, 10)
        }

        axios.get(`/api/snotel/observations/${triplet}?from=2020-6-01&to=${new Date().toJSON().slice(0, 10)}`)
            .then(response => {
                console.log("OBSERVATIONS: ", response.data)
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

        const paragraphStyle = {
            'margin': '0 0 0 0',
            'font-size': '23px'
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
                                {/*
                                TODO: These should be nested in another component and looped over
                                Refactor in progres...
                                */}
                                {graphTypes.map(graphType => (
                                    <GraphableObservation
                                        currentObservation={currentObservation}
                                        graphType={graphType}
                                        toggleGraph={this.toggleGraph}
                                        graphs={this.state.graphs}
                                    />
                                ))}
                                {/* <Row>
                                    <p style={paragraphStyle}>Snow Depth: {currentObservation.snowDepth}"</p>
                                    <div onClick={() => this.toggleGraph('snowDepth')}>
                                        {this.state.graphs.indexOf('snowDepth') > -1 &&
                                            <Button size={"small"} selected={true}/>
                                        }
                                        {this.state.graphs.indexOf('snowDepth') <= -1 &&
                                            <Button size={"small"} selected={false}/>
                                        }   
                                    </div>
                                </Row>
                                <Row>
                                    <p style={paragraphStyle}>Snow Depth Δ: {currentObservation.changeInSnowDepth}"</p>
                                    <div onClick={() => this.toggleGraph('changeInSnowDepth')}>
                                        {this.state.graphs.indexOf('changeInSnowDepth') > -1 &&
                                            <Button size={"small"} selected={true}/>
                                        }
                                        {this.state.graphs.indexOf('changeInSnowDepth') <= -1 &&
                                            <Button size={"small"} selected={false}/>
                                        }  
                                    </div>
                                </Row>
                                <Row>
                                    <p style={paragraphStyle}>Snow Water Equivalent: {currentObservation.snowWaterEquivalent}"</p>
                                    <div onClick={() => this.toggleGraph('snowWaterEquivalent')}>
                                        {this.state.graphs.indexOf('snowWaterEquivalent') > -1 &&
                                            <Button size={"small"} selected={true}/>
                                        }
                                        {this.state.graphs.indexOf('snowWaterEquivalent') <= -1 &&
                                            <Button size={"small"} selected={false}/>
                                        } 
                                    </div>
                                </Row>
                                <Row>
                                    <p style={paragraphStyle}>Snow Water Equivalent Δ: {currentObservation.changeInSnowWaterEquivalent}"</p>
                                    <div onClick={() => this.toggleGraph('changeInSnowWaterEquivalent')}>
                                        {this.state.graphs.indexOf('changeInSnowWaterEquivalent') > -1 &&
                                            <Button size={"small"} selected={true}/>
                                        }
                                        {this.state.graphs.indexOf('changeInSnowWaterEquivalent') <= -1 &&
                                            <Button size={"small"} selected={false}/>
                                        } 
                                    </div>
                                </Row>
                                <Row>
                                    <p style={paragraphStyle}>Air Temp Observed: {currentObservation.airTemperatureObserved}°F</p>
                                    <div onClick={() => this.toggleGraph('airTemperatureObserved')}>
                                        {this.state.graphs.indexOf('airTemperatureObserved') > -1 &&
                                            <Button size={"small"} selected={true}/>
                                        }
                                        {this.state.graphs.indexOf('airTemperatureObserved') <= -1 &&
                                            <Button size={"small"} selected={false}/>
                                        }   
                                    </div>
                                </Row>
                                <Row>
                                    <p style={paragraphStyle}>Air Temp Average: {currentObservation.airTemperatureAverage}°F</p>
                                    <div onClick={() => this.toggleGraph('airTemperatureAverage')}>
                                        {this.state.graphs.indexOf('airTemperatureAverage') > -1 &&
                                            <Button size={"small"} selected={true}/>
                                        }
                                        {this.state.graphs.indexOf('airTemperatureAverage') <= -1 &&
                                            <Button size={"small"} selected={false}/>
                                        }   
                                    </div>
                                </Row>
                                <Row>
                                    <p style={paragraphStyle}>Air Temp Min: {currentObservation.airTemperatureMin}°F</p>
                                    <div onClick={() => this.toggleGraph('airTemperatureMin')}>
                                        {this.state.graphs.indexOf('airTemperatureMin') > -1 &&
                                            <Button size={"small"} selected={true}/>
                                        }
                                        {this.state.graphs.indexOf('airTemperatureMin') <= -1 &&
                                            <Button size={"small"} selected={false}/>
                                        }
                                    </div>
                                </Row>
                                <Row>
                                    <p style={paragraphStyle}>Air Temp Max: {currentObservation.airTemperatureMax}°F</p>
                                    <div onClick={() => this.toggleGraph('airTemperatureMax')}>
                                        {this.state.graphs.indexOf('airTemperatureMax') > -1 &&
                                            <Button size={"small"} selected={true}/>
                                        }
                                        {this.state.graphs.indexOf('airTemperatureMax') <= -1 &&
                                            <Button size={"small"} selected={false}/>
                                        }
                                    </div>
                                </Row> */}
                        </DataWrapper>
                    </DisplayRow>
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