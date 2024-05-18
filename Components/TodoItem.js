import React from 'react';

function TodoItem({ todo, toggleComplete, removeTodo }) {
  return (
    <div className={`singleTodoItem ${todo.completed ? 'completed' : ''}`}>
      <span>{todo.text}</span>
      <div>
        <button className="markCompleteTodoItem" onClick={toggleComplete}>
          {todo.completed ? "Undo" : "Complete"}
        </button>
        <button className="removeTodoItem" onClick={removeTodo}>X</button>
      </div>
    </div>
  );
}

export default TodoItem;
