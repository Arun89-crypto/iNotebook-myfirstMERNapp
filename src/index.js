import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import AlertState from './Context/alert/AlertState';
import './index.css'


ReactDOM.render(
    <AlertState>
        <App />
    </AlertState>
    , document.getElementById('root'));