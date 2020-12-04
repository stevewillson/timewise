

const initialState = {
  date: new Date().toISOString().slice(0,10),
  startTime: '06:00:00',
  endTime: '21:00:00',
  planning: [],
  tracking: [],
  categories: [],
  displayCategories: true,
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_DISPLAY_DATE':
      // update display date
      return {
        ...state,
        date: action.payload.date
      }

    case 'UPDATE_START_TIME':
      // update start time
      return {
        ...state,
        startTime: action.payload.startTime
      }

    case 'UPDATE_END_TIME':
      // update end time
      return {
        ...state,
        endTime: action.payload.endTime
      }

    case 'CREATE_EVENT':
      // when attempting to add an event, check to see if the event id
      // already exists, if it does, then do not add the event
      let eventIds = state[action.payload.calType].map(event => event.id)
      let newEvents = state[action.payload.calType].slice()
      // create an event
      if (eventIds.indexOf(action.payload.event.id) === -1 ) {
        newEvents = [...newEvents, 
          {
            title: action.payload.event.title,
            start: action.payload.event.start,
            end: action.payload.event.end,
            id: action.payload.event.id,
            color: action.payload.event.color || '',
            extendedProps: {
              calType: action.payload.event.extendedProps.calType,
              category: action.payload.event.extendedProps.category
            }
          }
        ]
      }
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
          calEvent.color = action.payload.event.color || '';
          calEvent.extendedProps.calType = action.payload.event.extendedProps.calType;
          calEvent.extendedProps.category = action.payload.event.extendedProps.category;

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

      case 'CREATE_CATEGORY':
        // do not allow categories of the same name
        let categoryNames = state.categories.map(category => category.name)
        let newCategories = state.categories.slice()
        if (categoryNames.indexOf(action.payload.name) === -1) {
          newCategories = [...state.categories,
            {
              name: action.payload.name,
              id: action.payload.id,
              color: action.payload.color,
            }
          ]
        }
          
        return {
          ...state,
          categories: newCategories
        } 

      case 'UPDATE_CATEGORY':
        // handle time updates and name updates
        let updatedCategories = state.categories.map(category => {
          if (category.id === action.payload.id) {
            category.name = action.payload.name || category.name;
            category.color = action.payload.color || category.color;
          }
          return category;
        })
        return {
          ...state,
          categories: updatedCategories
        }

      case 'DELETE_CATEGORY':
        // delete a category by a category id
        let modifiedCategories = state.categories.filter(category =>
          category.id !== action.payload.id)
        return {
          ...state,
          categories: modifiedCategories
        }
      
      case 'SET_DISPLAY_CATEGORIES':
        return {
          ...state,
          displayCategories: action.payload.displayCategories,
        }

      case 'RESET_TRACKER':
        if (action.payload.resetType === 'yes') {
          return initialState;
        }
        return state;

    default:
      return state;
  }
}

export default reducer;