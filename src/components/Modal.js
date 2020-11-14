import React, { Component } from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';


const LargeButton = styled.button`
  color: #ffb74d;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid #ffb74d;
  border-radius: 3px;
  background: none;
`;

const SmallButton = styled.button`
  color: #ffb74d;
  font-size: 1em;
  padding: 0.3em 0.3em;
  border: 2px solid #ffb74d;
  border-radius: 3px;
`

class Modal extends Component {

    constructor(props){
        super(props);
        this.state = {
            relativeTime:   604800000,            
            observationType: 'snowDepth',
            startDate: Date.now() - 604800000,
            endDate: Date.now(),
            fixedStationSelect: false
        }

        this.handleObservationTypeChange = this.handleObservationTypeChange.bind(this);
        this.handleRelativeTimeChange = this.handleRelativeTimeChange.bind(this);
        this.handleAbsoluteStartChange = this.handleAbsoluteStartChange.bind(this);
        this.handleAbsoluteEndChange = this.handleAbsoluteEndChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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
          fixedStationSelect: e.target.value
        })

        console.log('e.target.value', e.target.value);
    }

    render(){
        
        const showHideClassName = this.props.show ? "modal display-block" : "modal display-none";

        return (
            <div className={showHideClassName}>
                <p>You are mounting a graph.  You can select wether to tie the graph data to the selected station or a partiuclar station.  If going with a selected station clicking new stations on the map will update your graph.  
                    Next, Select the time interval to graph your chosen data set.</p>
                    <form onSubmit={this.handleSubmit}>
                        <label for="fixedStation">Fixed Station</label>
                        <input checked={'fixedStation' === this.state.fixedStationSelect}type="radio" value="fixedStation" id="fixedStation" onChange={this.handleStationSelectChange} name="fixedStation" />
                        <label for="selectedStation">Selected Station</label>
                        <input checked={'selectedStation' === this.state.fixedStationSelect} type="radio" value="selectedStation" id="selectedStation" onChange={this.handleStationSelectChange} name="selectedStation"/>
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
                        <label for="selectRelativeTimeInterval">Relative</label>
                        <select name="selectRelativeTimeInterval" value={this.state.relativeTime} onChange={this.handleRelativeTimeChange}>
                            <option value="604800000">7 days</option>
                            <option value="2592000000">30 days</option>
                            <option value="5184000000">60 days</option>
                            <option value="7776000000">90 days</option>
                            <option value="31536000000">365 days</option>
                        </select>
                        <label for="selectStartDate">Start Date:</label>
                        <input type="text" onChange={this.handleAbsoluteStartChange} value={this.state.startDate} name="selectStartDate"/>
                        <label for="selectEndDate">End Date:</label>
                        <input type="text" onChange={this.handleAbsoluteEndChange} value={this.state.endDate} name="selectEndDate"/>
                        <input type="submit" value="Submit" />
                    </form>
                <button onClick={() => this.props.closeModal()}>Cancel</button>
          </div>
        )
    }
}

export default Modal;
