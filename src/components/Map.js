import React, { Component } from 'react';
import mapboxgl from 'mapbox-gl';
import axios from 'axios';


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
            stationTriplet: '',
            zoom: 4
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
                    'elevation': station.elevation,
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
                this.loadMap(stationGeoJson);
            })
            .catch(error => console.log(error))
    }


    loadMap(geoJson) {
        const map = new mapboxgl.Map({
            container: this.mapContainer,
            style: 'mapbox://styles/stephenhanzlik/ck45yi8kp2hrp1drw58brvdro',
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

        let markers = [];

        map.on("click", function(e) {
            console.log("Click Event!")

            markers.forEach((marker)=>{
                console.log("e.originalEvent.target", e.originalEvent.target)
                console.log('marker.getElement()', marker.getElement())
                if (e.originalEvent.target === marker.getElement()) {
                    console.log("we hit the marker!", marker)
                  }
            });


        })

        map.on('load', function () {
            geoJson.data.features.forEach( (marker)=> {
                //**************************************************
                // Work arounds for click events on Marker
                //https://github.com/mapbox/mapbox-gl-js/issues/7793
                //**************************************************

                // Option 1 from Mapbox docs
                // var el = document.createElement('div');
                // el.className = 'marker';

                //Option 2 from above link
                var el = document.createElement('div');
                //
                //https://placekitten.com/g/40/40/
                el.style.backgroundImage = 'url(https://i.ibb.co/WvGxZpY/snowflake-1.jpg)';
                el.style.width = '40px';
                el.style.height = '40px';
                el.style.cursor = 'pointer';
                el.style.backgroundColor = '#26a69a'
                el.style.borderRadius = '50%'
                el.addEventListener('click', function () {
                    // alert('element event listener');
                })


                let aMarker = new mapboxgl.Marker(el)
                .setLngLat(marker.geometry.coordinates)
                .setPopup(new mapboxgl.Popup({ offset: 25 })
                .setHTML('<h5>' + marker.properties.title + '</h5><h5>' + marker.properties.elevation + 'ft</h5>' + '<button>Details</button>'))
                .addTo(map)

                markers.push(aMarker);

                //argument - el
                // var bMarker = new mapboxgl.Marker(el)
                //     .setLngLat(marker.geometry.coordinates)
                //     .setPopup(new mapboxgl.Popup({ offset: 25 })
                //     .setHTML('<h5>' + marker.properties.title + '</h5><h5>' + marker.properties.elevation + 'ft</h5>' + '<button>Details</button'))
                //     .addTo(map)


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