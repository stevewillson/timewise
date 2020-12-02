// allow the calendar to abstract the backend for future extension
// put the 'dispatch' actions here, add backend 'requests' in future
// import { requestEventsInRange, requestEventCreate, requestEventUpdate, requestEventDelete } from './requests'

import { store } from '../../configureStore';

export const createEvent = (plainEventObject) => {
  store.dispatch({ 
    type: 'CREATE_EVENT', 
    payload: {
      calType: plainEventObject.extendedProps.calType,
      event: {
        title: plainEventObject.title,
        start: plainEventObject.start.toISOString(),
        end: plainEventObject.end.toISOString(),
        id: plainEventObject.id,
        extendedProps: { calType: plainEventObject.extendedProps.calType }
      },
    },
  })
}

export const updateEvent = (plainEventObject) => {
  store.dispatch({ 
    type: 'UPDATE_EVENT', 
    payload: {
      calType: plainEventObject.extendedProps.calType,
      event: {
        title: plainEventObject.title,
        start: plainEventObject.start.toISOString(),
        end: plainEventObject.end.toISOString(),
        id: plainEventObject.id,
        extendedProps: { calType: plainEventObject.extendedProps.calType }
      },
    },
  })
}

export const deleteEvent = (plainEventObject) => {
  store.dispatch({ 
    type: 'DELETE_EVENT', 
    payload: {
      calType: plainEventObject.extendedProps.calType,
      event: {
        id: plainEventObject.id,
      },
    },
  })
}