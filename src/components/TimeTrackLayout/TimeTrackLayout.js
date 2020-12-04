import React from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import TimeGrid from '../TimeGrid/TimeGrid';
import '../../assets/App.css';

import AddCategoryDisplay from './AddCategoryDisplay';
import CategoryDisplay from './CategoryDisplay';
import { v4 as uuidv4 } from 'uuid'; 
import { DateTime } from 'luxon';

const TimeTrackLayout = () => {
  // get state values from redux
  const { date, startTime, endTime } = useSelector(state => state)
  const timewiseState = useSelector(state => {
    return {
      timewisePlanningEvents: state.planning,
      timewiseTrackingEvents: state.tracking,
      timewiseDate: state.date,
      timewiseCategories: state.categories,
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

  const downloadJsonFileContent = (jsonContent, filename) => {
    const outData = JSON.stringify(jsonContent);
    //Download the file as a JSON formatted text file
    var downloadLink = document.createElement("a");
    var blob = new Blob(["\ufeff", outData]);
    var url = URL.createObjectURL(blob);
    downloadLink.href = url;
    downloadLink.download = filename;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  }

  const exportTemplate = (timewiseState, date) => {
    // convert the events to local time when copying events for a particular day
    let dayEvents = timewiseState.timewisePlanningEvents.filter(event => {
      const eventStartLocal = DateTime.fromISO(event.start).toLocal()
      return (eventStartLocal.toISODate() === date)
    })

    let templateEvents = dayEvents.map(event => {
      return {
        title: event.title,
        start: DateTime.fromISO(event.start).toLocal().toISO().slice(10),
        end: DateTime.fromISO(event.end).toLocal().toISO().slice(10),
        category: event.extendedProps.category || '',
        color: event.color || ''
      }
    })
    downloadJsonFileContent(templateEvents, 'timewise_day_template.txt');
  }

  const importTemplate = async (event) => {
    const importFile = event.target.files[0];
    try {
      const fileContents = await readFile(importFile);
      const jsonData = JSON.parse(fileContents)
      // loop through the events in the template and create a new event for each one
      jsonData.forEach(event => {
        dispatch({ 
          type: 'CREATE_EVENT', 
          payload: {
            calType: 'planning',
            event: {
              title: event.title,
              start: DateTime.fromISO(date + event.start).toUTC().toISO(),
              end: DateTime.fromISO(date + event.end).toUTC().toISO(),
              id: uuidv4(),
              color: event.color,
              extendedProps: 
              { 
                calType: 'planning',
                category: event.category,
              },
            },
          },
        })
      })
      // reset the value of the import file
      event.target.value = '';
    } catch (e) {
      console.log(e.message);
    }
  };

  const importData = async (event) => {
    const importFile = event.target.files[0];
    try {
      const fileContents = await readFile(importFile);
      const jsonData = JSON.parse(fileContents)
      // set the state here from redux

      jsonData.timewisePlanningEvents.forEach(event => {
        dispatch({ 
          type: 'CREATE_EVENT', 
          payload: {
            calType: event.extendedProps.calType,
            event: {
              title: event.title,
              start: event.start,
              end: event.end,
              id: event.id,
              color: event.color,
              extendedProps: 
              { 
                calType: event.extendedProps.calType,
                category: event.category,
              },
            },
          },
        })
      })

      jsonData.timewiseTrackingEvents.forEach(event => {
        dispatch({ 
          type: 'CREATE_EVENT', 
          payload: {
            calType: event.extendedProps.calType,
            event: {
              title: event.title,
              start: event.start,
              end: event.end,
              id: event.id,
              color: event.color,
              extendedProps: 
              { 
                calType: event.extendedProps.calType,
                category: event.category,
              },
            },
          },
        })
      })

      jsonData.timewiseCategories.forEach(category => {
        dispatch({
          type: 'CREATE_CATEGORY',
          payload: {
            id: category.id,
            name: category.name,
            color: category.color
          }
        })
      })

      dispatch({
        type: 'UPDATE_DISPLAY_DATE',
        payload: {
          date: jsonData.timewiseDate, 
        },
      });
      // reset the value of the import file
      event.target.value = '';
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

  const resetTracker = () => {
    let resetPrompt = prompt("Type 'yes' to confirm clearing tracker");
    dispatch({
      type: 'RESET_TRACKER',
      payload: {
        resetType: resetPrompt,
      }
    })  
  }

  // layout:
  // Planned Time | Tracked Time
  return (
    <React.Fragment>
      <table className='timewiseBtnTable'>
        <tbody>
          <tr>
            <td>
              <button 
                id='exportEventsBtn' 
                style={btnStyle} 
                onClick={() => downloadJsonFileContent(timewiseState, 'timewise_output.txt')}
              >
                Export All Events
              </button>
            </td>
            <td>
              <label htmlFor='importFileBtn'>Import File: </label> 
              <input 
                type="file" 
                id="importFileBtn" 
                onChange={importData}
                style={btnStyle}
              />
            </td>
          </tr>
          <tr>
            <td>
              <button 
                id='exportTemplateBtn' 
                style={btnStyle} 
                onClick={() => exportTemplate(timewiseState, date)}
              >
                Export Day Template
              </button>
            </td>
            <td>
              <label htmlFor='importTemplateBtn'>Import Day Template: </label> 
              <input 
                type="file" 
                id="importTemplateBtn" 
                onChange={importTemplate}
                style={btnStyle}
              />
            </td>
          </tr>
          <tr>
            <td>
              <button  
                onClick={() => resetTracker()}
                style={btnStyle}
              >
              Clear Tracker
              </button>
            </td>
          </tr>
          <tr>
            <td>
              <label htmlFor='dateSelect'>Select Date: </label>
              <input
                id='dateSelect'
                type='date'
                value={date}
                onChange={event => { 
                  dispatch({ type: 'UPDATE_DISPLAY_DATE', payload: { date: event.target.value}})
                }}
              />
            </td>
            <td>
              <label htmlFor='startTimeSelect'>Start Time: </label>
              <input
                id='startTimeSelect'
                type='time'
                step='900'
                value={startTime}
                onChange={event => { 
                  dispatch({ type: 'UPDATE_START_TIME', payload: { startTime: event.target.value}})
                }}
              />
            </td>
            <td>
              <label htmlFor='endTimeSelect'>End Time: </label>
              <input
                id='endTimeSelect'
                type='time'
                step='900'
                value={endTime}
                onChange={event => { 
                  dispatch({ type: 'UPDATE_END_TIME', payload: { endTime: event.target.value}})
                }}
              />
            </td>
          </tr>
          <tr>
            <td><AddCategoryDisplay /></td>
            <td><CategoryDisplay /></td>
          </tr>
        </tbody>
      </table>
      <table>
        <tbody>
          <tr>
            <td><TimeGrid calType="planning" slotLabel={true}  /></td>
            <td><TimeGrid calType="tracking" slotLabel={false} /></td> 
          </tr>
        </tbody>

      </table>
    </React.Fragment>
  )
}

export default TimeTrackLayout;