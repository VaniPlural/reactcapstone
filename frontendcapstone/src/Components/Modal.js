import  { useState} from 'react';
import React from "react";
import styles from './css/modal.module.css';
export const Modal = ({ closeModal, onSubmit, defaultValue }) => {
    console.log(defaultValue)
    const [formState, setFormState] = useState(
        defaultValue || {
          description: "",
          priority:"",
          deadline:"",
          completed: "",
        }
      );
      const [errors, setErrors] = useState("");
      const validateForm = () => {
        if (formState.description && formState.priority && formState.Deadline &&formState.status) {
          setErrors("");
          return true;
        } else {
          let errorFields = [];
          for (const [key, value] of Object.entries(formState)) {
            if (!value) {
              errorFields.push(key);
            }
          }
          setErrors(errorFields.join(", "));
          return false;
        }
      };
      const handleChange = (e) => {
        console.log("here" + e.target.name +"value is "+  e.target.value)
        console.log(`here12 e.target.name: ${[e.target.name]}`);
        setFormState({ ...formState, [e.target.name]: e.target.value });
        console.log("here3" + JSON.stringify(formState));
      };
      const handleSubmit = async(e) => {
        e.preventDefault();
        console.log("outside");
        const newTask = {
          id: formState.id,
          description : formState.description,
          deadline : formState.deadline,
          priority :formState.priority,
          completed : formState.completed
         };
      console.log(newTask);
      try{
        const requestOptions = {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newTask)
        }
        const response = await fetch("http://localhost:8083/api/todos/" + Number(formState.id), requestOptions);
        console.log(response);
        const data = await response.json();
        console.log(data);
        alert("Record Updated Successfully!!")
      }
      catch(error)
      {
        alert("Error Updating the status");
      }
        closeModal();
      };
   return(
    <div className={styles.ModalContainer}>
    <div className={styles.Modal}>
     <form>
        <div className={styles.formgroup}>
            <label htmlFor="description">Description: </label>
            <input name="description"  onChange={handleChange}
              value={formState.description}></input>
        </div>
        <div className={styles.formgroup}>
            <label htmlFor="priority"> Priority: </label>
            <select name="priority" onChange={handleChange}
              value={formState.priority}>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
            </select>
        </div>
        <div className={styles.formgroup}>
            <label htmlFor="deadline"> Deadline: </label>
            <input type="date" name="deadline"    onChange={handleChange}
              value={formState.deadline}></input>
        </div>
        <div className={styles.formgroup}>
            <label htmlFor="completed"> Status :</label>
            <input name="completed" onChange={handleChange}
              value={formState.completed}></input>
        </div>
        <div >
            <button className={styles.btn} type="submit" onClick={handleSubmit}>Update</button>
            {/*<button className={styles.btn} type="submit" onClick={handleSubmit}>Update</button>*/}
        </div>
     </form>
       </div>
    </div>
   )
}
export default Modal;