import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router';


export default function Signup({ setView, setUser }) {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');


  return (
    <div className="authentication">
      <div className="auth-title">
        <div className="auth-title-logo">
          <i className="fab fa-fort-awesome" />
          <span>Sandbox</span>
        </div>
        <div>Sign Up</div>
      </div>
      <form>
        <input
          type="text"
          placeholder="email"
          value={email}
          onChange={(e) => { setEmail(e.target.value) }}
        />
        <input
          type="text"
          placeholder="username"
          value={username}
          onChange={(e) => { setUsername(e.target.value) }}
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => { setPassword(e.target.value) }}
        />
        <input
          id="form-submit"
          type="button"
          value="Submit"
          onClick={() => {
            const newUser = {
              email,
              username,
              password,
              boxes: [],
              avatar: "https://loremflickr.com/cache/resized/5726_22733515655_8d6350f645_n_320_240_nofilter.jpg"
            };
            axios.post('/api/signup', newUser)
              .then(results => {
                setUser(results.data);
                setView('');
                setEmail('');
                setUsername('');
                setPassword('');
              });
          }}
        />
      </form>
      <div className="auth-switch">
        Already a member?
      <div
          className="auth-switch-btn"
          onClick={() => setView('login')} >
          Login
       </div>
      </div>
    </div>
  );
}