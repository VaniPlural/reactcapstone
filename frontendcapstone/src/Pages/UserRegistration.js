import React, { useState } from 'react';
import styles  from "../Components/css/userRegistration.module.css";
import {toast} from 'react-toastify';
import { FaUserEdit } from "react-icons/fa";
import { FaUser } from "react-icons/fa6";
import { RiLockPasswordFill } from "react-icons/ri";

function UserRegistration() {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:8083/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          username,
          password,
        }),
      });

      if (response.ok) {
       // setMessage('User registered successfully!');
        toast.success('User Registered Successfully!');
        setName('');
        setUsername('');
        setPassword('');
      } else {
        const errorMessage = await response.text();
        //setMessage(`Failed to register user: ${errorMessage}`);
        toast.error("Failed to Register User!...User already exists!!");
      }
    } catch (error) {
      console.error('Error registering user:', error);
      setMessage('Failed to register user. Please try again later.');
    }
  };

  return (
    
    <div className={styles.container}>
      <div className={styles.userImage}>
        <img src="./illustration.avif" alt="User" />
      </div>
     
      <form className={styles.registrationForm} onSubmit={handleSubmit}>
        <div className="row">
          <div className="offset-lg-3 col-lg-6">
            <div className={`${styles.cardWrapper} card`}>
              <div className="card-header">
              <h2 className={styles.headerregistration} >User Registration</h2>
              </div>
              <div className="card-body">
                <div className="form-group">
          <label className={styles.labelfield} ><FaUserEdit className={styles.imgIcon} />Name:</label>
          <input  className={styles.inputfield} type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </div><br></br>
        <div>
          <label className={styles.labelfield} ><FaUser className={styles.imgIcon} />Username:</label>
          <input className={styles.inputfield} type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
        </div><br></br>
        <div>
          <label className={styles.labelfield} ><RiLockPasswordFill className={styles.imgIcon}/>Password:</label>
          <input className={styles.inputfield}  type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        </div><br></br>
        <div className="card-footer">
        <button className={styles.buttonfield} type="submit">Register</button>
        </div></div>
        </div>
        </div>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default UserRegistration;
