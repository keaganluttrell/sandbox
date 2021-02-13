import React, { useState } from 'react';
import SplitPane from 'react-split-pane';
import '../styles/sandbox.css'

import Editor from './Editor.jsx';

export default function SandBox({ html, setHtml, css, setCss, setJs, js, output }) {
  const [height, setHeight] = useState('100vh');

  return (
    <>
      <div id="box">
        <SplitPane
          split="horizontal"
          minSize={"50%"}
          onDragFinished={(h) => {
            setHeight(`100vh`);
          }}
        >
          <SplitPane split="vertical" minSize={"33%"}>
            <Editor
              title={'HTML'}
              height={height}
              value={html}
              inputHandler={setHtml}
            />
            <SplitPane split="vertical" minSize={"50%"}>
              <Editor
                title={'CSS'}
                height={height}
                value={css}
                inputHandler={setCss}
              />
              <Editor
                title={'JavaScript'}
                height={height}
                value={js}
                inputHandler={setJs}
              />
            </SplitPane>
          </SplitPane>
          <iframe srcDoc={output} className="output" />
        </SplitPane>
      </div>
      <div id="controls">KEAGAN</div>
    </>
  );
};
