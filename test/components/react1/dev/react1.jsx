import React from 'react';
import ReactDOM from 'react-dom';
import './react1.scss';

function React1(props) {
  return (
    <div className="App">
      <header className="App-header">
        <h4>From React: {props.title}</h4>
        <p>From React: {props.description}</p>
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

function mountReact(props) {
  return ReactDOM.render(<React1 {...props} />, document.getElementById('react1'));
}

export default mountReact;