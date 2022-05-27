import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { IntlProvider } from 'react-intl';
import espanol from "./lenguajes/es";
import ingles from "./lenguajes/en";

let language = window.navigator.language || navigator.browserLanguage;
const selectMessages = language.startsWith('es') ? espanol : ingles;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <IntlProvider locale={language} messages = {selectMessages}>
    <App />
  </IntlProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
