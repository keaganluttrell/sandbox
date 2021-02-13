import React, { useEffect, useState } from 'react';
import SplitPane from 'react-split-pane';
import '../styles/sandbox.css'

import Editor from './Editor.jsx';

export default function SandBox({ html, setHtml, css, setCss, setJs, js, output }) {
  const standard = { editor: 'vertical', output: 'horizontal' }
  const split = { editor: 'horizontal', output: 'vertical' }
  const [height, setHeight] = useState('100vh');
  const [view, setView] = useState(standard);

  return (
    <>
      <div id="box">
        <SplitPane
          split={view.output}
          minSize={"50%"}
          onDragFinished={(h) => {
            setHeight(`100vh`);
          }}
        >
          <SplitPane split={view.editor} minSize={"33%"}>
            <Editor
              title={'HTML'}
              height={height}
              value={html}
              inputHandler={setHtml}
            />
            <SplitPane split={view.editor} minSize={"50%"}>
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
      <div id="controls">
        <div className="btns" id="run">
          <span>Run</span>
          <i className="far fa-play-circle" />
        </div>
        <div className="btns">
          <span>Save</span>
          <i className="fas fa-cloud-upload-alt" />
        </div>
        <div
          className="btns"
          onClick={() => {
            view.output === 'vertical' ? setView(standard) : setView(split)
          }}
        >
          <span>View</span>
          <i className={`fas fa-ruler-${view.output}`} />
        </div>
      </div>
    </>
  );
};
