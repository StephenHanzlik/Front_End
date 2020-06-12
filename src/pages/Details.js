import React, { Component } from 'react';
import NavBar from '../components/NavBar';
import Map from '../components/Map'
import styled from 'styled-components';
import axios from 'axios';

const MapWrapper = styled.div`
    width: 50%;
    background: red;
`;

const DataWrapper = styled.div`
    width: 50%;
    background: green;
`;


class Details extends Component{

    constructor(props) {
        super(props);
        this.state = {
            stationTriplet: '',
            geoJson: ''
        };
    }

    componentDidMount(){
        //currently setting station observations to state but not triplet
        //TODO: Should also configure zoom and center as props to map
        this.getStationObservations(this.getStationTriplet());
    }

    //TODO:  Impliment redux to reduce API calls
    getStationTriplet(){
        let url = window.location.href;
        return url.slice(url.indexOf("details/") + 8);
    }

    getStationObservations(triplet){
        axios.get(`/api/snotel/stations/${triplet}`)
        .then(response => {
             let stationGeoJson = this.convertToGeoJson(response.data);
             this.setState({
                 geoJson: stationGeoJson
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
        console.log("Details Render - this.state.geoJson: ", this.state.geoJson)
        return(
            <div>
                <NavBar/>
                <MapWrapper>
                { this.state && this.state.geoJson &&
                    <Map
                        geoJson={this.state.geoJson}
                        lng={this.state.geoJson.data.features[0].geometry.coordinates[0]}
                        lat={this.state.geoJson.data.features[0].geometry.coordinates[1]}
                        zoom={9}
                    />
                }
                </MapWrapper>
                <DataWrapper>
                </DataWrapper>
            </div>

        )
    }
}

export default Details;