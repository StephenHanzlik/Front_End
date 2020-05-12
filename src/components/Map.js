import React, { Component } from 'react';
import mapboxgl from 'mapbox-gl';
import axios from 'axios';
import MapBox from './MapBox';


// https://docs.mapbox.com/help/tutorials/use-mapbox-gl-js-with-react/
// https://docs.mapbox.com/mapbox-gl-js/example/add-a-marker/
// https://docs.mapbox.com/help/tutorials/custom-markers-gl-js/

//TODO:  This should be ENV variable
mapboxgl.accessToken = 'pk.eyJ1Ijoic3RlcGhlbmhhbnpsaWsiLCJhIjoiY2thMGNkNnhiMDF5aDNubWtmbDNybmpjaCJ9.DHmoxylArLlQyZ1elyfyCA';

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
    }

    convertToGeoJson(stations) {
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
            // features.push(coordinates)
        })
        geoJsonFeatureCollection.data.features = features;
        return geoJsonFeatureCollection;
        // return features;
        // 
    };

    componentDidMount() {
        //TODO: load this elsewhere and pass as props when rendering map component
        axios.get('http://localhost:8081/EnosJava/api/snotel/stations')
            .then(response => {
                let stationGeoJson = this.convertToGeoJson(response.data);
                this.setState({
                    geoJson: stationGeoJson
                })

                //This will be handled when MapBox component mounts
                // this.loadMap(stationGeoJson);
                
            })
            .catch(error => console.log(error))
    }

    render() {

        return (

            <div>
                {/* <div>
                    <div>Triplet: {this.state.stationTriplet } | Name: {this.state.stationName} | Elevation: {this.state.stationElevation}</div>
                    <div>Location: {this.state.lng},{this.state.lat} | Timezone: {this.state.stationTimezone} | Wind: {this.state.stationWind}</div>
                </div> */}
                <MapBox geoJson={this.state.geoJson}></MapBox>
            </div>
            

        )
    }
}

export default Map;