import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
<<<<<<< HEAD
import 'bootstrap/dist/css/bootstrap.min.css';
=======
import "bootstrap/dist/css/bootstrap.min.css";
>>>>>>> 1464514d290e980813368510d30a10051c48e060
import App from "./App";
import * as serviceWorker from "./serviceWorker";

/* SET THE TOP LEVEL COMPONENT TO RUN APP */
ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
