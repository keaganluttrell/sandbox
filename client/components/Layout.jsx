import React, { useEffect, useState } from 'react'
import Nav from './Nav.jsx';
import SandBox from './SandBox.jsx'

const runCode = (html, css, js) => {
  return `
  <html>
  <style>
  ${css}
  </style>
  <body>
  ${html}
  <script type="text/javascript"> ${js} </script>
  </body>
  </html>
  `;
}

export default function Layout() {
  const [html, setHtml] = useState(`<div id='hello'>Hello World!<div>`);
  const [css, setCss] = useState(`body {
    background-color: antiquewhite;
    text-align: center;
    font-family: tahoma;
  }
  #hello {
    background-color: white;
  }
  `);
  const [js, setJs] = useState(`document.write('From Sandbox!');`);
  const [output, setOutput] = useState(``);

  useEffect(() => {
    setOutput(runCode(html, css, js));
  }, [output])

  return (
    <div id='layout'>
      <Nav
        html={html}
        css={css}
        js={js}
        setOutput={setOutput}
        runCode={runCode}
      />
      <SandBox
        html={html} css={css} js={js}
        setHtml={setHtml}
        setCss={setCss}
        setJs={setJs}
        output={output}
      />
    </div>
  );
};