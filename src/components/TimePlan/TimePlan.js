import React from 'react';
//import { DateTime } from 'luxon';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import "../../../node_modules/react-datepicker/dist/react-datepicker.css";

import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'
import interaction from '@fullcalendar/interaction'
import '../../assets/main.scss' // webpack must be configured to do this
import uuid from 'uuid';

const TimePlan = () => {
  // get state values from redux
  const { plannedEvents } = useSelector(state => state)
  const dispatch = useDispatch();

  const eventClick = (info) => {
    //console.log('EVENT CLICK')
    const eventName = prompt("Set the title")
    if (eventName !== '') {
      dispatch({ 
        type: 'SETPLANNEDEVENTNAME', 
        payload: {
          event: {
            title: eventName,
            start: info.dateStr,
            id: info.event.id,
          },
        },
      })  
    }
  }

  const eventResize = (info) => {
    console.log(info)
    dispatch({ 
      type: 'EDITPLANNEDEVENT', 
      payload: {
        event: {
          start: info.event.start,
          end: info.event.end,
          id: info.event.id,
        },
      },
    })
    //console.log('EVENT RESIZE')
    //console.log(info)
  }

  const eventDrop = (info) => {
    // need to update the time of the event when dropped
    console.log('EVENT DROP')
    console.log(info)
  }

  const dateClick = (info) => {
    //console.log('DATE CLICK')
    const eventName = prompt("Set the title")
    if (eventName !== '') {
      dispatch({ 
        type: 'ADDPLANNEDEVENT', 
        payload: {
          event: {
            title: eventName,
            start: info.dateStr,
            id: uuid.v4(),
          },
        },
      })
    }
  }

  return (
    <React.Fragment>
      <h1>Planned Time</h1>
      <FullCalendar 
        defaultView='timeGridDay'
        header={{
          left: '',
          center: 'title',
          right: 'prev,next',
        }}
        plugins={[ interaction, timeGridPlugin ]} 
        minTime={'04:00:00'}
        maxTime={'21:00:00'}
        slotDuration={{ minutes: 15 }}
        slotLabelInterval={{ hours: 1 }}
        editable={true}
        events={plannedEvents}
        eventClick={eventClick}
        eventResize={eventResize}
        eventDrop={eventDrop}
        timeZone={'UTC'}
        dateClick={dateClick}
      />
    </React.Fragment>
  );
};

export default TimePlan;