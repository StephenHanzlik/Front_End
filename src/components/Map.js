import React, { Component } from 'react';
import mapboxgl from 'mapbox-gl';
import axios from 'axios';


// https://docs.mapbox.com/help/tutorials/use-mapbox-gl-js-with-react/
mapboxgl.accessToken = 'pk.eyJ1Ijoic3RlcGhlbmhhbnpsaWsiLCJhIjoiY2thMGNkNnhiMDF5aDNubWtmbDNybmpjaCJ9.DHmoxylArLlQyZ1elyfyCA';

class Map extends Component {

    constructor(props) {
        super(props);
        this.state = {
            lng: 5,
            lat: 34,
            zoom: 2
        };

        this.loadMap = this.loadMap.bind(this);
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
                    'icon': 'monument'
                }
            };

            features.push(geoJsonItem);
        })
        geoJsonFeatureCollection.data.features = features;
        return geoJsonFeatureCollection;
    };

    componentDidMount() {
        //TODO: load this elsewhere and pass as props when rendering map component
        axios.get('http://localhost:8081/EnosJava/api/snotel/stations')
            .then(response => {
                let stationGeoJson = this.convertToGeoJson(response.data);
                this.loadMap(stationGeoJson);
            })
            .catch(error => console.log(error))
    }


    loadMap(geoJson) {
        const map = new mapboxgl.Map({
            container: this.mapContainer,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [this.state.lng, this.state.lat],
            zoom: this.state.zoom
        });

        map.on('move', () => {
            this.setState({
                lng: map.getCenter().lng.toFixed(4),
                lat: map.getCenter().lat.toFixed(4),
                zoom: map.getZoom().toFixed(2)
            });
        });

        console.log("geoJson: ", geoJson)

        map.on('load', function () {
            console.log("geoJson: ", JSON.stringify(geoJson))
            map.addSource('points', geoJson);
            map.addLayer({
                'id': 'points',
                'type': 'symbol',
                'source': 'points',
                'layout': {
                    // get the icon name from the source's "icon" property
                    // concatenate the name to get an icon from the style's sprite sheet
                    'icon-image': ['concat', ['get', 'icon'], '-15'],
                    // get the title name from the source's "title" property
                    'text-field': ['get', 'title'],
                    'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
                    'text-offset': [0, 0.6],
                    'text-anchor': 'top'
                }
            });
        });
    }

    render() {

        return (

            <div>
                <div>
                    <div>Longitude: {this.state.lng} | Latitude: {this.state.lat} | Zoom: {this.state.zoom}</div>
                </div>
                <div ref={el => this.mapContainer = el} className='mapContainer' />
            </div>

        )
    }
}

export default Map;