import React, { Component } from 'react';
import styled from 'styled-components';
import Graph from '../components/Graph';
import axios from 'axios';

const Row = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
`;

const Column = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: right;
`;

    // display: ${ props => props.textEntered ? "block" : "none" }; 
    // background: ${ props => props.textEntered ? "rgba(255,239,213,0.6)" : "none" }; 
const Ul = styled.ul`
    list-style-type: none;
    // display: "block"; 
    // background: "rgba(255,239,213,0.6)"; 
    display: ${ props => props.textEntered ? "block" : "none" }; 
    background: ${ props => props.textEntered ? "rgba(255,239,213,0.6)" : "none" }; 
    background: white;
    // height: 100%;
    // width: 100%;
    height: 100px;
    width: 100px;
    margin-top: 0px;
    margin-left: auto;
    margin-right: auto;
    text-align: center;
    padding-left: 2%;
    padding-right: 2%;
    overflow-y: auto;
    overflow-x: hidden;
    max-height: 26vh;
    cursor: pointer;
    z-index: 9999;
`

const PolaroidContainer = styled.div`
    width: 25%;
    background-color: #F5F5F5 //white smoke
    color: black
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    margin-top: 25px;
    margin-left: auto;
    margin-right: auto;
    border-radius: 7px;
    overflow: hidden;
`
const PolaroidDiscription = styled.div`
    text-align: justify;
    padding: 7px 20px 13px;
`

class Modal extends Component {

    constructor(props){
        super(props);
        this.state = {
            relativeTimeInterval: 5184000000,            
            observationType: 'snowDepth',
            startDate: undefined,
            endDate: undefined,
            stationTypeToGraphSelect: 'fixedStation',
            stationToGraphSelect: undefined,
            stationToGraphSearchText: '',
            timeToGraphSelect: 'relativeTime',
            searchText: '',
            showTime: 'relative',
            searchPlaceHolder: false,
            callMade: false,
            graphBuilderObservations: undefined,
            graphType: undefined,
            observations: undefined,
            stationName: undefined,
            fixedOrDynamic: undefined
        }

        this.handleObservationTypeChange = this.handleObservationTypeChange.bind(this);
        this.handleRelativeTimeChange = this.handleRelativeTimeChange.bind(this);
        this.handleAbsoluteStartChange = this.handleAbsoluteStartChange.bind(this);
        this.handleAbsoluteEndChange = this.handleAbsoluteEndChange.bind(this);
        this.handleGraphBuildSubmit = this.handleGraphBuildSubmit.bind(this);
        this.handleTimeSelectChange = this.handleTimeSelectChange.bind(this);
        this.handleStationTypeToGraphChange = this.handleStationTypeToGraphChange.bind(this);
        this.handleStationToGraphTextInput = this.handleStationToGraphTextInput.bind(this);
        this.getObservations = this.getObservations.bind(this);
    }

    getObservations(epochStart, epochEnd, triplet = this.state.stationTriplet, graphType, fixedOrDynamic, stationName) {
        let startDate = new Date(epochStart).toJSON().slice(0, 10);
        let endDate = new Date(epochEnd).toJSON().slice(0, 10);

        this.setState({
            callMade: true
        });
        alert( `/api/snotel/observations/${triplet}?from=${startDate}&to=${endDate}`)
        console.log("GET /observations Modal" , `/api/snotel/observations/${triplet}?from=${startDate}&to=${endDate}`)

        axios.get(`/api/snotel/observations/${triplet}?from=${startDate}&to=${endDate}`)
            .then(response => {
                let observations = response.data;
                this.setState({
                    callMade: false,
                    graphBuilderObservations: observations
                })
            })
            .catch(error => console.log(error))
    }

    handleRelativeTimeChange(event) { 
        let relativeTimeInterval = event.target.value;
        this.setState({
            relativeTimeInterval: relativeTimeInterval,
            startDate: undefined,
            endDate: undefined
        })
    }

    handleAbsoluteStartChange(event) { 
        this.setState({
            startDate: event.target.value,
            relativeTimeInterval: undefined
        })
    }

    handleAbsoluteEndChange(event) { 
        this.setState({
            endDate: event.target.value,
            relativeTimeInterval: undefined
        })
    }

    handleObservationTypeChange(event) { 
        this.setState({observationType: event.target.value})
    }

    handleGraphBuildSubmit(event) {
        console.log('Modal Form Submit - this.state', this.state)
        //TODO: need validation to keep indivudual graphs under a year for performance reasons.
        // let startDate = new Date(epochStart).toJSON().slice(0, 10);

        event.preventDefault();

        let stationTriplet;
        if(!this.state.stationToGraphSelect){
            stationTriplet = this.props.stationTriplet;
            this.setState({
                stationToGraphSelect: this.props.stationTriplet,
                stationToGraphSearchText: this.props.stationName
            })
        }else{
            stationTriplet = this.state.stationToGraphSelect;
        }
        // if(this.state.stationTypeToGraphSelect === 'fixedStation'){
        //     stationTriplet = this.state.stationToGraphSelect;
        // }

        if(this.state.relativeTimeInterval){
            this.getObservations(Date.now() - this.state.relativeTimeInterval, Date.now(), stationTriplet, this.state.observationType, this.state.stationTypeToGraphSelect, this.state.stationToGraphSearchText)
        }else{
            this.getObservations(this.state.startDate, this.state.endDate, stationTriplet, this.state.observationType, this.state.stationTypeToGraphSelect, this.state.stationToGraphSearchText)
        }
    }

    handleGraphMountSubmit(){
        this.setState({
            relativeTimeInterval: 5184000000,            
            observationType: 'snowDepth',
            startDate: undefined,
            endDate: undefined,
            stationTypeToGraphSelect: 'fixedStation',
            stationToGraphSelect: undefined,
            stationToGraphSearchText: '',
            timeToGraphSelect: 'relativeTime',
            searchText: '',
            showTime: 'relative',
            searchPlaceHolder: false,
            callMade: false,
            graphBuilderObservations: undefined,
            graphType: undefined,
            observations: undefined,
            stationName: undefined,
            fixedOrDynamic: undefined
        })
        //TODO: push graph to details page
        this.props.closeModal();
    }

    handleStationTypeToGraphChange(e) {
        this.setState({stationTypeToGraphSelect: e.target.value})
    }

    handleStationToGraphTextInput(e) {
        this.setState({
            stationToGraphSearchText: e.target.value,
            searchPlaceHolder: true
        })
    }

    handleStationToGraphSelect(e){
        this.setState({
            stationToGraphSelect: e.target.id,
            stationToGraphSearchText: e.target.innerHTML,
            searchPlaceHolder: false
        })
    }

    handleTimeSelectChange(e) {
        let timeIntervalType = e.target.value;
        if(timeIntervalType === 'relativeTime'){
            this.setState({
                timeToGraphSelect: timeIntervalType,
                startDate: undefined,
                endDate: undefined
            })
        }else{
            this.setState({
                timeToGraphSelect: timeIntervalType,
                relativeTimeInterval: undefined ,
                startDate: new Date(Date.now() - 31536000000).toJSON().slice(0, 10),
                endDate: new Date(Date.now()).toJSON().slice(0, 10)
            })
        }
    }

    render(){
        //display-none
        const showModalClassName = this.props.show ? "modal display-block" : "modal display-none";
        const showAbsoluteTimeClassName = this.state.timeToGraphSelect ===  'absoluteTime' ? "display-block-label" : "display-greyed";
        const showRelativeTimeClassName = this.state.timeToGraphSelect ===  'relativeTime' ? "display-block-label" : "display-greyed";
        const showFixedStationSelect = this.state.stationTypeToGraphSelect ===  'fixedStation' ? "display-block-label" : "display-none";
        const showDynamicStationSelect = this.state.stationTypeToGraphSelect ===  'dynamicStation' ? "display-block-label display-greyed" : "display-none";

        const stationSelectedStyle = {
            'max-height': '16px'
        }

        const selectObservationTypeStyle = {
            'max-height': '22px'
        }

        const showLoadingRoller = this.state.callMade ? {display: "block", width: '1200px', 'margin-top': '110px', 'margin-right': 'auto', 'margin-left': 'auto'} : {display: "none"};
        const searchText = this.state.stationToGraphSearchText ? this.state.stationToGraphSearchText.toUpperCase() : '';
        const stationsList = this.props.stations
        .filter(station => station.name.includes(searchText))
        .map((station, index) => <li key={index} id={station.triplet}>{station.name}</li>);

        return (
            <div className={showModalClassName}>
                <p>You are mounting a graph.  You can select whether to tie the graph to the station selected on the map (dynamic) or a particular station (fixed).  If you choose to use a dynamic station, clicking new stations on the map will update your graph accordingly.  
                    Next, select the observation type you want to graph (Snow Depth, Air Temperature Min, etc).  Finally, select the time interval for your chosen data set.  Relative time is a set interval from today and absolute time is an interval between two explicitly chosen dates.</p>
                    <form onSubmit={this.handleGraphBuildSubmit}>
                        <Row>
                            <Column>
                                <Row>
                                    <label className={"label-font-size"} for="dynamicStation">Dynamic Station</label>
                                    <input checked={'dynamicStation' === this.state.stationTypeToGraphSelect} type="radio" value="dynamicStation" id="dynamicStation" onChange={this.handleStationTypeToGraphChange} name="dynamicStation"/>
                                </Row>
                                <Row>
                                    <label className={"label-font-size"} for="fixedStation">Fixed Station</label>
                                    <input checked={'fixedStation' === this.state.stationTypeToGraphSelect}type="radio" value="fixedStation" id="fixedStation" onChange={this.handleStationTypeToGraphChange} name="fixedStation"/>
                                </Row>
                            </Column>
                            <Column>
                                <input 
                                    style={stationSelectedStyle} 
                                    className={showFixedStationSelect} 
                                    type="text" 
                                    placeholder={this.props.stationName} 
                                    value={this.state.stationToGraphSearchText}
                                    onChange={this.handleStationToGraphTextInput}
                                    onSelect={this.handleStationToGraphTextInput} 
                                    name="fixedStationToGraph"
                                />
                                <Ul 
                                    textEntered={this.state.searchPlaceHolder}
                                    onClick={e =>this.handleStationToGraphSelect(e)}
                                >
                                    {stationsList}
                                </Ul>
                            </Column>
                            <input style={stationSelectedStyle} className={showDynamicStationSelect} type="text" value={"Graph Changes w/ Map"} name="dynamicStationToGraph"/>  
                            <label className={"label-font-size"} for="selectObservationType">Observation Type</label>
                            <select name="selectObservationType" style={selectObservationTypeStyle} value={this.state.observationType} onChange={this.handleObservationTypeChange}>
                                <option value="snowDepth">Snow Depth</option>
                                <option value="changeInSnowDepth">Snow Depth Δ</option>
                                <option value="snowWaterEquivalent">Snow Water Equivalent</option>
                                <option value="changeInSnowWaterEquivalent">Snow Water Equivalent Δ</option>
                                <option value="airTemperatureObserved">Air Temperature Observed</option>
                                <option value="airTemperatureAverage">Air Temperature Average</option>
                                <option value="airTemperatureMax">Air Temperature Min</option>
                                <option value="airTemperatureMin">Air Temperature Max</option>
                            </select>
                            <Column>
                                <Row>
                                    <label className={"label-font-size"} for="relativeTime">Relative Time</label>
                                    <input checked={'relativeTime' === this.state.timeToGraphSelect}type="radio" value="relativeTime" id="relativeTime" onChange={this.handleTimeSelectChange} name="relavtiveTime"/>
                                </Row>
                                <Row>
                                    <label className={"label-font-size"} for="absoluteTime">Absolute Time</label>
                                    <input checked={'absoluteTime' === this.state.timeToGraphSelect}type="radio" value="absoluteTime" id="absoluteTime" onChange={this.handleTimeSelectChange} name="absoluteTime"/>   
                                </Row>
                            </Column>
                            <Column>
                                <Row>
                                    <label className={showRelativeTimeClassName} for="selectRelativeTimeInterval">From now:</label>
                                    <select className={showRelativeTimeClassName} name="selectRelativeTimeInterval" value={this.state.relativeTimeInterval} onChange={this.handleRelativeTimeChange}>
                                        <option value="604800000">7 days</option>
                                        <option value="2592000000">30 days</option>
                                        <option value="5184000000">60 days</option>
                                        <option value="7776000000">90 days</option>
                                        <option value="31536000000">365 days</option>
                                    </select>
                                </Row>
                            </Column>
                            <Column>
                                <Row>
                                    <label className={showAbsoluteTimeClassName} for="selectStartDate">From:</label>
                                    <input className={showAbsoluteTimeClassName} type="text" onChange={this.handleAbsoluteStartChange} value={this.state.startDate} placeholder={new Date(Date.now() - 31536000000).toJSON().slice(0, 10)} name="selectStartDate"/>
                                </Row>
                            </Column>
                            <Column>
                                <Row>
                                    <label className={showAbsoluteTimeClassName} for="selectEndDate">To:</label>
                                    <input className={showAbsoluteTimeClassName} type="text" onChange={this.handleAbsoluteEndChange} value={this.state.endDate} placeholder={new Date(Date.now()).toJSON().slice(0, 10)} name="selectEndDate"/>
                                </Row>
                            </Column>
                        </Row>
                        <input type="submit" value="Build Graph" />
                    </form>
                <button onClick={() => this.handleGraphMountSubmit()}>Mount Graph</button>
                <button onClick={() => this.props.closeModal()}>Cancel</button>
                    {console.log("this.state.graphBuilderObservations", this.state.graphBuilderObservations)}
                    {this.state.graphBuilderObservations && !this.state.callMade &&
                    <Row>
                        <Graph
                            graphType={this.state.observationType}
                            observations={this.state.graphBuilderObservations}
                            stationName={this.state.stationToGraphSearchText}
                            fixedOrDynamic={this.state.stationTypeToGraphSelect}
                        />  
                        {/* <PolaroidContainer>
                            <PolaroidDiscription>
                            <p>Build a graph and then select "Mount Graph" to add it to the page</p>
                            </PolaroidDiscription>
                        </PolaroidContainer>  */}
                    </Row>  
                    }
                    <div style={showLoadingRoller}>
                        <div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
                    </div>
          </div>
        )
    }
}

export default Modal;
