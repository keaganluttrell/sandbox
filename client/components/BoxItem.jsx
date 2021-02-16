import axios from 'axios';
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

export default function BoxItem({
  item,
  author,
  setModal,
  userLikes,
  setUserLikes
}) {
  const [likes, setLikes] = useState(item.likes);
  const isLiked = userLikes.some(id => id === item.boxid);
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
          <div
            className="panel-box-name"
            onClick={() => {
              axios.patch(`/api/views/${item.boxid}`)
                .catch(e => alert(e));
            }}
          >
            {item.name}
          </div>
        </Link>
        <div className="panel-views">
          <i className="far fa-eye" />
          {item.views}
        </div>
        <div
          className="panel-likes"
          onClick={() => {
            if (isLiked || author) {

            } else {
              axios.patch(`/api/likes/${item.boxid}`)
                .then(() => {
                  setLikes(likes + 1)
                  const updated = userLikes.slice();
                  updated.push(item.boxid);
                  setUserLikes(updated);
                })
                .catch(e => alert(e));
            }
          }}
        >
          <i className={`fa${isLiked || author ? 's' : 'r'} fa-thumbs-up`} />
          {likes}
        </div>
        <div
          className={author ? "panel-remove" : "panel-remove-hide"}
          onClick={() => setModal(item.boxid)}
        >
          <i className="far fa-trash-alt" />
        </div>
      </div>
    </div >
  );
};