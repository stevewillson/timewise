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

  const fileInputStyle = {
    display: 'none'
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

  const downloadTextFileContent = (textContent, filename) => {
    const outData = textContent;
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

  const exportPlanText = (timewiseState, date) => {
    // convert the events to local time when copying events for a particular day
    let dayEvents = timewiseState.timewisePlanningEvents.filter(event => {
      const eventStartLocal = DateTime.fromISO(event.start).toLocal()
      return (eventStartLocal.toISODate() === date)
    })

    let sortedEvents = dayEvents.sort((a, b) => (a.start > b.start) ? 1 : -1);

    let textContent = "";
    sortedEvents.forEach(event => {
      let category = event.extendedProps.category || 'None';
      let start = DateTime.fromISO(event.start).toLocal().toISO().slice(11,16);
      let end = DateTime.fromISO(event.end).toLocal().toISO().slice(11,16);
      textContent += start + " - " + end + " " + event.title + " Category: " + category + "\r";
    })
    downloadTextFileContent(textContent, 'timewise_text_plan.txt');
  }

  const importTemplate = () => {
    const importTemplateInput = document.getElementById("importTemplateFile");    
    importTemplateInput.onchange = () => {
      readFile(importTemplateInput.files[0]).then(content => {
        const jsonData = JSON.parse(content)
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
      }).catch(error => console.log(error));
    }
    importTemplateInput.click();
  };

  const importData = () => {
    const importFileInput = document.getElementById("importFile")
    importFileInput.onchange = () => {
      readFile(importFileInput.files[0]).then(content => {
        const jsonData = JSON.parse(content)
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
      }).catch(error => console.log(error));
    }
    importFileInput.click();
  };

  const readFile = file => {
    const reader = new FileReader();
    return new Promise((resolve, reject) => {
      reader.onload = event => resolve(event.target.result)
      reader.onerror = error => reject(error)
      reader.readAsText(file)
    });
  }

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
              >Export All Events
              </button>
            </td>
            <td>
              <button 
                type="button" 
                id="importFileBtn" 
                onClick={() => importData()}
                style={btnStyle}
              >Import File</button>
              <input type="file" id="importFile" style={fileInputStyle} />
            </td>
          </tr>
          <tr>
            <td>
              <button 
                id='exportTemplateBtn' 
                style={btnStyle} 
                onClick={() => exportTemplate(timewiseState, date)}
              >Export Day Template
              </button>
            </td>
            <td>
              <button 
                type="button" 
                id="importTemplateBtn" 
                onClick={() => importTemplate()}
                style={btnStyle}
              >Import Day Template
              </button>
              <input type="file" id="importTemplateFile" style={fileInputStyle} />
            </td>
          </tr>
          <tr>
            <td>
              <button
                onClick={() => exportPlanText(timewiseState, date)}
                style={btnStyle}
              >Export Day Text Plan
              </button>
            </td>
            <td>
              <button  
                onClick={() => resetTracker()}
                style={btnStyle}
              >Clear Tracker
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