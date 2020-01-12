import React from 'react';
//import { DateTime } from 'luxon';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import "../../../node_modules/react-datepicker/dist/react-datepicker.css";

import { Form, Field } from 'react-final-form';

const TodoList = () => {
  // get state values from redux
  const { todoItems } = useSelector(state => state)
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
      <h1>To Do List</h1>
        {todoItems.map(todoItem => <h2>{todoItem.name}</h2>)}
    </React.Fragment>
    
  const onSubmit = (event) => {
    dispatch({ type: 'ADDTODO', payload: { name: event.target.value }})
  }

  return (
    <React.Fragment>
    {tableContent}
    <Form 
      onSubmit={onSubmit}
      initialValues={{ stooge: 'larry', employed: false }}
      render={({ handleSubmit, form, submitting, pristine, values }) => (
        <form onSubmit={handleSubmit}>
          <div>
            <label>Add Todo Item: </label>
            <Field 
              name="todoItem" 
              component="input"
              type="text" 
              placeholder="Todo Item" 
            />
          </div>
        </form>
      )}
    />
    </React.Fragment>
  );
};

export default TodoList;