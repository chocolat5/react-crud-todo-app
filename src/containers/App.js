import React, { useState, useEffect } from 'react'

import styles from './App.scss'

const App = () => {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem('todos')
    if (savedTodos) {
      return JSON.parse(savedTodos)
    } else {
      return []
    }
  })
  const [todoValue, setTodoValue] = useState('')
  const [isEditing, setIsEditing] = useState(false)
  const [currentTodo, setCurrentTodo] = useState({})
 
  const handleChange = (event) => {
    setTodoValue(event.target.value)
  }
  
  const handleSubmit = (event) => {
    event.preventDefault()
    if(todoValue === undefined || todoValue === '' || todoValue.trim() === '') {
      alert('Please enter proper value.')
    } else {
      const todo = {
        value: todoValue.trim(),
        done: false,
        id: todos.length + 1,
      }
      
      setTodos([...todos, todo])
      setTodoValue('')
    }
  }
  
  const handleDelete = (id) => {
    const newTodos = todos.filter(todo => {
      return todo.id !== id
    })
    setTodos(newTodos)
  }

  const handleEdit = (todo) => {
    setCurrentTodo({...todo})
    setIsEditing(true)
  }

  const handleEditChange = (event) => {
    setCurrentTodo({ ...currentTodo, value: event.target.value })
  }

  const handleUpdateTodo = (id, updatedTodo) => {
    const updateItem = todos.map(todo => {
      return todo.id === id ? updatedTodo : todo
    })
    setIsEditing(false)
    setTodos(updateItem)
  }

  const handleEditSubmit = (event) => {
    event.preventDefault()
    handleUpdateTodo(currentTodo.id, currentTodo)
  }

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  return (
    <div className="app">
      <header className="header">
        <h1>React CRUD Todo App</h1>
      </header>
      <main className="main">
        <div className="container">
          {isEditing ? (
            <form
              className="form"
              onSubmit={handleEditSubmit}>
              <label>Edit todo: </label>
              <input
                name="todo"
                type="text"
                id="todoValue"
                value={currentTodo.value}
                onChange={handleEditChange}/>
              <button type="submit">Update</button>
            </form>
          ): (
            <form
              className="form"
              onSubmit={handleSubmit}>
              <input
                name="todo"
                placeholder="Create a new todo"
                type="text"
                id="todoValue"
                value={todoValue}
                onChange={handleChange}/>
              <button type="submit">Add Todo</button>
            </form>
          )}
          <div className="todo__wrap">
            <ul>
              {todos && todos.map((todo, i) => {
                return (
                  <li key={todo.id} className="todo__item">
                    <button className="todo__name">
                      {todo.value}
                    </button>
                    <button
                      onClick={() => handleEdit(todo)}
                      className="todo__btn todo__edit">
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(todo.id)}
                      className="todo__btn todo__delete">
                      Delete
                    </button>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </main>
    </div>
  )
}

export default App
