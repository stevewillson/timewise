import React from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import PlannedTime from '../PlannedTime/PlannedTime';
import TrackedTime from '../TrackedTime/TrackedTime';
import TodoList from '../TodoList/TodoList';
import NotesList from '../NotesList/NotesList';
import "react-datepicker/dist/react-datepicker.css";
import '../../assets/App.css';

const TimeTrackLayout = () => {

  // get state values from redux
  const curState = useSelector(state => state);
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

  const importData = async (event) => {
    const importFile = event.target.files[0];
    try {
      const fileContents = await readFile(importFile);
      const jsonData = JSON.parse(fileContents)
      // set the state here from redux
      dispatch({
        type: 'IMPORTDATA',
        payload: {
          plannedEvents: jsonData.plannedEvents,
          trackedEvents: jsonData.trackedEvents,
          notes: jsonData.notes,
          todoItems: jsonData.todoItems,
          completeItems: jsonData.completeItems,
        },
      });
    } catch (e) {
      console.log(e.message);
    }
  };

  // read the binary contents of the file
  const readFile = file => {
    const temporaryFileReader = new FileReader();
    return new Promise((resolve, reject) => {
      temporaryFileReader.onerror = () => {
        temporaryFileReader.abort();
        reject(new DOMException('Problem parsing input file.'));
      };
      temporaryFileReader.onload = () => {
        let text = temporaryFileReader.result;
        resolve(text);
      }
      temporaryFileReader.readAsText(file);
    });
  };

  const exportData = (state) => {
    const outData = JSON.stringify(state);
    //Download the file as CSV
	  var downloadLink = document.createElement("a");
    var blob = new Blob(["\ufeff", outData]);
    var url = URL.createObjectURL(blob);
    downloadLink.href = url;
    const outFileName = 'timewise_output.txt'
    downloadLink.download = outFileName;  //Name the file here
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  }

  return (
    <React.Fragment>
      <form>
        <label>Import File: 
        <input 
          type="file" 
          id="timeInput" 
          onChange={importData}
          style={btnStyle}
        />
        </label>
      </form>
      <button style={btnStyle} onClick={() => exportData(curState)}>Export</button>
      <div className="grid-container">
        <div className="plan-layout">
          <PlannedTime />
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