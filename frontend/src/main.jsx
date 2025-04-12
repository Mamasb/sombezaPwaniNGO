// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { UserProvider } from './context/UserContext';
import './index.css';

const container = document.getElementById('root');
if (!container) {
  console.error("No element with id 'root' found in index.html");
} else {
  const root = ReactDOM.createRoot(container);
  root.render(
    <UserProvider>
      <App />
    </UserProvider>
  );
}
