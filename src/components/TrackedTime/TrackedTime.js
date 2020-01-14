import React from 'react';
//import { DateTime } from 'luxon';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import "../../../node_modules/react-datepicker/dist/react-datepicker.css";

import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'
import interaction from '@fullcalendar/interaction'
import '../../assets/main.scss' // webpack must be configured to do this

const TrackedTime = () => {
  // get state values from redux
  const { trackedEvents } = useSelector(state => state)
  const dispatch = useDispatch();

  const eventClick = (info) => {
    console.log('EVENT CLICK')
    console.log(info)
    // get the event info, set the event info to be what is populated in a text box
  }

  const eventResize = (info) => {
    console.log('EVENT RESIZE')
    console.log(info)
  }

  const eventDrop = (info) => {
    console.log('EVENT DROP')
    console.log(info)
  }

  const dateClick = (info) => {
    console.log('DATE CLICK')
    console.log(info)
    dispatch({ 
      type: 'ADDTRACKEDEVENT', 
      payload: {
        event: { 
          title: 'testTitle',
          start: info.dateStr,
        },
      },
    })
  }

  return (
    <React.Fragment>
      <h1>Tracked Time</h1>
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
        events={trackedEvents}
        eventClick={eventClick}
        eventResize={eventResize}
        eventDrop={eventDrop}
        timeZone={'UTC'}
        dateClick={dateClick}
      />
    </React.Fragment>
  );
};

export default TrackedTime;