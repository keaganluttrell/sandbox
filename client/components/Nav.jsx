import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/nav.css';

export default function Nav() {

  return (
    <div id='nav'>
      <div id="nav-logo" >
        <Link to="/">
          <i className="fab fa-fort-awesome" />
          <span>Sandbox</span>
        </Link>
      </div>

      <div
        className="link"
        id="nav-user"
      >
        <Link to="/user">
          <i className="fas fa-user-circle" />
        </Link>
      </div>
    </div>
  );
};