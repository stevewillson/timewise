import React from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import "../../../node_modules/react-datepicker/dist/react-datepicker.css";
//import { Form, Field } from 'react-final-form';

const TodoList = () => {
  // get state values from redux
  const { todoItems, completeItems } = useSelector(state => state)
  const dispatch = useDispatch();

  const remItem = remIndex => {
    dispatch({ type: 'REMOVETODO', payload: { remIndex: remIndex }})
  }

  const remCompleteItem = remIndex => {
    dispatch({ type: 'REMOVECOMPLETETODO', payload: { remIndex: remIndex }})
  }

  const completeItem = completeIndex => {
    dispatch({ type: 'COMPLETETODO', payload: { completeIndex: completeIndex }})
    dispatch({ type: 'REMOVETODO', payload: { remIndex: completeIndex }})
  }
    
  const onSubmit = values => {
    dispatch({ type: 'ADDTODO', payload: { name: values.todoItem }})
  }

  return (
    <React.Fragment>
    <h1>To Do List</h1>
      {todoItems.map((todoItem, todoIndex) => 
        <h3>
          <button onClick={() => completeItem(todoIndex)}>DONE</button>
            {' '}{todoItem.name}{' '}
          <button onClick={() => remItem(todoIndex)}>DELETE</button>
        </h3>
      )}
    
    <h3>Completed Items:</h3> 
    {completeItems.map((completeItem, completeItemIndex) => 
      <h3>
        {completeItem.name}{' '}
        <button onClick={() => remCompleteItem(completeItemIndex)}>DELETE</button>
      </h3>
    )}
    </React.Fragment>
  );
};

/*
<Form 
      onSubmit={onSubmit}
      initialValues={{}}
      render={({ handleSubmit, form, submitting, pristine, values }) => (
        <form onSubmit={async event => { 
          await handleSubmit(event)
          form.reset()
        }}>
          <div>
            <label>Add Todo Item: </label>
            <Field 
              name="todoItem" 
              component="input"
              type="text" 
              placeholder="Todo Item" 
            />
          </div>
          <div className="buttons">
            <button 
              type="submit"
              disabled={submitting || pristine}
            >
              Add Todo
            </button>
            <button
              type="button"
              onClick={form.reset}
              disabled={submitting || pristine}
            >
              Clear
            </button>
          </div>
        </form>
      )}
    />
*/

export default TodoList;