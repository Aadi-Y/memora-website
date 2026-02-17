import Home from "./pages/Home.jsx"
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import React from 'react';
import Modal from "react-modal";
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import "./App.css";
import { Toaster } from 'react-hot-toast';
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
    <Toaster
      position="top-right"
      containerStyle={{ zIndex: 99999 }}
      toastOptions={{
        duration: 3000,
        style: {
          fontFamily: "'Poppins', sans-serif",
          fontSize: "0.9rem",
          borderRadius: "10px",
          padding: "10px 16px",
        },
        success: {
          iconTheme: { primary: "#43a047", secondary: "#fff" },
        },
        error: {
          iconTheme: { primary: "#d32f2f", secondary: "#fff" },
        },
      }}
    />
    <div className="app-container">
      {routes}
    </div>
    
    </>
  )
}

export default App
