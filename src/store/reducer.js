const initialState = {
  timeData: [],
  timeView: 'unit',
  date: new Date().toISOString().slice(0,10),
  todoItems: [],
  completeItems: [],
  notes: '',
  plannedEvents: [],
  trackedEvents: [],
}

const reducer = (state = initialState, action) => {
  console.log(initialState.date);
  if (action.type === 'VIEWCHANGE') {
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
    console.log(action.payload.date)
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
  } else if (action.type === 'ADDPLANNEDEVENT') {
    let newPlannedEvents = state.plannedEvents.slice()
    newPlannedEvents = [...newPlannedEvents, action.payload.event]
    return {
      ...state,
      plannedEvents: newPlannedEvents,
    }
  } else if (action.type === 'ADDTRACKEDEVENT') {
    let newTrackedEvents = state.trackedEvents.slice()
    newTrackedEvents = [...newTrackedEvents, action.payload.event]
    return {
      ...state,
      trackedEvents: newTrackedEvents,
    }
  } else if (action.type === 'SETTRACKEDEVENTNAME') {
    // need to update to update the name supplied
    let newTrackedEvents = state.trackedEvents.slice()
    newTrackedEvents = [...newTrackedEvents, action.payload.event]
    return {
      ...state,
      trackedEvents: newTrackedEvents,
    }
  } else if (action.type === 'SETPLANNEDEVENTNAME') {
    // need to update to update the name supplied
    let newPlannedEvents = state.plannedEvents.slice()
    newPlannedEvents = [...newPlannedEvents, action.payload.event]
    return {
      ...state,
      plannedEvents: newPlannedEvents,
    }
  }




  return state;
}

export default reducer;