import React from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

import { DateTime } from 'luxon';
import { v4 as uuidv4 } from 'uuid';

import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'
import interaction from '@fullcalendar/interaction'

const TimeGrid = (props) => {
  // get state values from redux
  const { date } = useSelector(state => state)
  const calEvents = useSelector(state => state[props.calType])
  const dispatch = useDispatch();
  var calType = props.calType;
  var slotLabel = props.slotLabel;
  
  const eventClick = (info) => {
    //console.log('EVENT CLICK')
    // prompt for a new name and set the name
    const eventName = prompt("Set the title")
    if (eventName !== '' && eventName !== null) {
      dispatch({ 
        type: 'UPDATE_EVENT', 
        payload: {
          calType: calType,
          event: {
            title: eventName,
            start: info.event.start,
            end: info.event.end,
            id: info.event.id,
          },
        },
      })
      // 'dispatch' updates in the redux store, also update on the calendar directly
      info.event.setProp('title', eventName)
    }
  }

  const eventResize = (info) => {
    //console.log('EVENT RESIZE')
    dispatch({ 
      type: 'UPDATE_EVENT', 
      payload: {
        calType: calType,
        event: {
          title: info.event.title,
          start: info.event.start,
          end: info.event.end,
          id: info.event.id,
        },
      },
    })
  }

  const checkEventDeleted = (info) => {
    //console.log('EVENT DRAG STOP')
    // check to see if the event is dropped outside of the calendar area
    // if so, then delete the event

    let calElement = document.getElementById(calType);
    let rect = calElement.getBoundingClientRect();

    let x1 = rect.x;
    let x2 = rect.x + rect.width;
    let y1 = rect.y;
    let y2 = rect.y + rect.height;

    // if the event is dropped inside the calendar, update the evnt
    if (info.jsEvent.pageX >= x1 && info.jsEvent.pageX <= x2 &&
      info.jsEvent.pageY >= y1 && info.jsEvent.pageY <= y2) {
        //console.log('Event not dropped outside of calendar, updating')
    } else {
      //console.log('Event dropped outside of calendar, deleting')
      dispatch({ 
        type: 'DELETE_EVENT', 
        payload: {
          calType: calType,
          event: {
            id: info.event.id,
          },
        },
      })
    }
  }

  const eventDrop = (info) => {
    //console.log('EVENT DROP')
    // checkEventDeletd eventDragStop checks to see if the event is dropped outside of the calendar area
    // if so, then delete the event
    //console.log('Event dropped inside of calendar, updating')
    dispatch({ 
      type: 'UPDATE_EVENT', 
      payload: {
        calType: calType,
        event: {
          title: info.event.title,
          start: info.event.start,
          end: info.event.end,
          id: info.event.id,
        },
      },
    })
  }

  // When a date is selected, create an event at that time
  const dateSelect = (info) => {
    //console.log('DATE SELECT')
    const start = new DateTime.fromISO(info.startStr)
    const end = new DateTime.fromISO(info.endStr)
    const eventName = prompt("Set the title")
    if (eventName !== '' && eventName !== null) {
      dispatch({ 
        type: 'CREATE_EVENT', 
        payload: {
          calType: calType,
          event: {
            title: eventName,
            start: start.toJSDate(),
            end: end.toJSDate(),
            id: uuidv4(),
          },
        },
      })
    }
  }

  const slotLabelDisplay = (date) => {
    // if the slotLabel is 'false' then do not display the label
    // if it is true, display the 24 hour time
    if (!slotLabel) {
      return '';
    } else {
      return date.start.marker.toISOString().substring(11,16).replace(":","");
    }
  }

  return (
    <React.Fragment>
      <div id={calType}>
        <h1>{props.calType}</h1>
        <FullCalendar 
          initialView='timeGrid'
          visibleRange={{
            start: date,
            end: date
          }}
          headerToolbar={false}
          plugins={[ interaction, timeGridPlugin ]} 
          slotMinTime={'04:00:00'}
          slotMaxTime={'21:00:00'}
          timeZone={'local'}
          slotDuration={{ minutes: 15 }}
          slotLabelInterval={{ hours: 1 }}
          slotLabelFormat={(slotLabel) => slotLabelDisplay(slotLabel)}
          editable={true}
          selectable={true}
          events={calEvents}
          eventClick={eventClick}
          eventResize={eventResize}
          eventDrop={eventDrop}
          select={dateSelect}
          allDaySlot={false}
          contentHeight={'auto'}
          // used to detect events dragged off the calendar to delete
          eventDragStop={checkEventDeleted}
          // when dragging an event off of the calendar, don't show the snapback behavior
          // keep at at least '1', if set to '0' the calendar stops responding after a eventDragStop or eventDrop...
          dragRevertDuration={'1'}
        />
      </div>
    </React.Fragment>
  );
};

export default TimeGrid;