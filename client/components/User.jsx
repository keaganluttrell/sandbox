import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams, Redirect } from "react-router-dom";
import '../styles/user.css';
import Login from './Login.jsx';
import Signup from './Signup.jsx';
import List from './List.jsx';

const defaultUser = {
  userid: null,
  username: 'guest',
  avatar: 'https://i.picsum.photos/id/861/200/200.jpg?hmac=UJSK-tjn1gjzSmwHWZhjpaGahNSBDQWpMoNvg8Bxy8k',
}

export default function User({ setUser, user, userLikes, setUserLikes }) {
  const { username } = useParams();
  const [view, setView] = useState(username === 'guest' ? 'login' : username);
  const [list, setList] = useState([]);
  const [modal, setModal] = useState(false);

  const getUserBoxes = () => {
    axios.get(`/api/box/?userid=${user.userid}`)
      .then(results => setList(results.data))
      .catch(e => console.log(e));
  }


  useEffect(() => {
    getUserBoxes();
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

            <div id="user-sign-out">
              <div id="user-sign-out-btn">
                <input
                  type="button"
                  value="Sign Out"
                  onClick={() => {
                    setUser(defaultUser);
                    alert('You have signed out');
                    setTimeout(function () { setView('login') }, 50);
                  }}
                />
              </div>
            </div>

          </div>
          <div id="user-feed">
            <div className="list">
              <div className="info-item">
                <i className="fas fa-door-open" />
                <p>Welcome {user.username}!</p>
              </div>
              <div className="info-item">
                <Link to="/box/temp"><i className="fas fa-cogs"></i></Link>
                <p>Start Something Now!</p>
              </div>
            </div>
            <List
              list={list}
              author={true}
              setModal={setModal}
              userLikes={userLikes}
              setUserLikes={setUserLikes}
            />
          </div>
        </div>
        <div id={modal ? 'panel-alert' : 'panel-hidden'}>
          <div
            id="panel-close"
            onClick={() => {
              setModal(false);
            }}
          >
            <i className="fas fa-times" />
          </div>
          <div id="panel-msg">Are you sure want to delete {''}?</div>
          <div id="panel-btns">
            <input
              type="button"
              value="Yes"
              onClick={() => {
                axios.delete(`/api/box/${modal}`)
                  .then(() => {
                    getUserBoxes();
                    setModal(false);
                  })
                  .catch(e => alert(e));
              }}
            />
            <input
              type="button"
              value="No"
              onClick={() => {
                setModal(false);
              }}
            />
          </div>
        </div>
      </>
    );
  }
};