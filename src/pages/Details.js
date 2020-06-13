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
            observations: '',
            currentObservationIndex: ''
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
                observations: response.data,
                currentObservationIndex: response.data.length - 1
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

    previousObservation(param){
        const currentIndex = this.state.currentObservationIndex;
        if(currentIndex > 0){
            let newIndex = currentIndex - 1;
            this.setState({
                currentObservationIndex: newIndex
            })
        }else{
            //TODO:  Toast notifactions.  Prompt user to graph for more historical data.
            console.log("You are on the last item");
        }
    }

    nextObservation(param){
        console.log('param is:', param)
    }

    render(){
        let currentObservation;
        let observations = this.state.observations;
    
        if(observations){
            currentObservation = observations[this.state.currentObservationIndex];
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
                            <h5>Observations</h5>
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