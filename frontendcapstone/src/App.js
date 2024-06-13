import {HashRouter as Router,Routes,Route } from 'react-router-dom';
import './App.css';
import  Home  from './Pages/home';
import { Layout } from './Layout';
import DisplayToDo from './Pages/displayToDo';
import UserRegistration from "./Pages/UserRegistration";
import AddToDo from "./Pages/AddTodo";

import React, { useState } from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Navbar from './Components/Navbar';


function App() {
  const [name, setName] = useState('');
 return(
  <>
  <Router>
    <Routes>
      <Route element={<Layout/>}>
      <Route path="/" element={<Home/>}/>
      <Route path="/displayToDo" element={<DisplayToDo/>}/>
      <Route path="/userRegistration" element={<UserRegistration/>}/>
      <Route path="/addToDo" element={<AddToDo/>}/>
      {/*<Route path="/seachFilterToDo" element={<SeachFilterToDo/>}/>
      <Route path="/page2" element={<Page2/>}/>
      <Route path="/page3" element={<Page3/>}/>
 <Route path="/page4" element={<Page4/>}/>*/}
      </Route>
      
    </Routes>
  </Router>
  <ToastContainer></ToastContainer>
  </>
 )
}

export default App;
