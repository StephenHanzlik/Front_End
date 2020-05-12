import React, { Component } from 'react';
import mapboxgl from 'mapbox-gl';
import axios from 'axios';


// https://docs.mapbox.com/help/tutorials/use-mapbox-gl-js-with-react/
// https://docs.mapbox.com/mapbox-gl-js/example/add-a-marker/
// https://docs.mapbox.com/help/tutorials/custom-markers-gl-js/

//TODO:  This should be ENV variable
mapboxgl.accessToken = 'pk.eyJ1Ijoic3RlcGhlbmhhbnpsaWsiLCJhIjoiY2thMGNkNnhiMDF5aDNubWtmbDNybmpjaCJ9.DHmoxylArLlQyZ1elyfyCA';

class MapBox extends Component {

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
            stationWind: false
        };
    }


    componentDidMount() {
        //geojson was previously a param
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
        let tempStation;

        map.on('load', () => {  
            // console.log("this.props.geoJson.data.features", this.props.geoJson.data.features)

            this.props.geoJson.data.features.forEach((marker) => {
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
                el.addEventListener('click', (e) => {

                    console.log("marker", marker);
                    this.setState({
                        lng: marker.geometry.coordinates[0],
                        lat: marker.geometry.coordinates[1],
                        stationName: marker.properties.title,
                        stationTimeZone: marker.properties.timezone.toString(),
                        stationElevation: marker.properties.elevation,
                        stationTriplet: marker.properties.triplet,
                        stationWind: marker.properties.wind.toString()
                    })




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
        })
    }




    render() {

        return (

            <div>
                <div>
                    <div>Triplet: {this.state.stationTriplet } | Name: {this.state.stationName} | Elevation: {this.state.stationElevation}</div>
                    <div>Location: {this.state.lng},{this.state.lat} | Timezone: {this.state.stationTimezone} | Wind: {this.state.stationWind}</div>
                </div>
                <div ref={el => this.mapContainer = el} className='mapContainer' />
            </div>

        )
    }
}

export default MapBox;