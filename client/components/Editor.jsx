import React from 'react';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/ext-beautify';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/mode-html';
import 'ace-builds/src-noconflict/mode-css';
import 'ace-builds/src-noconflict/theme-monokai';

import '../styles/editor.css';

export default function Editor({ title, height, value, inputHandler }) {
  const mode = title.toLowerCase();

  return (
    <div className="container">
      <div className="title">{title}</div>
      <AceEditor
        placeholder="Sandbox Editor"
        mode={mode}
        theme="monokai"
        name="blah2"
        fontSize={12}
        showPrintMargin={true}
        showGutter={true}
        highlightActiveLine={true}
        tabSize={2}
        onChange={inputHandler}
        value={value}
        width={'100%'}
        height={height}
        setOptions={{
          useWorker: false,
        }}
      />
    </div>
  );
};