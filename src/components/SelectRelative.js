import React, { Component } from 'react';

class SelectRelative extends Component {

    constructor(props){
        super(props);
        this.state={
            absoluteTime: 5184000000
        }
        this.handleAbsoluteTimeChange = this.handleAbsoluteTimeChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleAbsoluteTimeChange(event) { 
        this.setState({
            absoluteTime: event.target.value
        })
    }

    handleSubmit(event){
        console.log(event.target.value)
        console.log(event)
        event.preventDefault();
        this.props.handleSubmit(event.target.value);
    }

    render(){
        const timeSelectStyle = {
            'display': 'initial',
            'max-width': '80px'
        }
        return (
            <form onSubmit={this.handleSubmit}>
                <select style={timeSelectStyle} name={'selectAbsoluteTimeInterval'} value={this.state.absoluteTime} onChange={this.handleAbsoluteTimeChange}>
                    <option value="604800000">7 days</option>
                    <option value="2592000000">30 days</option>
                    <option value="5184000000">60 days</option>
                    <option value="7776000000">90 days</option>
                    <option value="31536000000">365 days</option>
                </select>
                <input type="submit" value="Submit" />
            </form>
        )
    }
}

export default SelectRelative;