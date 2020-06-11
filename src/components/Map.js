import React, { Component } from 'react';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;

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
            stationWind: false
        };
    }

    componentDidMount() {
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

        map.on('load', () => {  
                        
            this.props.geoJson.data.features.forEach((marker) => {

                let el = document.createElement('div');
                el.style.backgroundImage = 'url(https://i.ibb.co/WvGxZpY/snowflake-1.jpg)';
                el.style.width = '40px';
                el.style.height = '40px';
                el.style.cursor = 'pointer';
                //Materialize teal
                // el.style.backgroundColor = '#26a69a'
                el.style.borderRadius = '50%'
                el.addEventListener('click', (e) => {
                    this.setState({
                        lng: marker.geometry.coordinates[0],
                        lat: marker.geometry.coordinates[1],
                        stationName: marker.properties.title,
                        stationTimeZone: marker.properties.timezone.toString(),
                        stationElevation: marker.properties.elevation,
                        stationTriplet: marker.properties.triplet,
                        stationWind: marker.properties.wind.toString()
                    }, this.props.getObservations(marker.properties.triplet))
                })

                let aMarker = new mapboxgl.Marker(el)
                    .setLngLat(marker.geometry.coordinates)
                    .setPopup(new mapboxgl.Popup({ offset: 25 })
                        .setHTML(
                            `<h5>${marker.properties.title}</h5><h5>${marker.properties.elevation}ft</h5>
                        <button onClick="window.location.href = '/details/${marker.properties.triplet}';">Details</button>`
                    ))
                    .addTo(map) 

                markers.push(aMarker);
            });
        })
    }

    render() {
        return (
            <div>
                <div>
                    <div>Triplet: {this.state.stationTriplet } | Name: {this.state.stationName} | Elevation: {this.state.stationElevation}</div>
                    <div>Location: {this.state.lng},{this.state.lat} | Timezone: {this.state.stationTimeZone} | Wind: {this.state.stationWind}</div>
                </div>
                <div ref={el => this.mapContainer = el} className='mapContainer' />
            </div>
        )
    }
}

export default Map;