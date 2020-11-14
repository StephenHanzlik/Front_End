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
    }

    handleRelativeTimeChange(event) { 
        this.setState({
            relativeTime: event.target.value
        })
    }

    handleObservationTypeChange(event) { 
        this.setState({
            observationType: event.target.value
        })
    }

    handleAbsoluteStartChange(event) { 
        this.setState({
            startDate: event.target.value
        })
    }

    handleAbsoluteEndChange(event) { 
        this.setState({
            endDate: event.target.value
        })
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.closeModal();
        this.props.getObservations(this.state.observationType, this.state.startDate, this.state.endDate, this.state.relativeTime, );
    }

    handleStationSelectChange=(e)=>{
        this.setState({
            stationToGraphSelect: e.target.value
        })

        console.log('e.target.value', e.target.value);
    }

    handleTimeSelectChange(e) {
        this.setState({
            timeToGraphSelect: e.target.value
        })
    }

    render(){
        //display-none
        const showModalClassName = this.props.show ? "modal display-block" : "modal display-none";
        const showAbsoluteTimeClassName = this.state.timeToGraphSelect ===  'absoluteTime' ? "display-block" : "display-greyed";
        const showRelativeTimeClassName = this.state.timeToGraphSelect ===  'relativeTime' ? "display-block" : "display-greyed";
        const showStationSelect = this.state.stationToGraphSelect ===  'fixedStation' ? "display-block" : "display-greyed";

        const stationSelectedStyle = {
            'max-height': '16px'
        }

        return (
            <div className={showModalClassName}>
                <p>You are mounting a graph.  You can select whether to tie the graph data to the selected station or a partiuclar station.  If going with a selected station clicking new stations on the map will update your graph.  
                    Next, Select the time interval to graph your chosen data set.</p>
                    <form onSubmit={this.handleSubmit}>
                        <Row>
                            <Column>
                                <Row>
                                    <label for="selectedStation">Selected Station</label>
                                    <input checked={'selectedStation' === this.state.stationToGraphSelect} type="radio" value="selectedStation" id="selectedStation" onChange={this.handleStationSelectChange} name="selectedStation"/>
                                </Row>
                                <Row>
                                    <label for="fixedStation">Fixed Station</label>
                                    <input checked={'fixedStation' === this.state.stationToGraphSelect}type="radio" value="fixedStation" id="fixedStation" onChange={this.handleStationSelectChange} name="fixedStation"/>

                                </Row>
                            </Column>
                            <input style={stationSelectedStyle} className={showStationSelect} type="text" value={"Lake Eldora"} name="selectedStationtoGraph"/> 
                        {/* </Row>
                        <Row> */}
                            <Column>
                                <Row>
                                    <label for="relativeTime">Relative Time</label>
                                    <input checked={'relativeTime' === this.state.timeToGraphSelect}type="radio" value="relativeTime" id="relativeTime" onChange={this.handleTimeSelectChange} name="relavtiveTime"/>
                                </Row>
                                <Row>
                                    <label for="absoluteTime">Absolute Time</label>
                                    <input checked={'absoluteTime' === this.state.timeToGraphSelect}type="radio" value="absoluteTime" id="absoluteTime" onChange={this.handleTimeSelectChange} name="absoluteTime"/>   
                                </Row>
                            </Column>
                            <Column>
                                <Row>
                                    <label className={showAbsoluteTimeClassName} for="selectStartDate">Start Date:</label>
                                    <input className={showAbsoluteTimeClassName} type="text" onChange={this.handleAbsoluteStartChange} value={this.state.startDate} name="selectStartDate"/>
                                </Row>
                            </Column>
                            <Column>
                                <Row>
                                    <label className={showAbsoluteTimeClassName} for="selectEndDate">End Date:</label>
                                    <input className={showAbsoluteTimeClassName} type="text" onChange={this.handleAbsoluteEndChange} value={this.state.endDate} name="selectEndDate"/>
                                </Row>
                            </Column>
                            <Column>
                                <select className={showRelativeTimeClassName} name="selectRelativeTimeInterval" value={this.state.relativeTime} onChange={this.handleRelativeTimeChange}>
                                    <option value="604800000">7 days</option>
                                    <option value="2592000000">30 days</option>
                                    <option value="5184000000">60 days</option>
                                    <option value="7776000000">90 days</option>
                                    <option value="31536000000">365 days</option>
                                </select>
                            </Column>
                                <label for="selectObservationType">Observation Type</label>
                                <select name="selectObservationType" value={this.state.observationType} onChange={this.handleObservationTypeChange}>
                                    <option value="604800000">Snow Depth</option>
                                    <option value="2592000000">Snow Depth Δ</option>
                                    <option value="5184000000">Snow Water Equivalent</option>
                                    <option value="7776000000">Snow Water Equivalent Δ</option>
                                    <option value="31536000000">Air Temperature Observed</option>
                                    <option value="31536000000">Air Temperature Average</option>
                                    <option value="31536000000">Air Temperature Min</option>
                                    <option value="31536000000">Air Temperature Min</option>
                                </select>
                        </Row>
                    </form>
                <button onClick={() => this.props.closeModal()}>Cancel</button>
                <input type="submit" value="Build Graph" />
          </div>
        )
    }
}

export default Modal;
