import React from 'react';
//import { DateTime } from 'luxon';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const TimeTrack = () => {
  // get state values from redux
  const { date } = useSelector(state => state)
  const dispatch = useDispatch();

  const btnStyle = {
    backgroundColor: '#707070',
    color: 'white',
    border: 'none',
    borderRadius: '12px',
    cursor: 'pointer',
    margin: '6px',
    textAlign: 'center',
    fontSize: '16px',
    }

  const tableContent =
    <React.Fragment>
      <h1>Timewise tracking</h1> 
    </React.Fragment>

  return (
    <React.Fragment>
    <form>
      <label>TimeTrack File: 
        <input 
          type="file" 
          id="timeInput" 
          onChange={() => {}}
          style={btnStyle}
        />
      </label>
    </form>
    <DatePicker
      selected={date}
      onChange={(date) => dispatch({ type: 'DATECHANGE', payload: { date: date }})} //only when value has changed
    />
    <button style={btnStyle} onClick={() => dispatch({ type: 'ADDEVENT', payload: { view: 'all' }})}>Show Date</button>
    {tableContent}
    </React.Fragment>
  );
};

export default TimeTrack;