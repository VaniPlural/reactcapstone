import React, { useState, useEffect } from 'react';
import styles from '../Components/css/displayToDo.module.css';

function DisplayToDo() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [todos, setTodos] = useState([]);
  const [todoList,setTodoList]=useState([]);

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
    console.log(userId);
    setSelectedUser(userId);

    try {
      const response = await fetch(`http://localhost:8083/api/todos/byuser/${userId}`);
      const data = await response.json();
      console.log(data);
      setTodos(data);
    } catch (error) {
      console.error(`Error fetching ToDos for user ${userId}:`, error);
    }
  };
  const updateDetails=(event)=>{
    console.log("inside updateDetails");
  }
   
     
  return (
    <div >
      <h1 className={styles.header}>View ToDos</h1>
      <div className={styles.dropDown}>
      <select className={styles.dropDownSelect}  value={selectedUser} onChange={handleUserChange}>
        <option value="">Select a user</option>
        {users.map(user => (
          <option key={user.id} value={user.id}>{user.name}</option>
        ))}
      </select>
      </div>
      <h2 className={styles.headerToDo}>ToDos for selected user:</h2>
      <table className={styles.tableDisplay}>
      <td ><ul >
        {todos.map(todo => (
          <li key={todo.id}>
            <strong>Category:</strong> {todo.category}<br />
            <strong>Description:</strong> {todo.description}<br />
            <strong>Deadline:</strong> {todo.deadline}<br />
            <strong>Priority:</strong> {todo.priority}<br />
            <strong>Completed:</strong> {todo.completed ? 'Yes' : 'No'}<br />
           <button type="submit" onClick={updateDetails}>details</button>
          </li>
        ))}
      </ul></td>
     </table>
    </div>
  );
}

export default DisplayToDo;
