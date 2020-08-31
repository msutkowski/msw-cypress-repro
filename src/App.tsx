import React, { useEffect, useState, useCallback } from "react";
import logo from "./logo.svg";
import { Counter } from "./features/counter/Counter";
import "./App.css";

function App() {
  const [state, setState] = useState();

  const fetchAnything = useCallback(() => {
    fetch("https://httpbin.org/anything")
      .then(async (res) => {
        if (res.status > 300) {
          throw await res.json()
        }
        return res.json()
      })
      .then((res) => setState(res.args))
      .catch((err) =>  setState(err));
  }, []);

  useEffect(() => {
    fetchAnything();
  }, [fetchAnything]);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Counter />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <button onClick={fetchAnything}>Fetch anything</button>
        <div id="test-args">{JSON.stringify(state)}</div>
        <span>
          <span>Learn </span>
          <a
            className="App-link"
            href="https://reactjs.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            React
          </a>
          <span>, </span>
          <a
            className="App-link"
            href="https://redux.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Redux
          </a>
          <span>, </span>
          <a
            className="App-link"
            href="https://redux-toolkit.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Redux Toolkit
          </a>
          ,<span> and </span>
          <a
            className="App-link"
            href="https://react-redux.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            React Redux
          </a>
        </span>
      </header>
    </div>
  );
}

export default App;
