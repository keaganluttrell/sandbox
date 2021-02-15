import React from 'react';
import AceEditor from 'react-ace';
import 'ace-builds/webpack-resolver'
import 'ace-builds/src-noconflict/ext-language_tools';
import themes from 'ace-builds/src-noconflict/ext-themelist';
console.log(themes);
import '../styles/editor.css';
import { beautify } from 'ace-builds/src-noconflict/ext-beautify';

export default function Editor({ title, height, value, inputHandler }) {
  const mode = title.toLowerCase();
  // console.log(themes)
  return (
    <div className="container">
      <div className="title">{title}</div>
      <AceEditor
        placeholder="Sandbox Editor"
        mode={mode}
        theme="terminal"
        name={title}
        fontSize={12}
        showPrintMargin={true}
        wrapEnabled={true}
        showGutter={true}
        highlightActiveLine={true}
        commands={beautify.commands}
        tabSize={2}
        onChange={inputHandler}
        value={value}
        width={'100%'}
        height={height}
        setOptions={{
          useWorker: false,
          enableBasicAutocompletion: true,
          enableLiveAutocompletion: true,
          showLineNumbers: true,
        }}
      />
    </div>
  );
};