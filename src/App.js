// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Components/Login/Login';
import Posts from './Components/Posts/posts';
function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          
        <Route path="/" element={<Login />} />
        <Route path="/posts" element={<Posts />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

