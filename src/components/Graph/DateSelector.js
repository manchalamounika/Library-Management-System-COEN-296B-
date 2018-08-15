import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-dropdown/style.css'
import 'react-datepicker/dist/react-datepicker.css';
const options = [
  { value: 'Library 1', label: 'Library 1' },
  { value: 'Library 2', label: 'Library 2'},
  {value: 'Library 3', label: 'Library 3' },
  {value: 'Library 4', label: 'Library 4' },
 
]

const defaultOption = options[0]

export default class DateSelector extends Component {
  constructor (props) {
    super(props)
    this.state = {
      startDate: moment()
    };
    this.handleChange = this.handleChange.bind(this);
  }
 
  handleChange(date) {
    this.setState({
      startDate: date
    });
  }
 
  render() {
    
    return (
      <div>
    DatePicker 
        selected={this.state.startDate}
        onChange={this.handleChange}
       
        
        <Dropdown 

options={options} 
onChange={this._onSelect} 
value={defaultOption} 
placeholder="Select an option" />
<div className="dateSelector">
      <DateSelector  /> 
</div>
</div>
    );
  }
}
