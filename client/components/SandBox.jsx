import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
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
  <script type="application/javascript"> ${js} </script>
  </body>
  </html>
  `;
};

const standard = { editor: 'vertical', output: 'horizontal' };
const split = { editor: 'horizontal', output: 'vertical' };

export default function SandBox({ user, baseHtml, baseCss, baseJs }) {

  const [boxid, setBoxId] = useState(useParams().boxid);
  const [height, setHeight] = useState('500px');
  const [view, setView] = useState(standard);
  const [html, setHtml] = useState(baseHtml);
  const [css, setCss] = useState(baseCss);
  const [js, setJs] = useState(baseJs);
  const [name, setName] = useState('untitled');
  const [author, setAuthor] = useState('');
  const [output, setOutput] = useState(runCode(html, css, js));
  const [msg, setMsg] = useState('');

  useEffect(() => {
    if (boxid !== 'temp') {
      axios.get(`/api/box/?boxid=${boxid}`)
        .then(results => {
          const { boxid, html, css, js, name, userid } = results.data;
          setHtml(html);
          setCss(css);
          setJs(js);
          setName(name || 'untitled');
          setAuthor(userid);
          setBoxId(boxid);
          setOutput('');
        })
        .catch(e => resizeBy.send(e));
    }
  }, [])

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
            setHeight(`${h + 40}px`);
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
          <iframe
            seamless
            srcDoc={output}
            className="output"
            sandbox="allow-scripts allow-pointer-lock"
          />
        </SplitPane>
      </div>
      <div id="controls">
        <input
          id="box-name"
          type="text"
          value={name}
          placeholder="untitled"
          autoComplete="off"
          onChange={(e) => setName(e.target.value)}
        />

        <div className="btns" id="run"
          onClick={() => { setOutput(runCode(html, css, js)) }}
        >
          <i className="far fa-play-circle" />
        </div>

        <div className="btns"
          onClick={() => {
            if (user.userid === null) {
              setMsg('Please log in or sign up!');
              setTimeout(() => setMsg(''), 5000);

            } else if (user.userid === author) {

              axios.put(`/api/box/${boxid}`, { html, css, js, name })
                .then(() => {
                  setMsg('Saved!');
                  setTimeout(() => setMsg(''), 5000);
                })
                .catch((e) => {
                  console.log(e);
                  setMsg('unable to save')
                  setTimeout(() => setMsg(''), 5000);
                });

            } else {

              const box = { boxid: null, html, css, js, name, userid: user.userid }
              setMsg('Saving...');

              axios.post('/api/box', box)
                .then(results => {
                  setAuthor(user.userid);
                  setBoxId(results.data);
                  setMsg('Saved!');
                  setTimeout(() => setMsg(''), 5000);
                })
                .catch((e) => {
                  setMsg('Unable to save');
                  setTimeout(() => setMsg(''), 5000);
                });
            }
          }}
        >
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
      <div id="control-msg">{msg}</div>
    </>
  );
};