import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Nav from './Nav.jsx';
import Home from './Home.jsx';
import SandBox from './SandBox.jsx';
import User from './User.jsx';

const html = `<div id='hello'>Hello World!<div>`
const js = `document.write('From Sandbox!');`
const css = `body {
  background-color: antiquewhite;
  text-align: center;
  font-family: tahoma;
  height: 2000px
}
#hello {
  background-color: white;
}
`;

const defaultUser = {
  _id: 'default',
  username: 'guest',
  avatar: '',
}

export default function Layout() {
  const [user, setUser] = useState(defaultUser);

  return (
    <div id='layout'>
      <Router>
        <Nav />
        <Route exact path='/' > <Home /></Route >
        <Route path="/box">
          <SandBox baseHtml={html} baseCss={css} baseJs={js} />
        </Route>
        <Route exact path='/user' > <User /></Route >
      </Router >

    </div >
  );
};