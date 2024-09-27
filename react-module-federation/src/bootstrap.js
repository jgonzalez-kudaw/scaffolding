import React from 'react';
import ReactDOM from 'react-dom/client'; // Asegúrate de que estás importando de 'react-dom/client'
import App from './App';

const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
