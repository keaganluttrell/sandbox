import React from 'react';
import '../styles/nav.css';

export default function Nav({ html, css, js, setOutput, runCode }) {

  return (
    <div id='nav'>
      <div id="logo" >
        <i className="fab fa-fort-awesome" />
        <span>Sandbox</span>
      </div>

      <div
        className="link"
        id="run"
        onClick={() => {
          setOutput(runCode(html, css, js));
        }}
      >
        Run
      </div>

      <div
        className="link"
        id="save"
        onClick={() => {
          // api request to save to database
          console.log('h:', html, 'c', css, js);
        }}
      >
        Save
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