import React, { useState } from 'react';
import AceEditor from 'react-ace';
import Themes from 'ace-builds/src-noconflict/ext-themelist';
import { beautify } from 'ace-builds/src-noconflict/ext-beautify';
import 'ace-builds/webpack-resolver'
import 'ace-builds/src-noconflict/ext-language_tools';
import '../styles/editor.css';
import Theme from './Theme.jsx';

export default function Editor({ title, height, value, inputHandler }) {
  const mode = title.toLowerCase();
  const [theme, setTheme] = useState(Themes.themes[27])
  return (
    <div className="container">
      <div className="title">
        {title}
        <Theme
          list={Themes.themes}
          theme={theme}
          setTheme={setTheme}
          height={height}
        />
      </div>
      <AceEditor
        placeholder="Sandbox Editor"
        mode={mode}
        theme={theme.name}
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