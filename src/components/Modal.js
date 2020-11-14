import React, { Component } from 'react';
import styled from 'styled-components';

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

class Modal extends Component {

    constructor(props){
        super(props);
        this.state = {
            relativeTime:   604800000,            
            observationType: 'snowDepth',
            startDate: '10/01/2018',//Date.now() - 604800000,
            endDate: '6/01/2019',//Date.now(),
            stationToGraphSelect: 'fixedStation',
            timeToGraphSelect: 'absoluteTime',
            showTime: 'relative'
        }

        this.handleObservationTypeChange = this.handleObservationTypeChange.bind(this);
        this.handleRelativeTimeChange = this.handleRelativeTimeChange.bind(this);
        this.handleAbsoluteStartChange = this.handleAbsoluteStartChange.bind(this);
        this.handleAbsoluteEndChange = this.handleAbsoluteEndChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleTimeSelectChange = this.handleTimeSelectChange.bind(this);
        this.handleStationSelectChange = this.handleStationSelectChange.bind(this);
    }

    handleRelativeTimeChange(event) { 
        this.setState({relativeTime: event.target.value})
    }

    handleObservationTypeChange(event) { 
        this.setState({observationType: event.target.value})
    }

    handleAbsoluteStartChange(event) { 
        this.setState({startDate: event.target.value})
    }

    handleAbsoluteEndChange(event) { 
        this.setState({endDate: event.target.value})
    }

    handleSubmit(event) {
        console.log('this.state', this.state)
        event.preventDefault();
        this.props.closeModal();
        this.props.getObservations(this.state.observationType, this.state.startDate, this.state.endDate, this.state.relativeTime);
    }

    handleStationSelectChange(e) {
        this.setState({stationToGraphSelect: e.target.value})
    }

    handleTimeSelectChange(e) {
        this.setState({timeToGraphSelect: e.target.value})
    }

    render(){
        //display-none
        const showModalClassName = this.props.show ? "modal display-block" : "modal display-none";
        const showAbsoluteTimeClassName = this.state.timeToGraphSelect ===  'absoluteTime' ? "display-block-label" : "display-greyed";
        const showRelativeTimeClassName = this.state.timeToGraphSelect ===  'relativeTime' ? "display-block-label" : "display-greyed";
        const showFixedStationSelect = this.state.stationToGraphSelect ===  'fixedStation' ? "display-block-label" : "display-none";
        const showDynamicStationSelect = this.state.stationToGraphSelect ===  'dynamicStation' ? "display-block-label display-greyed" : "display-none";

        const stationSelectedStyle = {
            'max-height': '16px'
        }

        const selectObservationTypeStyle = {
            'max-height': '22px'
        }

        return (
            <div className={showModalClassName}>
                <p>You are mounting a graph.  You can select whether to tie the graph to the selected station (dynamic) or a partiuclar station (fixed).  If going with a dynamic station clicking new stations on the map will update your graph accordingly.  
                    Next, select the observation type you want to graph (Snow Depth, Air Temperature Min, etc).  Finally, select the time interval for your chosen data set.  Relative time is a set interval from today and absolute time is an interval between two epxlicitly chosen dates.</p>
                    <form onSubmit={this.handleSubmit}>
                        <Row>
                            <Column>
                                <Row>
                                    <label className={"label-font-size"} for="dynamicStation">Dynamic Station</label>
                                    <input checked={'dynamicStation' === this.state.stationToGraphSelect} type="radio" value="dynamicStation" id="dynamicStation" onChange={this.handleStationSelectChange} name="dynamicStation"/>
                                </Row>
                                <Row>
                                    <label className={"label-font-size"} for="fixedStation">Fixed Station</label>
                                    <input checked={'fixedStation' === this.state.stationToGraphSelect}type="radio" value="fixedStation" id="fixedStation" onChange={this.handleStationSelectChange} name="fixedStation"/>

                                </Row>
                            </Column>
                            <input style={stationSelectedStyle} className={showFixedStationSelect} type="text" value={this.props.stationName} name="dynamicStationtoGraph"/>
                            <input style={stationSelectedStyle} className={showDynamicStationSelect} type="text" value={"Graph Changes w/ Map"} name="dynamicStationtoGraph"/>  
                            <label className={"label-font-size"} for="selectObservationType">Observation Type</label>
                            <select name="selectObservationType" style={selectObservationTypeStyle} value={this.state.observationType} onChange={this.handleObservationTypeChange}>
                                <option value="604800000">Snow Depth</option>
                                <option value="2592000000">Snow Depth Δ</option>
                                <option value="5184000000">Snow Water Equivalent</option>
                                <option value="7776000000">Snow Water Equivalent Δ</option>
                                <option value="31536000000">Air Temperature Observed</option>
                                <option value="31536000000">Air Temperature Average</option>
                                <option value="31536000000">Air Temperature Min</option>
                                <option value="31536000000">Air Temperature Max</option>
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
                                    <select className={showRelativeTimeClassName} name="selectRelativeTimeInterval" value={this.state.relativeTime} onChange={this.handleRelativeTimeChange}>
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
                                    <input className={showAbsoluteTimeClassName} type="text" onChange={this.handleAbsoluteStartChange} value={this.state.startDate} name="selectStartDate"/>
                                </Row>
                            </Column>
                            <Column>
                                <Row>
                                    <label className={showAbsoluteTimeClassName} for="selectEndDate">To:</label>
                                    <input className={showAbsoluteTimeClassName} type="text" onChange={this.handleAbsoluteEndChange} value={this.state.endDate} name="selectEndDate"/>
                                </Row>
                            </Column>
                        </Row>
                        <input type="submit" value="Build Graph" />
                    </form>
                <button onClick={() => this.props.closeModal()}>Cancel</button>
          </div>
        )
    }
}

export default Modal;
