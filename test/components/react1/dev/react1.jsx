import React from 'react';
import ReactDOM from 'react-dom';
import './react1.scss';

function React1() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

function mountReact() {
    return ReactDOM.render(<React1 />, document.getElementById('react1'));
}

export default mountReact;