import React, { Component } from 'react';
import NavBar from '../components/NavBar';
import Graph from '../components/Graph';
import Map from '../components/Map';
import styled from 'styled-components';
import axios from 'axios';

const MapWrapper = styled.div`
    display: flex;
    justify-content: center;
    padding-top: 20px;
`;

const GraphWrapper = styled.div`
    display: flex;
    justify-content: center;
`;

class Console extends Component{

    constructor(props) {
        super(props);
        this.state = {
            observations: [],
            stationTriplet: '',
            geoJson: ''
        };
        this.getObservations = this.getObservations.bind(this);
        // this.getStations = this.getStations.bind(this);
    }

    getObservations(triplet){
        //NRCS UI Report Gen
        //https://www.nrcs.usda.gov/wps/portal/wcc/home/quicklinks/imap#version=115&elements=D&networks=!&states=!&counties=!&hucs=&minElevation=&maxElevation=&elementSelectType=all&activeOnly=true&activeForecastPointsOnly=false&hucLabels=false&hucIdLabels=false&hucParameterLabels=false&stationLabels=&overlays=&hucOverlays=&basinOpacity=100&basinNoDataOpacity=100&basemapOpacity=100&maskOpacity=0&mode=stations&openSections=dataElement,parameter,date,basin,elements,location,networks&controlsOpen=true&popup=05K29:CO:SNOW&popupMulti=&base=esriNgwm&displayType=inventory&basinType=6&dataElement=SRVO&depth=-8&parameter=PCTAVG&frequency=MONTHLY&duration=custom&customDuration=1&dayPart=E&year=2020&month=4&day=19&monthPart=E&forecastPubMonth=5&forecastPubDay=1&forecastExceedance=50&seqColor=1&divColor=3&scaleType=D&scaleMin=&scaleMax=&referencePeriodType=POR&referenceBegin=1981&referenceEnd=2010&minimumYears=20&hucAssociations=true&lat=39.8167&lon=-105.6999&zoom=12.5
        axios.get(`/api/snotel/observations/${triplet}?from=2019-10-14&to=${new Date().toJSON().slice(0,10)}`)
        .then(response => {
            console.log("Observation Resp", response)            
            this.setState({
                stationTriplet: triplet,
                observations: response.data
            }, )
        })
        .catch(error => console.log(error))
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

    render(){
        
        console.log("Console getObservations: ", this.getObservations)

        return(

            // Todo: Make stations API call here and pass as props to Map
            <div>
                <NavBar/>
                <MapWrapper>
                    <Map
                        getObservations={this.getObservations}
                        geoJson={this.state.geoJson}
                    />
                </MapWrapper>
                <GraphWrapper>
                    <Graph
                        observations={this.state.observations}
                    />
                </GraphWrapper>
                
            </div>
        )
    }
}

export default Console;