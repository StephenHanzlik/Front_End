import React, { Component } from 'react';
import axios from 'axios';
import MapBox from './MapBox';

class Map extends Component {

    constructor(props) {
        super(props);
        this.getObservations = this.getObservations.bind(this);
    }

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

    getObservations(triplet){
        //TODO: Should move this function in from console
        this.props.getObservations(triplet);
    }

    render() {
        // if(!this.state.geoJson.length){
        //     console.log("no geo json loaded")
        //     return null;
        // }
        return (

            <div>
                <MapBox 
                    geoJson={this.props.geoJson}
                    getObservations={this.getObservations}
                ></MapBox>
            </div>
        )
    }
}

export default Map;