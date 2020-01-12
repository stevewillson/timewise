import React from 'react';
//import { DateTime } from 'luxon';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

const NotesList = () => {
  // get state values from redux
  const { date } = useSelector(state => state)
  const dispatch = useDispatch();

  const btnStyle = {
    backgroundColor: '#707070',
    color: 'white',
    border: 'none',
    borderRadius: '12px',
    cursor: 'pointer',
    margin: '6px',
    textAlign: 'center',
    fontSize: '16px',
  }

  const tableContent =
    <React.Fragment>
      <h1>Notes</h1>

    </React.Fragment>

  return (
    <React.Fragment>
    {tableContent}
    </React.Fragment>
  );
};

export default NotesList;