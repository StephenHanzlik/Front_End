import React, { Component } from 'react';
import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl';
// import mapboxgl from 'mapbox-gl';
import axios from 'axios';

const MapBox = ReactMapboxGl({
    // This is a public sandbox token.  It should be hidden as environment variable once I get new token for production.
    accessToken:
      'pk.eyJ1Ijoic3RlcGhlbmhhbnpsaWsiLCJhIjoiY2o1d3l5ZGhqMDJ3azJ3cXFxc2FsYjQzcyJ9.nvGZW-k1vzXxmWxmadEPmw'
  });


class Map extends Component {

    constructor(props) {
        super(props);
        this.state = {
            stations: []
        };

    }

    componentDidMount(){

        axios.get('http://localhost:8081/EnosJava/api/snotel/stations')
        .then(response => {
            console.log("Data in Map Component: ", response.data);
             
            this.setState({
                stations: response.data
            })
        })
        .catch(error => console.log(error))
    }

    render(){
        //https://alex3165.github.io/react-mapbox-gl/demos

        return(
             <MapBox
                style="mapbox://styles/mapbox/outdoors-v11"
                containerStyle={{
                    width: '1200px',
                    height: '60vh'
                }}
                images={{
                    "pin": "https://www.pikpng.com/transpng/imhRhJx/"
                }}
            >
            <Layer type="symbol" id="marker" layout={{
                'icon-image': 'marker-15'
                // 'icon-image': 'pin'
                }}>
                <Feature coordinates={[-0.13235092163085938,51.518250335096376]} />
            </Layer>
            </MapBox>
        )
    }
}

export default Map;