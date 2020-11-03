const initialState = {
  date: new Date().toISOString().slice(0,10),
  planning: [],
  tracking: [],
}

const reducer = (state = initialState, action) => {
<<<<<<< HEAD

  if (action.type === 'IMPORTDATA') {
    // import the data that was read from the file
    debugger
    return {
      ...state,
      plannedEvents: action.payload.plannedEvents,
      trackedEvents: action.payload.trackedEvents,
      notes: action.payload.notes,
      todoItems: action.payload.todoItems,
      completeItems: action.payload.completeItems,
    }
  }
  else if (action.type === 'VIEWCHANGE') {
    return {
      ...state,
      timeView: action.payload.view,
    }
  } else if (action.type === 'TIMEDATA') {
    return {
      ...state,
      timeData: action.payload.timeData,
    }
  } else if (action.type === 'DATECHANGE') {
    return {
      ...state,
      date: action.payload.date
    }
  } else if (action.type === 'ADDTODO') {
    return {
      ...state,
      todoItems: [...state.todoItems.slice(), { name: action.payload.name }]
    }
  } else if (action.type === 'REMOVETODO') {
    let newTodoItems = state.todoItems.slice()
    newTodoItems.splice(action.payload.remIndex, 1)
    return {
      ...state,
      todoItems: newTodoItems
    }
  } else if (action.type === 'REMOVECOMPLETETODO') {
  let newCompleteTodoItems = state.completeItems.slice()
  newCompleteTodoItems.splice(action.payload.remIndex, 1)
  return {
    ...state,
    completeItems: newCompleteTodoItems
  }
} else if (action.type === 'COMPLETETODO') {
    let newCompleteItems = state.completeItems.slice()
    newCompleteItems = [...newCompleteItems, { name: state.todoItems[action.payload.completeIndex].name }]

    return {
      ...state,
      completeItems: newCompleteItems
    }
  } else if (action.type === 'SETNOTES') {
    return {
      ...state,
      notes: action.payload.notes
    }
  // ADD EVENTS
  } else if (action.type === 'ADDEVENT') {
    let events = [];
    if (action.payload.eventType === 'planned') {
      events = state.plannedEvents.slice()
    } else if (action.payload.eventType === 'tracked') {
      events = state.trackedEvents.slice()
    }

    const updatedEvents = [...events, action.payload.event]

    if (action.payload.eventType === 'planned') {
      return {
        ...state,
        plannedEvents: updatedEvents,
      }
    } else if (action.payload.eventType === 'tracked') {
      return {
        ...state,
        trackedEvents: updatedEvents,
      }
    }
    
  } else if (action.type === 'EDITEVENTNAME') {
    // need to update to update the name supplied
    // find the event that matches the id
    let events = [];
    if (action.payload.eventType === 'planned') {
      events = state.plannedEvents.slice()
    } else if (action.payload.eventType === 'tracked') {
      events = state.trackedEvents.slice()
    }

    const updatedEvents = events.map(event => {
      if (event.id === action.payload.event.id) {
        return {
          ...event,
          title: action.payload.event.title,
        }
      }
      return {
        ...event
      };
    })

    if (action.payload.eventType === 'planned') {
      return {
        ...state,
        plannedEvents: updatedEvents,
      }
    } else if (action.payload.eventType === 'tracked') {
      return {
        ...state,
        trackedEvents: updatedEvents,
      }
    }

  } else if (action.type === 'EDITEVENTTIME') {
    // find the event that matches the id

    let events = [];
    if (action.payload.eventType === 'planned') {
      events = state.plannedEvents.slice()
    } else if (action.payload.eventType === 'tracked') {
      events = state.trackedEvents.slice()
    }

    const updatedEvents = events.map(event => {
      if (event.id === action.payload.event.id) {
        return {
          ...event,
          start: action.payload.event.start,
          end: action.payload.event.end,
        }
      }
      return {
        ...event
      };
    })

    if (action.payload.eventType === 'planned') {
      return {
        ...state,
        plannedEvents: updatedEvents,
      }
    } else if (action.payload.eventType === 'tracked') {
      return {
        ...state,
        trackedEvents: updatedEvents,
      }
    }
  } 
=======
  switch (action.type) {
    case 'UPDATE_DISPLAY_DATE':
      // update display date
      return {
        ...state,
        date: action.payload.date
      }

    case 'CREATE_EVENT':
      let newEvents = state[action.payload.calType].slice()
      newEvents = [...newEvents, action.payload.event]
      // create an event
      return {
        ...state,
        [action.payload.calType]: newEvents,
      }
    case 'UPDATE_EVENT':
      // handle time updates and name updates
      let updatedEvents = state[action.payload.calType].map(calEvent => {
        if (calEvent.id === action.payload.event.id) {
          calEvent.title = action.payload.event.title;
          calEvent.start = action.payload.event.start;
          calEvent.end = action.payload.event.end;
        }
        return calEvent;
      })
      return {
        ...state,
        [action.payload.calType]: updatedEvents,
      }

      case 'DELETE_EVENT':
        // delete an event by an event.id
        // return events that do not match the event.id
        let modifiedEvents = state[action.payload.calType].filter(calEvent =>
          calEvent.id !== action.payload.event.id)
        return {
          ...state,
          [action.payload.calType]: modifiedEvents,
        }  

      case 'IMPORT_DATA':
        // import the data that was read from the file
        // add the events to the current events, don't overwrite
        // check each element in the state, if the added events are 
        // not in that array, then add them, with a 'push' method
        let updatedPlanningEvents = state.planning.map(event => event);
        let planningEventIds = state.planning.map(event => event.id)
        action.payload.planning.forEach(event => {
          if (planningEventIds.indexOf(event.id) === -1){
            updatedPlanningEvents.push(event);
          }
        })

        let updatedTrackingEvents = state.tracking.map(event => event);
        let trackingEventIds = state.tracking.map(event => event.id)
        action.payload.tracking.forEach(event => {
          if (trackingEventIds.indexOf(event.id) === -1){
            updatedTrackingEvents.push(event);
          }
        })
>>>>>>> devel

        // set the date and update the planning and tracking lists with the merged lists
        return {
          planning: updatedPlanningEvents,
          tracking: updatedTrackingEvents,
          date: action.payload.date,
        }

    default:
      return state;
  }
}

export default reducer;