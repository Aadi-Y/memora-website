import Home from "./pages/Home.jsx"
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import React from 'react';
import Modal from "react-modal";
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import "./App.css";
import Landing from "./component/Landing.jsx";

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
  

  return (
    <>
    <div className="app-container">
      {routes}
    </div>
    
    </>
  )
}

export default App
