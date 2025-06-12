import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import img from '/src/assets/gym1.jpg';
// import img from '../assets/himal.jpg';

export default function Navbar() {
  
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
        <img src={img} alt="Logo" className='logo' />
        </Link>
        
        <div className="nav-links">
          <Link to="/" className="nav-button">Home</Link>
          <Link to="/login" className="nav-button">Login</Link>
          <Link to="/signup" className="nav-button">Sign Up</Link>
          <Link to="/about" className="nav-button">About</Link>
          <Link to="/contact" className="nav-button">Contact</Link>
        </div>
      </div>
    </nav>
  );
} 