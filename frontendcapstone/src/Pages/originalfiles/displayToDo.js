import React, { useState, useEffect } from 'react';

function DisplayToDo() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await fetch('http://localhost:8083/api/users');
        console.log(response);
        console.log(response.json());
        const data = await response.json();
        
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    }
    fetchUsers();
  }, []);

  const handleUserChange = async (event) => {
    const userId = event.target.value;
    setSelectedUser(userId);

    try {
      const response = await fetch(`http://localhost:8083/api/todos/byuser/${userId}`);
      const data = await response.json();
      setTodos(data);
    } catch (error) {
      console.error(`Error fetching ToDos for user ${userId}:`, error);
    }
  };

  return (
    <div>
      <h1>View ToDos</h1>
      <select value={selectedUser} onChange={handleUserChange}>
        <option value="">Select a user</option>
        {users.map(user => (
          <option key={user.id} value={user.id}>{user.name}</option>
        ))}
      </select>

      <h2>ToDos for selected user:</h2>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            <strong>Category:</strong> {todo.category}<br />
            <strong>Description:</strong> {todo.description}<br />
            <strong>Deadline:</strong> {todo.deadline}<br />
            <strong>Priority:</strong> {todo.priority}<br />
            <strong>Completed:</strong> {todo.completed ? 'Yes' : 'No'}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DisplayToDo;
