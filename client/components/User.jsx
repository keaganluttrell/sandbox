import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams, Redirect } from "react-router-dom";
import '../styles/user.css';
import Login from './Login.jsx';
import Signup from './Signup.jsx';
import List from './List.jsx';

export default function User({ setUser, user }) {
  const { username } = useParams();
  const [view, setView] = useState(username === 'guest' ? 'login' : username);
  const [list, setList] = useState([]);
  useEffect(() => {
    axios.get(`/api/box/?userid=${user.userid}`)
      .then(results => setList(results.data))
      .catch(e => console.log(e));
  }, [user])

  if (view === 'login') {
    return <Login setView={setView} setUser={setUser} />;
  } else if (view === 'signup') {
    return <Signup setView={setView} setUser={setUser} />;
  } else {
    return (
      <>
        <Redirect to={`/user/${user.username}`} />
        <div id="user-dash">
          <div id="user-info">
            <div id="user-group">
              <div id="user-avatar">
                <img src={user.avatar} />
              </div>
              <div id="user-username">{user.username}</div>
            </div>
          </div>
          <div id="user-feed">
            <List list={list} title={'Your Boxes'} />
          </div>
        </div>
      </>
    );
  }


};