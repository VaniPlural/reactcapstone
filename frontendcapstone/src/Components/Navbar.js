import React, { useState} from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import navbar from 'react-bootstrap/Navbar';
import NavLink from 'react-bootstrap/esm/NavLink';
import styles from './css/navbar.module.css';
import { IoClose, IoMenu } from "react-icons/io5";
import { FaHome } from "react-icons/fa";
import { FaClipboardList } from "react-icons/fa6";
import { FaUserPlus } from "react-icons/fa";
import { FaTasks } from "react-icons/fa";

import { Link } from "react-router-dom";
export function Navbar(){

  const [showMenu, setShowMenu] = useState(false);

 const toggleMenu = () => {
   setShowMenu(!showMenu);
 };

 return(<div className={styles.navbar}>
        <Link className={`${showMenu ? "" : styles.showMenu }`} to="/">
            <button className={styles.navbarButton}><FaHome className={styles.imgIcons}/>Home</button>
            </Link>

            <Link className={`${showMenu ? "" : styles.showMenu }`} to="/displayToDo">
        <button className={styles.navbarButton}><FaClipboardList className={styles.imgIcons}/>Display Tasks</button>
        </Link>
         <Link className={`${showMenu ? "" : styles.showMenu }`} to="/userRegistration">
        <button className={styles.navbarButton}><FaUserPlus className={styles.imgIcons}/>User  Registration</button>
        </Link>
        <Link className={`${showMenu ? "" : styles.showMenu }`} to="/addToDo">
        <button className={styles.navbarButton}><FaTasks className={styles.imgIcons}/>Add Tasks</button>
        </Link>
       <div className={styles.menuButton} onClick={toggleMenu}> 
       <IoMenu />
       
       </div>
       {/*<div className={`${showMenu ? "" : styles.showMenu }` {styles.closeButton} }  onClick={toggleMenu}> 
       <IoClose />
       </div>*/}
 
    
                 </div>
    )
    
    
    
}
export default Navbar;