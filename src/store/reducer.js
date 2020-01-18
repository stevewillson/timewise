const initialState = {
  timeData: [],
  timeView: 'unit',
  date: new Date(),
  todoItems: [],
  completeItems: [],
  notes: '',
  plannedEvents: [],
  trackedEvents: [],
}

const reducer = (state = initialState, action) => {

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

  return state;
}

export default reducer;