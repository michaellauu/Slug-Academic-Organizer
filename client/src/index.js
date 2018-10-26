import React from "react";
import ReactDOM from "react-dom";
// import { render } from "react-dom";
import "./index.css";
import App from "./App";
import GERequirements from "./GERequirements"
import * as serviceWorker from "./serviceWorker";
// import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
// import Home from "./Home";

/* our original home page */
//ReactDOM.render(<App/>, document.getElementById('root'));

/* current signup/siginin stuff need to implement switches */
ReactDOM.render(<GERequirements />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
