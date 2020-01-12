import React from 'react';
//import { DateTime } from 'luxon';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TimePlan from '../TimePlan/TimePlan';
import TrackedTime from '../TrackedTime/TrackedTime';
import TodoList from '../TodoList/TodoList';
import NotesList from '../NotesList/NotesList';

import RGL from 'react-grid-layout';

const TimeTrackLayout = () => {

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

  // layout will be as follows:
  // Time Plan | Tracked Time
  // NotesList | TodoList
  
  return (
    <React.Fragment>
      <h1>Timewise tracking</h1>
      <form>
        <label>Import File: 
        <input 
          type="file" 
          id="timeInput" 
          onChange={() => dispatch({ type: 'IMPORTDATA' })}
          style={btnStyle}
        />
        </label>
      </form>
      <DatePicker
        selected={date}
        onChange={(date) => dispatch({ type: 'DATECHANGE', payload: { date: date }})} //only when value has changed
      />
      <button style={btnStyle} onClick={() => dispatch({ type: 'EXPORTDATA' })}>Export</button>  
      <RGL className="layout" cols={2} rowHeight={300} width={1200} >
        <div key="a" data-grid={{x: 0, y: 0, w: 1, h: 2, static: true}}><TimePlan /></div>
        <div key="b" data-grid={{x: 1, y: 0, w: 1, h: 2, minW: 2, maxW: 4}}><TrackedTime /></div>
        <div key="c" data-grid={{x: 0, y: 2, w: 1, h: 2}}><TodoList /></div>
        <div key="d" data-grid={{x: 1, y: 2, w: 1, h: 2}}><NotesList /></div>
      </RGL>
    </React.Fragment>
  )
  
}

export default TimeTrackLayout;