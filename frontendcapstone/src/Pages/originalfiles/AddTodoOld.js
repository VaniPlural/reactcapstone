import React, { useState, useEffect } from 'react';
import styles  from "../Components/css/addTodo.module.css";
function AddToDo() {
    const [tasks, setTasks] = useState([]);
    const [completedTasks, setCompletedTasks] = useState([]);
    const [task, setTask] = useState("");
    const [priority, setPriority] = useState("High");
    const [deadline, setDeadline] = useState("");
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState('');
    const [todos, setTodos] = useState([]);
    const [Categorylists, setCatg] = useState([]);
    const [selectedOption, setSelectedOption] = useState("");
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
      useEffect(() => {
        async function fetchCategory() {
          try {
            const response = await fetch(`http://localhost:8083/api/categories`);
            const data = await response.json();
            setCatg(data);
          } catch (error) {
            console.error('Error fetching Category:', error);
          }
        }
        fetchCategory();
      }, []);
      const handleCatgChange = async (e) => {
        setSelectedOption(e.target.value);
      };
    const handleTaskChange = (e) => {
        setTask(e.target.value);
    };
    const handlePriorityChange = (e) => {
        setPriority(e.target.value);
    };
    const handleDeadlineChange = (e) => {
        setDeadline(e.target.value);
    };
    const addTask = async (e) => {
          e.preventDefault();
        if (task.trim() === "" || deadline === "") {
            alert("Please enter a task and select a valid deadline.");
            return;
        }
        const selectedDate = new Date(deadline);
        const currentDate = new Date();
        if (selectedDate <= currentDate) {
            alert("Please select a future date for the deadline.");
            return;
        }
        const newTask = {
            id: "",
            userid : selectedUser,
            category : selectedOption,
            description : task,
            deadline : deadline,
            priority :priority,
            completed : false
        };
           console.log(newTask);
          const response = await fetch('http://localhost:8083/api/todos/', {
            method: 'POST',
            body: JSON.stringify(newTask),
            headers: {
              'Content-Type': 'application/json'
            }
          });
          const result = await response.json();
          console.log(result);
        setTasks([...tasks, newTask]);
        setTask("");
        setPriority("High");
        setDeadline("");
        alert("New Task added")
    };
    return (
      <div className={styles.container}>
        
            <header>
                <h2>Task Scheduler</h2>
            </header>
            <main>
                <div className="task-form">
                    <select value={selectedUser} onChange={handleUserChange}>
                    <option value="">Select a user</option>
                       {users.map(user => (
                             <option key={user.id} value={user.id}>{user.name}</option>
                        ))}
                    </select><br></br><br></br>
                    <select value={selectedOption} onChange={handleCatgChange}>
                            {Categorylists.map((option,i) => (
                             <option key={option.name}  value={option.name}>{option.name}</option>
                            ))}
                    </select><br></br><br></br>
                    <input
                        type="text"
                        id="task"
                        placeholder="Enter task..."
                        value={task}
                        onChange={handleTaskChange}
                    /><br></br><br></br>
                    <select
                        id="priority"
                        value={priority}
                        onChange={handlePriorityChange}
                    >
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                    </select><br></br><br></br>
                    <input
                        type="date"
                        id="deadline"
                        value={deadline}
                        onChange={handleDeadlineChange}
                    /><br></br><br></br>
                    <button id="add-task" onClick={addTask}>
                        Add Task
                    </button>
                </div>
            </main>
        </div>
    );
}
export default AddToDo;