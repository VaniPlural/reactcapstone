import React, { useState, useEffect } from "react";
import styles from "../Components/css/displayToDo.module.css";
import "bootstrap/dist/css/bootstrap.css";
import { toast } from "react-toastify";
import Modal from "../Components/Modal";
import { useFetcher, useNavigate } from "react-router-dom";
import Footer1 from "./Footer1.js";
function DisplayToDo() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [selectedUsername, setSelectedUsername] = useState("");
  const [todos, setTodos] = useState([]);
  const [username, setuserName] = useState("");
  const [Noofrecords, SetRecords] = useState(0);
  const [done, setDone] = useState(0);
  const [doneTasks, setDoneTasks] = useState(0);
  const [pending, setPending] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
 
  // to edit va row
  const [rowToEdit, setRowToEdit] = useState(null);
  const navigate = useNavigate();
  function handleStrike(id, description, completed) {
    console.log("handle strike clicked", id);
    console.log("handle strike clicked", description);
    console.log("handle strike clicked", completed);
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
    console.log(todos);
  }
  const handleremove = (code) => {
    if (window.confirm("Do you want to Delete this List?")) {
      fetch(`http://localhost:8083/api/todos/${code}`, {
        method: "DELETE",
      })
        .then((response) => {
          toast.success("Removed Successfully...");
          navigate(0);
        })
        .catch((error) => {
          console.error(error.message);
        });
    }
  };
  const handleEditRow = (idx) => {
    // Set the row to edit
    setRowToEdit(idx);
    // Open modal
    setModalOpen(true);
   
  };
  // Function to handle updating data after editing
  const handleUpdateRow = (updatedRowData) => {
    console.log(updatedRowData);
    // Update the state with the edited row data
    const updatedTodos = [...todos];
    updatedTodos[rowToEdit] = updatedRowData;
    setTodos(updatedTodos);
    // Close modal
    setModalOpen(false);
  };
  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await fetch("http://localhost:8083/api/users");
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    }
    fetchUsers();
  }, []);
  const handleUserChange = async (event) => {
    const userId = event.target.value;
    const uname = event.target[userId].innerHTML;
    setuserName(uname);
    setSelectedUser(userId);
    try {
      const response = await fetch(
        `http://localhost:8083/api/todos/byuser/${userId}`
      );
      const data = await response.json();
      SetRecords(data.length);
      setTodos(data);
     
      const completedTasks = data.filter((task) => task.completed);
      // Update the state variable doneTasks with the filtered array
      setDoneTasks(completedTasks.length);
      //find the pending taks
      console.log({ Noofrecords });
      console.log({ doneTasks });
      setPending(Noofrecords - doneTasks);
      console.log(pending);
      
    } catch (error) {
      console.error(`Error fetching ToDos for user ${userId}:`, error);
    }
  };
   
  //const className=todo.completed ? styles.completed :"";
  const className = todos.completed ? styles.completed : "";
  const completedTodos=(todos.filter((todos)=>todos.completed)).length;
  const totalTodos=todos.length;
  return (
    <main className={styles.container}>
      <header>
        <h2 className={styles.headerregistration} >Display Task</h2>
      </header>
      <div className={styles.userWrapper}>
        <label>
          <h1 className={styles.selectuser}>
            <b>Select User</b>
          </h1>
        </label>
        <select className={styles.selectusername} value={selectedUser} onChange={handleUserChange}>
          <option value="">Select a user</option>
          
          {users.map((user) => (
            <option key={user.name} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
      </div>
   <br></br>
{todos.length>0 ? (
  <div className={styles.tabledisplay}>
  <table  className={`${styles.tableRadius} table table-hover`}  editRow={handleEditRow} hidden={todos.length>0 ? "":"hidden"}>
  {/*<div display:{todos.length>0 ? "none": "block"}>No records found!</div>*/}

   <thead>
     <tr className={styles.tableRow}>
       <th>Category</th>
      <th>Description</th>
       <th>Deadline</th>
       <th>Priority</th>
       <th>Completed</th>
       <th>Action</th>
     </tr>
   </thead>
   <tbody >
    
       
     {todos &&
       todos.map((todo, idx) => (
         <tr
           key={todo.id}
           value={todo.completed ? "completed" : "uncompleted"}
         >

           <td className={styles.categories} >{todo.category}</td>
           
             <td className={styles.categories} >{todo.description}</td>
          
            <td className={styles.categories}>{todo.deadline}</td>
           <td className={styles.categories}>{todo.priority}</td>
           <td className={styles.categories}>{todo.completed ? "Yes" : "No"}</td>
           <td className={styles.categories}>
          
             <span className="buttonSpan">
               {/* Edit icon with onClick handler */}
               <a onClick={() => handleEditRow(idx)} className="btn btn-link" >Edit</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
               <a
                 onClick={() => {
                   handleremove(todo.id);
                 }}
                 className="btn btn-link" 
               >
                 Delete
               </a>
             </span>
           </td>
         </tr>
       ))}
    
     {/* Modal for editing */}
     {modalOpen && (
       <Modal
         rowData={todos[rowToEdit]} // Pass the data of the row being edited
         onUpdate={handleUpdateRow} // Pass the update function
         closeModal={() => {
           setModalOpen(false);
         }}
         defaultValue={rowToEdit !== null && todos[rowToEdit]}
       />
     )}
   </tbody>
 </table>
 </div>
):(
  <div style={{textAlign:"center"}}>No records found!!!!</div>
)}

      <Footer1 completedTodos={completedTodos} totalTodos={totalTodos} />
     
    </main>
  );
}
export default DisplayToDo;