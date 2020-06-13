import React, { Component } from 'react';
import NavBar from '../components/NavBar';
import Map from '../components/Map';
import ArrowButton from '../components/ArrowButton';
import styled from 'styled-components';
import axios from 'axios';

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
            observations: ''
        };
    }

    componentDidMount(){
        //currently setting station observations to state but not triplet
        //TODO: Should also configure zoom and center as props to map
        let stationTriplet = this.getStationTriplet();
        this.getStation(stationTriplet);
        this.getObservations(stationTriplet);
    }

    //TODO:  Impliment redux to reduce API calls
    getStationTriplet(){
        let url = window.location.href;
        return url.slice(url.indexOf("details/") + 8);
    }

    getStation(triplet){
        axios.get(`/api/snotel/stations/${triplet}`)
        .then(response => {
             let observation = response.data[0];
             let stationGeoJson = this.convertToGeoJson(response.data);
             this.setState({
                stationTriplet: observation.triplet,
                stationName: observation.name,
                stationElevation: observation.elevation,
                lat: JSON.parse(observation.location).lat,
                lng: JSON.parse(observation.location).lng,
                geoJson: stationGeoJson
             })
        })
         .catch(error => console.log(error))
    }

    getObservations(triplet){
        //TODO: There is probably another endpoint for individual day reports however
        //Current conditions should grab most recent complete data.   May have to grab 5 days worth and concat to values.
        //Could also dynamically display fields if data is present.  For example, airTemp Max and Min are not always present
        axios.get(`/api/snotel/observations/${triplet}?from=2020-6-01&to=${new Date().toJSON().slice(0,10)}`)
        .then(response => {
            console.log("Observation Details Resp", response)            
            this.setState({
                stationTriplet: triplet,
                observations: response.data
            })
        })
        .catch(error => console.log(error))
    }

    //TODO: used in both Console and Details - Refactor
    convertToGeoJson(stations) {
        //TODO: Could abstract this away as a class
        let geoJsonFeatureCollection = {
            "type": "geojson",
            "data": {
                type: 'FeatureCollection',
                features: []
            }
        };

        let features = [];
        stations.forEach(station => {
            let coordinates = [];
            let location = JSON.parse(station.location);
            coordinates.push(location.lng);
            coordinates.push(location.lat);

            //TODO: Could abstract this away as a class
            let geoJsonItem = {
                'type': 'Feature',
                'geometry': {
                    'type': 'Point',
                    'coordinates': coordinates
                },
                'properties': {
                    'title': station.name,
                    'elevation': station.elevation,
                    'triplet': station.triplet,
                    'timezone': station.timezone,
                    'wind': station.wind,
                    'icon': 'marker'
                }
            };
            features.push(geoJsonItem);
        })
        geoJsonFeatureCollection.data.features = features;
        return geoJsonFeatureCollection;
    };

    render(){
        console.log("Deatils Render - this.state.observations: ", this.state.observations);
        // console.log("Deatils Render - this.state.observations.pop(): ", this.state.observations.pop());
        let currentObservation;
    
        if(this.state.observations){
            currentObservation = this.state.observations.pop()
        }

        return(
            <div>
                <NavBar/>
                <Row>
                    <MapWrapper>
                    { this.state && this.state.geoJson &&
                      <Map
                            geoJson={this.state.geoJson}
                            lng={this.state.geoJson.data.features[0].geometry.coordinates[0]}
                            lat={this.state.geoJson.data.features[0].geometry.coordinates[1]}
                            zoom={9}
                            mapHeight={67}
                            mapWidth={45}
                        />
                    }
                    </MapWrapper>
                    <DataWrapper>
                    { this.state && this.state.observations &&
                        <div>
                            <h5>Station</h5>
                            <div>Name: {this.state.stationName} | Elevation: {this.state.stationElevation}ft</div>
                            <div>Location: {this.state.lng},{this.state.lat} | Triplet: {this.state.stationTriplet }</div>
                            <h4>Current Conditions</h4>
                            <ArrowButton leftArrow={true}/><h5>{currentObservation.date}</h5><ArrowButton rightArrow={true}/>
                            <div>Snow Depth: {currentObservation.snowDepth}" | Δ: {currentObservation.changeInSnowDepth}"</div>
                            <div>Snow Water Equivalent: {currentObservation.snowWaterEquivalent}" | Δ: {currentObservation.changeInSnowWaterEquivalent}"</div>  
                            <div>Air Temp: {currentObservation.airTemperatureObserved}°F</div>
                            { currentObservation.airTemperatureMin && currentObservation.airTemperatureMax &&
                                <div>Air Temp Min: {currentObservation.airTemperatureMin}°F | Air Temp Max: {currentObservation.airTemperatureMax}°F</div>
                            }
                    {/* Metoer burst technology can be impaired by storms.  Snow pack data is not always up to date and should be noted if outdated values are used */}
                        </div>
                    }
                    </DataWrapper>
                </Row>
            </div>
        )
    }
}

export default Details;