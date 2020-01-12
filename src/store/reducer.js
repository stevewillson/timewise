const initialState = {
  timeData: [],
  timeView: 'unit',
  date: new Date(),
  todoItems: [],
  completeItems: [],
  notes: ''
}

const reducer = (state = initialState, action) => {
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
  }
  return state;
}

export default reducer;