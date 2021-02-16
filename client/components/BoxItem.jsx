import React, { useState } from 'react';
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

export default function BoxItem({ item, author, setModal }) {
  const getNum = () => Math.floor(Math.random() * 100);
  return (

    <div className="box-item">
      <iframe
        srcDoc={runCode(item.html, item.css, item.js)}
        frameBorder="0"
        className="box-preview"
        height="300px"
        width="300px"
      />
      <div className="panel">
        <Link to={`/box/${item.boxid}`}>
          <div className="panel-box-name">
            {item.name}
          </div>
        </Link>
        <div className="panel-views">
          <i className="far fa-eye" />
          {item.views || getNum()}
        </div>
        <div className="panel-likes">
          <i className="far fa-thumbs-up" />
          {item.likes || getNum()}
        </div>
        <div
          className={author ? "panel-remove" : "panel-remove-hide"}
          onClick={() => setModal(item.boxid)}
        >
          <i className="far fa-trash-alt" />
        </div>
      </div>
    </div>
  );
};