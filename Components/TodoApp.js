import React, { useState, useEffect } from "react";
import TodoItem from "./TodoItem";
import TodoForm from "./TodoForm";

function TodoApp() {
  const [todos, setTodos] = useState(() => {
    // Load todos from local storage if available
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : [];
  });
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Save todos to local storage
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (text) => {
    const newTodo = { id: Date.now(), text, completed: false };
    setTodos([...todos, newTodo]);
  };

  const toggleComplete = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const removeTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'completed') return todo.completed;
    if (filter === 'incomplete') return !todo.completed;
    return true;
  }).filter(todo => todo.text.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="app">
      <header>
        <h1>Todo List</h1>
      </header>
      <input
        type="text"
        className="search-bar"
        placeholder="Search todos..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="filters">
        <button className="filter-button" onClick={() => setFilter('all')}>All</button>
        <button className="filter-button" onClick={() => setFilter('completed')}>Completed</button>
        <button className="filter-button" onClick={() => setFilter('incomplete')}>Incomplete</button>
      </div>
      <div className="todo-list">
        {filteredTodos.map(todo => (
          <TodoItem 
            key={todo.id}
            todo={todo}
            toggleComplete={() => toggleComplete(todo.id)}
            removeTodo={() => removeTodo(todo.id)}
          />
        ))}
        <TodoForm addTodo={addTodo} />
      </div>
    </div>
  );
}

export default TodoApp;
