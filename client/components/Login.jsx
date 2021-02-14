import React, { useState } from 'react'
import axios from 'axios';

export default function Login({ setView, setUser }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="authentication">
      <div className="auth-title">
        <div className="auth-title-logo">
          <i className="fab fa-fort-awesome" />
          <span>Sandbox</span>
        </div>
        <div>Login</div>
      </div>

      <form>
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
            const options = { headers: { username, password } };
            axios.get('/api/login', options)
              .then(results => {
                setUser(results.data);
                setView('');
                setUsername('');
                setPassword('');
              });
          }}
        />
      </form>

      <div className="auth-switch">
        Not a member?
      <div
          className="auth-switch-btn"
          onClick={() => setView('signup')} >
          Signup
       </div>
      </div>
    </div>
  );
}