import React, { useState } from 'react';
import '../styles/editor.css'

export default function Theme({ list, theme, setTheme, height }) {
  const [toggle, setToggle] = useState(false);
  return (
    <div className="editor-theme">
      <div
        className="selection"
        onClick={() => { setToggle(!toggle) }}
      >
        <span><em>{theme.caption}</em></span>
        <span id="selection-angle"
          style={{
            transform: toggle ? 'rotate(180deg)' : 'rotate(0deg)'
          }}
        >&#9661;</span>
      </div>

      <div
        className={toggle ? "dropdown-open" : 'dropdown-closed'}
      >
        {list.map((item, i) => {
          return (
            <div
              className={theme.caption === item.caption
                ? 'dropdown-selected' : "dropdown-item"}
              key={i}
              onClick={() => {
                setTheme(item);
                setToggle(!toggle);
              }}
            >
              {item.caption}
            </div>
          );
        })}
      </div>
    </div>
  );
};