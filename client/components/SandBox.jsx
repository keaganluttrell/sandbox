import React, { useEffect, useState } from 'react';
import SplitPane from 'react-split-pane';
import '../styles/sandbox.css'

import Editor from './Editor.jsx';

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

const standard = { editor: 'vertical', output: 'horizontal' };
const split = { editor: 'horizontal', output: 'vertical' };

export default function SandBox({ baseHtml, baseCss, baseJs }) {
  const [height, setHeight] = useState('100vh');
  const [view, setView] = useState(standard);

  const [html, setHtml] = useState(baseHtml);
  const [css, setCss] = useState(baseCss);
  const [js, setJs] = useState(baseJs);
  const [output, setOutput] = useState(runCode(html, css, js));

  useEffect(() => {
    setOutput(runCode(html, css, js));
  }, [output])

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
        <div className="btns" id="run"
          onClick={() => { setOutput(runCode(html, css, js)) }}
        >
          <i className="far fa-play-circle" />
        </div>

        <div className="btns">
          <i className="fas fa-cloud-upload-alt" />
        </div>

        <div
          className="btns"
          onClick={() => {
            view.output === 'vertical' ? setView(standard) : setView(split)
          }}
        >
          <i className={`fas fa-ruler-${view.output}`} />
        </div>

      </div>
    </>
  );
};
