import React from 'react'
import ReactDOM from 'react-dom/client'
import Router from "./Router";
import store from "./store";
import {Provider} from "react-redux";
import "./assets/styles/main.css";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <Provider store={store}>
	  <Router/>
      </Provider>
  </React.StrictMode>,
)
