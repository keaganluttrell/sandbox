import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  useHistory,
  Route,
  Link
} from "react-router-dom";

import Nav from './Nav.jsx';
import Home from './Home.jsx';
import SandBox from './SandBox.jsx';
import User from './User.jsx';

const html = `<div id='hello'>Hello World!</div>`
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
  userid: 1,
  username: 'keagan9',
  avatar: 'https://i.picsum.photos/id/861/200/200.jpg?hmac=UJSK-tjn1gjzSmwHWZhjpaGahNSBDQWpMoNvg8Bxy8k',
}

export default function Layout() {
  const [user, setUser] = useState(defaultUser);
  const [userLikes, setUserLikes] = useState([]);

  return (
    <div id='layout'>
      <Router>
        <Nav user={user} />
        <Route
          exact path='/'
          children={
            <Home
              user={user}
              userLikes={userLikes}
              setUserLikes={setUserLikes}
            />
          }
        />
        <Route
          path="/user/:username"
          children={
            <User
              setUser={setUser}
              user={user}
              userLikes={userLikes}
              setUserLikes={setUserLikes}
            />
          }
        />
        <Route
          path="/box/:boxid"
          children={
            <SandBox
              user={user}
              baseHtml={html}
              baseCss={css}
              baseJs={js}
            />
          }
        />
      </Router >
    </div >
  );
};