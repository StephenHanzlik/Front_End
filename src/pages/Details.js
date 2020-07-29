import React, { Component } from 'react';
import NavBar from '../components/NavBar';
import Map from '../components/Map';
import ArrowButton from '../components/ArrowButton';
import Button from '../components/Button';
import Graph from '../components/Graph';
import GeoJsonFeatureCollection from '../classes/geoJsonFeatureCollection'; 
import GeoJsonFeature from '../classes/geoJsonFeature'; 
import styled from 'styled-components';
import axios from 'axios';

import store from '../store';
import {connect}  from 'react-redux';


const MapWrapper = styled.div`
    background: red;
`;

const DataWrapper = styled.div`
    background: green;
`;

const Row = styled.div`
    display: flex;
    justify-content: center;
`;

class Details extends Component{

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
            mountGraph: false
        };
    }

    componentDidMount(){
        //currently setting station observations to state but not triplet
        //TODO: Should also configure zoom and center as props to map
        // let stationTriplet = this.getStationTriplet();
        // this.getStation(stationTriplet);
        console.log("XX - Detials - store.getState()", store.getState());

        this.getObservations("1151:UT:SNTL");
    }

    //TODO:  Impliment redux to reduce API calls
    // getStationTriplet(){
    //     let url = window.location.href;
    //     return url.slice(url.indexOf("details/") + 8);
    // }

    // getStation(triplet){
    //     axios.get(`/api/snotel/stations/${triplet}`)
    //     .then(response => {
    //          let observation = response.data[0];
    //          let stationGeoJson = this.convertToGeoJson(response.data);
    //          store.dispatch({
    //             type: 'SET_GEOJSON',
    //             payload: stationGeoJson
    //         })
            //  this.setState({
            //     stationTriplet: observation.triplet,
            //     stationName: observation.name,
            //     stationElevation: observation.elevation,
            //     lat: JSON.parse(observation.location).lat,
            //     lng: JSON.parse(observation.location).lng,
            //     geoJson: stationGeoJson
            //  })
    //     })
    //      .catch(error => console.log(error))
    // }

    getObservations(triplet){
        axios.get(`/api/snotel/observations/${triplet}?from=2020-6-01&to=${new Date().toJSON().slice(0,10)}`)
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
            console.log("geoJsonFeature - details: ", geoJsonFeature);
            geoJsonFeatureCollection.data.features.push(geoJsonFeature);
        })

        return geoJsonFeatureCollection;
    };

    previousObservation(){
        const currentIndex = this.state.currentObservationIndex;
        if(currentIndex > 0){
            let newIndex = currentIndex - 1;
            this.setState({
                currentObservationIndex: newIndex
            })
        }else{
            //TODO:  Nicer notifactions.
            alert("You are on the last item.  Use Graph for more historical data.");
        }
    }

    nextObservation(){
        const currentIndex = this.state.currentObservationIndex;
        if(currentIndex < this.state.observations.length - 1){
            let newIndex = currentIndex + 1;
            this.setState({
                currentObservationIndex: newIndex
            })
        }else{
            //TODO:  Nicer notifactions. 
            alert("You are on the current day.");
        }
    }

    toggleGraph(){
        let mountGraph = this.state.mountGraph;
        this.setState({
            mountGraph: !mountGraph
        })
    }

    render(){
        let currentObservation;
        let observations = this.state.observations;
    
        if(observations){
            currentObservation = observations[this.state.currentObservationIndex];
        }
        let features;
        if(this.props.geoJson){
             features = this.props.geoJson.data.features;
        }else{
            features = []
        }

        console.log("Details - props: ", this.props)
        console.log("Details - features: ", features);
        return(
            <div>
                {features.length > 0 && this.state.observations &&
                <div>
                    <NavBar/>
                    <Row>
                        <MapWrapper>
                        <Map
                                geoJson={this.state.geoJson}
                                lng={this.state.geoJson.data.features[0].geometry.coordinates[0]}
                                lat={this.state.geoJson.data.features[0].geometry.coordinates[1]}
                                zoom={9}
                                mapHeight={67}
                                mapWidth={45}
                            />
                        </MapWrapper>
                        <DataWrapper>
                            {/* TODO: This could probably be its own component */}
                            <div>
                                <h5>{this.state.stationName}</h5>
                                <h5>{this.state.stationElevation}ft</h5>
                                <div>{this.state.lng}, {this.state.lat}</div>
                                <div>{this.state.stationTriplet }</div>
                                <Row>
                                    <div onClick={()=>this.previousObservation("test value 1")}>
                                        <ArrowButton leftArrow={true}/>
                                    </div>
                                    <h5 >{currentObservation.date}</h5>
                                    <div onClick={()=>this.nextObservation("test value 2")}>
                                        <ArrowButton rightArrow={true}/>
                                    </div>
                                    
                                </Row>
                                <div>Snow Depth: {currentObservation.snowDepth}" | Δ: {currentObservation.changeInSnowDepth}"</div>
                                <div>Snow Water Equivalent: {currentObservation.snowWaterEquivalent}" | Δ: {currentObservation.changeInSnowWaterEquivalent}"</div>  
                                { currentObservation.airTemperatureObserved &&
                                    <div>Air Temp: {currentObservation.airTemperatureObserved}°F</div>
                                }
                                { currentObservation.airTemperatureAverage &&
                                    <div>Air Temp Average: {currentObservation.airTemperatureAverage}°F</div>
                                }
                                { currentObservation.airTemperatureMin && currentObservation.airTemperatureMax &&
                                    <div>Air Temp Min: {currentObservation.airTemperatureMin}°F | Air Temp Max: {currentObservation.airTemperatureMax}°F</div>
                                }
                                <div onClick={()=>this.toggleGraph()}   >
                                    <Button/>
                                </div>
                            </div>
                        </DataWrapper>
                    </Row>
                    {this.state.mountGraph &&
                        <Graph
                            observations={this.state.observations}
                         />
                    }

                </div>
            }</div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    console.log("Details - State in mapStateToProps", state)
    console.log("Details - ownProps in mapStateToProps", ownProps)
    return {
        geoJson: state
    }
}
export default connect(mapStateToProps)(Details);
// export default Details;  
