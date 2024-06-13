import React, { useState, useEffect } from 'react';

function ViewToDo() {
  const [todo, setTodo] = useState(null);

  useEffect(() => {
    // Fetch todo details based on some ID
    async function fetchTodo() {
      try {
        const response = await fetch('http://localhost:8083/api/${todoId}');
        const data = await response.json();
        setTodo(data);
      } catch (error) {
        console.error('Error fetching todo:', error);
      }
    }
    fetchTodo();
  }, []);

  return (
    <div>
      <h1>ToDo Details</h1>
      {todo && (
        <div>
          <p><strong>Category:</strong> {todo.category}</p>
          <p><strong>Description:</strong> {todo.description}</p>
          <p><strong>Deadline:</strong> {todo.deadline}</p>
          <p><strong>Priority:</strong> {todo.priority}</p>
          <p><strong>Completed:</strong> {todo.completed ? 'Yes' : 'No'}</p>
        </div>
      )}
    </div>
  );
}

export default ViewToDo;
