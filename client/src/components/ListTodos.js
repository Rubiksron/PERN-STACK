import React, { Fragment, useEffect, useState } from 'react'
import EditTodo from './EditTodo'

const ListTodos = () => {
  //setting the state object [] with the api results
  const [todos, setTodos] = useState([])

  //delete todo function
  const deleteTodo = async (id) => {
    try {
      const deleteTodo = await fetch(`http://localhost:5000/todos/${id}`, {
        method: 'DELETE'
      });

      setTodos(todos.filter(todo => todo.todo_id !== id));
      console.log(deleteTodo)
    } catch (err) {
      console.error(err.message);
    }
  }

  const getTodos = async () => {
    try {
      //we want to await because this call will take a 'moment'
      const response = await fetch("http://localhost:5000/todos");
      const jsonData = await response.json();

      setTodos(jsonData);
      console.log('jsonData: ', jsonData);
    } catch (err) {
      console.error(err.message);
    }
  }
  //use effect will make a fetch each time the component is rendered, calling the above function, the empty array makes sure it only does so once
  useEffect(() => {
    getTodos();
  }, [])
  return (

    <Fragment>
      <table className="table mt-5 text-center">
        <thead>
          <tr>
            <th>Description</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {todos.map(todo => (
            <tr key={todo.todo_id}>
              <td>{todo.description}</td>
              <td>
                <EditTodo todo={todo} />
              </td>
              <td>
                <button className="btn btn-danger" onClick={() => deleteTodo(todo.todo_id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Fragment>)
}

export default ListTodos;