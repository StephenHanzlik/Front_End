import React, { Component } from 'react';
import axios from 'axios';
import MapBox from './MapBox';

class Map extends Component {

    constructor(props) {
        super(props);
        this.state = {
            lng: -105.270546,
            lat: 40.014984,
            zoom: 4,
            stationElevation: '',
            stationTriplet: '',
            stationName: '',
            stationTimeZone: 0,
            stationWind: false,
            geoJson: ''
        };
        this.getObservations = this.getObservations.bind(this);
    }

    async componentDidMount() {
        try{
            axios.get('/api/snotel/stations')
            .then(response => {
                let stationGeoJson = this.convertToGeoJson(response.data);
                console.log("stationGeoJson", stationGeoJson)
                this.setState({
                    geoJson: stationGeoJson
                }, function(){
                    console.log("state changed:", this.state)
                })
            })
            .catch(error => console.log(error))
        }
        catch(error){
            console.log("there was an error: ", error);
        } 
       
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
                    geoJson={this.state.geoJson}
                    getObservations={this.getObservations}
                ></MapBox>
            </div>
        )
    }
}

export default Map;