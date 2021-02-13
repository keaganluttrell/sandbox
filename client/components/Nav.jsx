import React from 'react';
import '../styles/nav.css';

export default function Nav() {

  return (
    <div id='nav'>
      <div id="logo" >
        <i className="fab fa-fort-awesome" />
        <span>Sandbox</span>
      </div>

      <div
        className="link"
        id="user"
      >
        <i className="fas fa-user-circle" />
      </div>
    </div>
  );
};