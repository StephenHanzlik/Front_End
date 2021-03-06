import React, { Component } from 'react';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;

class Map extends Component {

    constructor(props) {
        super(props);
        this.state = {
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
            center: [this.props.lng, this.props.lat],
            zoom: this.props.zoom
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
                //TODO: might need to attach a click event and use History.pushState() to mock what Link is doing
                //so that we can maintain state and/or use redux and reduce API calls
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
                <div ref={el => this.mapContainer = el} style={{height: `${this.props.mapHeight}vh`,width: `${this.props.mapWidth}vw`
                }} className='mapContainer' />
            </div>
        )
    }
}

export default Map;