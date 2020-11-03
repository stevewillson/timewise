import React from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import "../../../node_modules/react-datepicker/dist/react-datepicker.css";

import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'
import interaction from '@fullcalendar/interaction'
import '../../assets/main.scss' // webpack must be configured to do this
import uuid from 'uuid';
import { DateTime } from 'luxon';

const PlannedTime = () => {
  // get state values from redux
  const { plannedEvents } = useSelector(state => state)
  const dispatch = useDispatch();

  const eventType = 'planned';

  const addEventSelected = (info) => {
    //console.log('EVENT SELECT TIME')
    //console.log(info)
    const start = new DateTime.fromISO(info.startStr)
    const end = new DateTime.fromISO(info.endStr)
    const eventName = prompt("Set the title")
    if (eventName !== '' && eventName !== null) {
      dispatch({ 
        type: 'ADDEVENT', 
        payload: {
          eventType: eventType,
          event: {
            title: eventName,
            start: start.toISO(),
            end: end.toISO(),
            id: uuid.v4(),
          },
        },
      });
    };
  };

  const eventClick = (info) => {
    //console.log('EVENT CLICK')
    const eventName = prompt("Set the title")
    if (eventName !== '' && eventName !== null) {
      dispatch({ 
        type: 'EDITEVENTNAME', 
        payload: {
          eventType: eventType,
          event: {
            title: eventName,
            id: info.event.id,
          },
        },
      });
    };
  };

  const eventResizeOrDrop = (info) => {
    //console.log('EVENT RESIZE OR DROP')
    //console.log(info)
    const start = new DateTime.fromISO(info.event.start.toISOString());
    const end = new DateTime.fromISO(info.event.end.toISOString());
    // this will explicitly set the event end time
    dispatch({ 
      type: 'EDITEVENTTIME', 
      payload: {
        eventType: eventType,
        event: {
          start: start.toISO(),
          end: end.toISO(),
          id: info.event.id,
        },
      },
    });
  };

  return (
    <React.Fragment>
      <FullCalendar 
        defaultView='timeGridDay'
        header={{
          left: '',
          center: 'title',
          right: 'today prev,next',
        }}
        titleFormat={() => 'Planned Time'}
        height={'auto'}
        allDaySlot={false}
        nowIndicator={true}
        timeZone={'local'}
        plugins={[ interaction, timeGridPlugin ]} 
        minTime={'04:00:00'}
        maxTime={'21:00:00'}
        columnHeaderFormat={{
          weekday: 'long',
          month: 'numeric',
          day: 'numeric',
          omitCommas: true,
        }}
        selectable={true}
        slotDuration={{ minutes: 15 }}
        slotLabelInterval={{ hours: 1 }}
        slotLabelFormat={() => ''}
        editable={true}
        events={plannedEvents}
        eventClick={eventClick}
        eventResize={eventResizeOrDrop}
        eventDrop={eventResizeOrDrop}
        select={addEventSelected}        
      />
    </React.Fragment>
  );
};

export default PlannedTime;