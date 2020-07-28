import React from 'react';
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import './index.css';
import App from "./components/App.jsx";
import "./stylesheets/main.scss";
import 'semantic-ui-css/semantic.min.css';





ReactDOM.render(
  <BrowserRouter>
   <App />
  </BrowserRouter>,
   
  document.getElementById('root')
);


