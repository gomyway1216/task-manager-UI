import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <App />
);

// import World from './world'

// const root: HTMLElement | null =
//   document.getElementById(
//     'root'
//   )
// const world =
//   new World(
//     'Hello World!!!!!!!'
//   )
// world.sayHello(root)