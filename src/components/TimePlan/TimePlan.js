import React from 'react';
//import { DateTime } from 'luxon';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import DatePicker from "react-datepicker";
import "../../../node_modules/react-datepicker/dist/react-datepicker.css";

const TimePlan = () => {
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
      <h1>Planned Time</h1>
    </React.Fragment>

  return (
    <React.Fragment>
    {tableContent}
    <DatePicker
      selected={date}
      onChange={(date) => dispatch({ type: 'DATECHANGE', payload: { date: date }})} //only when value has changed
    />
    <button style={btnStyle} onClick={() => dispatch({ type: 'EXPORTDATA' })}>Export</button>
    </React.Fragment>
  );
};

export default TimePlan;