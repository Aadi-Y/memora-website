import Home from "./pages/Home.jsx"
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import React from 'react';
import Modal from "react-modal";
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import "./App.css";
import Landing from "./component/Landing.jsx";
import { useEffect } from "react";

Modal.setAppElement("#root");

const routes = (
  <Router>
    <Routes>
      <Route path='/' element={<Landing/>}></Route>
      <Route path='/login' element={<Login/>}></Route>
      <Route path='/signup' element={<Signup/>}></Route>
      <Route path='/dashboard' element={<Home/>}></Route>
    </Routes>
  </Router>
)

function App() {

  useEffect(() => {
    const metaTag = document.createElement("meta");
    metaTag.name = "viewport";
    metaTag.content = "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no";
    document.head.appendChild(metaTag);

    return () => {
      document.head.removeChild(metaTag); // Cleanup when component unmounts
    };
  }, []);
  

  return (
    <>
    <div className="app-container">
      {routes}
    </div>
    
    </>
  )
}

export default App
