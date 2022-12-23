import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <h1 className="text-3xl font-bold underline">
          Hello world!
        </h1>
        <div className='m-3 p-2'>
          margin
        </div>
      </header>
      <body style={{background: "red"}}>
        <div>
           busdes
        </div>
        <div>
          南草津→立命館大学
        </div>
        <div>
          <div>
            6時
            <div>
              <span>06:57</span><span>パナソニック 東口経由</span>
            </div>
          </div>
        </div>
      </body>
    </div>
  );
}

export default App;
