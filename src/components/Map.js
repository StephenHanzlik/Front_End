import React, { Component } from 'react';
import mapboxgl from 'mapbox-gl';
import axios from 'axios';

mapboxgl.accessToken = 'pk.eyJ1Ijoic3RlcGhlbmhhbnpsaWsiLCJhIjoiY2thMGNkNnhiMDF5aDNubWtmbDNybmpjaCJ9.DHmoxylArLlQyZ1elyfyCA';

class Map extends Component {

    constructor(props) {
        super(props);
        this.state = {
            lng: 5,
            lat: 34,
            zoom: 2
        };
    }

    convertToGeoJson(stations) {
        let geoJsonFeatureCollection = {
            type: 'FeatureCollection',
            features: []
        };

        let features = [];
        stations.forEach(station => {
            let coordinates = [];
            let location = JSON.parse(station.location);
            coordinates.push(location.lng);
            coordinates.push(location.lat);

            let geoJsonItem = {
                type: 'geojson',
                data: {
                    type: 'Feature',
                    geometry: {
                        type: 'Point',
                        coordinates: coordinates
                    },
                    properties: {
                        title: station.name,
                        'marker-symbol': 'monument'
                    }
                }
            }
            features.push(geoJsonItem);
        })
        geoJsonFeatureCollection.features = features;
        return geoJsonFeatureCollection;
    };

    componentDidMount() {

        const map = new mapboxgl.Map({
            container: this.mapContainer,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [this.state.lng, this.state.lat],
            zoom: this.state.zoom
        });


        axios.get('http://localhost:8081/EnosJava/api/snotel/stations')
            .then(response => {
                let tempGeoJson = this.convertToGeoJson(response.data);
                this.setState({
                    stationGeoJson: tempGeoJson,
                    renderStations: true
                })
            })
            .catch(error => console.log(error))
    }

    render() {

        return (

            <div>
                <div ref={el => this.mapContainer = el} className="mapContainer" />
            </div> 
      
        )
    }
}

export default Map;