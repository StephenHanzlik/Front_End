import React, { Component } from 'react';
import styled from 'styled-components';
import Graph from '../components/Graph';

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
            searchPlaceHolder: false
        }

        this.handleObservationTypeChange = this.handleObservationTypeChange.bind(this);
        this.handleRelativeTimeChange = this.handleRelativeTimeChange.bind(this);
        this.handleAbsoluteStartChange = this.handleAbsoluteStartChange.bind(this);
        this.handleAbsoluteEndChange = this.handleAbsoluteEndChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleTimeSelectChange = this.handleTimeSelectChange.bind(this);
        this.handleStationTypeToGraphChange = this.handleStationTypeToGraphChange.bind(this);
        this.handleStationToGraphTextInput = this.handleStationToGraphTextInput.bind(this);
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

    handleSubmit(event) {
        console.log('Modal Form Submit - this.state', this.state)
        //TODO: need validation to keep indivudual graphs under a year for performance reasons.
        // let startDate = new Date(epochStart).toJSON().slice(0, 10);

        event.preventDefault();
        // this.props.closeModal();//this.state.observationType, 
        let stationTriplet;
        if(this.state.stationTypeToGraphSelect === 'fixedStation'){
            stationTriplet = this.state.stationToGraphSelect;
        }
        if(this.state.relativeTimeInterval){
            this.props.getObservations(Date.now() - this.state.relativeTimeInterval, Date.now(), stationTriplet)
        }else{
            this.props.getObservations(this.state.startDate, this.state.endDate, stationTriplet)
        }
        this.props.buildGraph(this.state.observationType);
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
                relativeTimeInterval: undefined 
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
        const searchText = this.state.stationToGraphSearchText ? this.state.stationToGraphSearchText.toUpperCase() : '';
        const stationsList = this.props.stations
        .filter(station => station.name.includes(searchText))
        .map((station, index) => <li key={index} id={station.triplet}>{station.name}</li>);

        return (
            <div className={showModalClassName}>
                <p>You are mounting a graph.  You can select whether to tie the graph to the station selected on the map (dynamic) or a partiuclar station (fixed).  If going with a dynamic station clicking new stations on the map will update your graph accordingly.  
                    Next, select the observation type you want to graph (Snow Depth, Air Temperature Min, etc).  Finally, select the time interval for your chosen data set.  Relative time is a set interval from today and absolute time is an interval between two explicitly chosen dates.</p>
                    <form onSubmit={this.handleSubmit}>
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
                <button>Mount Graph</button>
                <button onClick={() => this.props.closeModal()}>Cancel</button>
                    {this.props.observations &&
                    <Row>
                        <Graph
                            graphType={this.state.observationType}
                            observations={this.props.observations}
                        />  
                    </Row>  
                    }
          </div>
        )
    }
}

export default Modal;
