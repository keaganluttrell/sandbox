import React, { useEffect, useState } from 'react';
import { Link, useParams, Redirect } from "react-router-dom";
import '../styles/user.css';
import Login from './Login.jsx';
import Signup from './Signup.jsx';

export default function User({ setUser, user }) {
  const { username } = useParams();
  const [view, setView] = useState(username === 'guest' ? 'login' : username);

  if (view === 'login') {
    return <Login setView={setView} setUser={setUser} />;
  } else if (view === 'signup') {
    return <Signup setView={setView} setUser={setUser} />;
  } else {
    return (
      <div id="user-dash">
        <Redirect to={`/user/${user.username}`} />
        <div id="user-info">
          <div id="user-group">
            <div id="user-avatar">
              <img src={user.avatar} />
            </div>
            <div id="user-username">{user.username}</div>
          </div>
        </div>
        <div id="user-feed">FEED</div>
      </div>
    );
  }


};