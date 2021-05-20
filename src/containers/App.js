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
  
  const handleDone = (event) => {
     const { id } = event.target.parentElement
     todos[id].done = !todos[id].done
     setTodos([...todos])
  }
  
  const handleDelete = (id) => {
    const newTodos = todos.filter(todo => {
      return todo.id !== id
    })
    setTodos(newTodos)
  }

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  return (
    <div className="app">
      <header className="header">
        <h1>Todo App</h1>
      </header>
      <main className="main">
        <div className="container">
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
          <div className="todo__wrap">
            <ul>
              {todos && todos.map((todo, i) => {
                return (
                  <li key={todo.id} className="todo__item">
                    <button
                      onClick={handleDone}
                      className={`todo__name ${todo.done ? '-done' : ''}`}>
                        {todo.value}
                    </button>
                    <button
                      onClick={() => handleDelete(todo.id)}
                      className="todo__delete">
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
