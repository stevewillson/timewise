const initialState = {
  date: new Date().toISOString().slice(0,10),
  planning: [],
  tracking: [],
}

const reducer = (state = initialState, action) => {
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