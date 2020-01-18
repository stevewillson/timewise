import React from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { Form, Field } from 'react-final-form';

const NotesList = () => {
  // get state values from redux
  const { notes } = useSelector(state => state)
  const dispatch = useDispatch();

  const onSubmit = values => {
    dispatch({ type: 'SETNOTES', payload: { notes: values.notes }})
  }

  return (
    <React.Fragment>
    <h1>Notes</h1>
    <Form 
      onSubmit={onSubmit}
      initialValues={{ notes: notes }}
      render={({ handleSubmit, form, submitting, pristine, values }) => (
        <form onSubmit={async event => { 
          await handleSubmit(event)
        }}>
          <div>
            <Field 
              name="notes" 
              component="textarea"
            />
          </div>
          <div className="buttons">
            <button 
              type="submit"
              disabled={submitting || pristine}
            >
              Save Notes
            </button>
          </div>
        </form>
      )}
    />
    </React.Fragment>
  );
};

export default NotesList;