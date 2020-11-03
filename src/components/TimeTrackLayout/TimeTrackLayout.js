import React from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import TimeGrid from '../TimeGrid/TimeGrid';
import '../../assets/App.css';

const TimeTrackLayout = () => {
  // get state values from redux
  const { date } = useSelector(state => state)
  const timewiseState = useSelector(state => {
    return {
      timewisePlanningEvents: state.planning,
      timewiseTrackingEvents: state.tracking,
      timewiseDate: state.date,
    }
  })
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

  const exportData = (state) => {
    const outData = JSON.stringify(state);
    //Download the file as a JSON formatted text file
    var downloadLink = document.createElement("a");
    var blob = new Blob(["\ufeff", outData]);
    var url = URL.createObjectURL(blob);
    downloadLink.href = url;
    const outFileName = 'timewise_output.txt'
    downloadLink.download = outFileName;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  }

  const importData = async (event) => {
    const importFile = event.target.files[0];
    try {
      const fileContents = await readFile(importFile);
      const jsonData = JSON.parse(fileContents)
      // set the state here from redux
      dispatch({
        type: 'IMPORT_DATA',
        payload: {
          planning: jsonData.timewisePlanningEvents,
          tracking: jsonData.timewiseTrackingEvents,
          date: jsonData.timewiseDate, 
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

  // layout:
  // Planned Time | Tracked Time
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
        <button style={btnStyle} onClick={() => exportData(timewiseState)}>Export</button>
      </form>
      <input
        id='dateSelect'
        type='date'
        value={date}
        onChange={event => { 
          dispatch({ type: 'UPDATE_DISPLAY_DATE', payload: { date: event.target.value}})
        }}
      />
      <button style={btnStyle} onClick={() => exportData(timewiseState)}>Export</button>
      <table>
        <tbody>
          <tr>
            <td><TimeGrid calType="planning" slotLabel={true} /></td>
            <td><TimeGrid calType="tracking" slotLabel={false} /></td>
          </tr>
        </tbody>

      </table>
    </React.Fragment>
  )
}

export default TimeTrackLayout;