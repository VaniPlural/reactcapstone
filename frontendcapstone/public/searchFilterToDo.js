import React, { useState,useEffect } from 'react';
//import React, { useState, useEffect } from 'react';

function seachFilterToDo() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [todos, setTodos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');
  const [completionFilter, setCompletionFilter] = useState('');

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await fetch('http://localhost:8083/api/users');
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

  const filteredTodos = todos.filter(todo => {
    return (
      todo.description.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (!categoryFilter || todo.category === categoryFilter) &&
      (!priorityFilter || todo.priority === priorityFilter) &&
      (!completionFilter || todo.completed === (completionFilter === 'completed'))
    );
  });

  return (
    <div>
      <h1>View ToDos</h1>
      <select value={selectedUser} onChange={handleUserChange}>
        <option value="">Select a user</option>
        {users.map(user => (
          <option key={user.id} value={user.id}>{user.name}</option>
        ))}
      </select>

      <input
        type="text"
        placeholder="Search tasks"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
        <option value="">Filter by Category</option>
        <option value="Work">Work</option>
        <option value="Personal">Personal</option>
        <option value="Errands">Errands</option>
      </select>

      <select value={priorityFilter} onChange={(e) => setPriorityFilter(e.target.value)}>
        <option value="">Sort by Priority</option>
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>

      <select value={completionFilter} onChange={(e) => setCompletionFilter(e.target.value)}>
        <option value="">Filter by Completion Status</option>
        <option value="completed">Completed</option>
        <option value="pending">Pending</option>
      </select>

      <h2>ToDos for selected user:</h2>
      <ul>
        {filteredTodos.map(todo => (
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

export default seachFilterToDo;
