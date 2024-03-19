import React from 'react'
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";
import App from './App';
import ContextProviders from './Context';

const Script = () => {
  return (
    <App />
  )
}
const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement);
root.render(<HashRouter>
  <ContextProviders>
    <Script/>
  </ContextProviders>

</HashRouter>)