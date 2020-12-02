import React from 'react';
import { useSelector } from 'react-redux';

import { v4 as uuidv4 } from 'uuid';

import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'
import interaction from '@fullcalendar/interaction'

import { createEvent, updateEvent, deleteEvent } from './actions';

const TimeGrid = (props) => {
  // get state values from redux
  const { date, startTime, endTime } = useSelector(state => state)
  const calEvents = useSelector(state => state[props.calType])
  var calType = props.calType;
  var slotLabel = props.slotLabel;

  
  const eventClick = (info) => {
    // prompt for a new title and set the title
    let title = prompt('Please enter a new title for your event')
    if (title) {
      // update on the calendar directly, this will trigger eventUpdate
      info.event.setProp('title', title)
    }
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
      info.event.remove()
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

  const handleDateSelect = (selectInfo) => {
    let calendarApi = selectInfo.view.calendar
    let title = prompt('Please enter a new title for your event')

    calendarApi.unselect() // clear date selection

    if (title) {
      calendarApi.addEvent({ // will render immediately. will call handleEventAdd
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
        id: uuidv4(),
        extendedProps: { calType: calType }
      }, true) // temporary=true, will get overwritten when reducer gives new events
    }
  };

  const handleEventAdd = (addInfo) => {
    // use this to call the create event function in the 'actions'
    createEvent(addInfo.event);
  }

  const handleEventChange = (changeInfo) => {
    // use this to call the create event function in the 'actions'
    updateEvent(changeInfo.event);
  }

  const handleEventRemove = (removeInfo) => {
    // use this to call the create event function in the 'actions'
    deleteEvent(removeInfo.event)
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
          slotMinTime={startTime}
          slotMaxTime={endTime}
          timeZone={'local'}
          slotDuration={{ minutes: 15 }}
          slotLabelInterval={{ hours: 1 }}
          slotLabelFormat={(slotLabel) => slotLabelDisplay(slotLabel)}
          editable={true}
          selectable={true}
          events={calEvents}
          eventClick={eventClick}
          //eventResize={eventResize}
          //eventDrop={eventDrop}
          select={handleDateSelect}
          allDaySlot={false}
          contentHeight={'auto'}
          // used to detect events dragged off the calendar to delete
          eventDragStop={checkEventDeleted}
          // when dragging an event off of the calendar, don't show the snapback behavior
          // keep at at least '1', if set to '0' the calendar stops responding after a eventDragStop or eventDrop...
          dragRevertDuration={'1'}
          eventAdd={handleEventAdd}
          eventChange={handleEventChange}
          eventRemove={handleEventRemove}
        />
      </div>
    </React.Fragment>
  );
};

export default TimeGrid;