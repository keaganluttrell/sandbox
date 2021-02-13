import React, { useState } from 'react';
import { Link } from "react-router-dom";
import samples from '../data/sample.js';
import List from './List.jsx';
import '../styles/home.css';

export default function Home({ user }) {
  const [list, setList] = useState(samples);
  return (
    <div id="home">
      <div id="welcome-dash" className="list">
        <div className="info-item">
          <div>Welcome!</div>
          <ul>
            <li>Practice Skills</li>
            <li>Code with friends</li>
            <li>Join the fun!</li>
          </ul>
        </div>
        <div className="info-item">
          <Link to={`/user/${user.username}`}><i className="fas fa-user-plus" /></Link>
          <Link to={`/user/${user.username}`}>
            <p>Login Or Sign Up!</p>
          </Link>
        </div>
        <div className="info-item">
          <Link to="/box/temp"><i className="fas fa-cogs"></i></Link>
          <p>Start Something Now!</p>
        </div>
      </div>

      <List list={list} />
    </div>
  );
};