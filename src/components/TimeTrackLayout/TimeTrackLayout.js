import React from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import TimePlan from '../TimePlan/TimePlan';
import TrackedTime from '../TrackedTime/TrackedTime';
import TodoList from '../TodoList/TodoList';
import NotesList from '../NotesList/NotesList';
import '../../assets/App.css';

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
      <input
        id='dateSelect'
        type='date'
        value={date}
        onChange={event => { 
          console.log(event.target.value);
          dispatch({ type: 'DATECHANGE', payload: { date: event.target.value}})
        }}
      />
      <button style={btnStyle} onClick={() => dispatch({ type: 'EXPORTDATA' })}>Export</button>
      <div className="grid-container">
        <div className="plan-layout">
          <TimePlan />
        </div>
        <div className="tracked-layout">
          <TrackedTime />
        </div>
        <div className="todo-layout">
          <TodoList />
        </div>
        <div className="notes-layout">
          <NotesList />
        </div>
      </div>
    </React.Fragment>
  )
}

export default TimeTrackLayout;