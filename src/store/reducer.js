const initialState = {
  timeData: [],
  timeView: 'unit',
  date: new Date()
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
  }

  return state;
}

export default reducer;