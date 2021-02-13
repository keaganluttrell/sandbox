import React, { useEffect, useState } from 'react'
import Nav from './Nav.jsx';
import SandBox from './SandBox.jsx'

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
`

export default function Layout() {
  return (
    <div id='layout'>
      <Nav />
      <SandBox baseHtml={html} baseCss={css} baseJs={js} />
    </div>
  );
};