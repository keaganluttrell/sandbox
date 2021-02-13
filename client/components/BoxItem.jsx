import React from 'react';
import { Link } from "react-router-dom";
import '../styles/boxItem.css';

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
};

export default function BoxItem({ item }) {
  return (
    <Link to={`/box/${item.boxid}`}>
      <div className="box-item">
        <iframe
          srcDoc={runCode(item.html, item.css, item.js)}
          frameBorder="0"
          className="box-preview"
          height="300px"
          width="300px"
        />
      </div>
    </Link>
  );
};