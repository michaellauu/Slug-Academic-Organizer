import React, { Component } from "react";
import "./App.css";
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import NavBar from "./components/NavBar";
import GEReqs from "./components/GEReqs"
import MajorReqs from "./components/MajorReqs"
import ClassInput from "./components/ClassInput";
import Home from "./components/Home";
import Error from "./components/Error";
import { Button } from 'reactstrap';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      response: "" //server response
    };
  }

  //makes get request to server after the component mounts
  componentDidMount() {
    this.callApi()
      .then(res => this.setState({ response: res.express }))
      .catch(err => console.log(err));
  }

  callApi = async () => {
    const response = await fetch("/");
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);

    return body;
  };

  render() {
    return (
	//this lets connect to different components of our site
      <BrowserRouter>
        <div>
          <Switch>
	    <Route path="/" component={NavBar} exact />
      <Route path="/classinput"component={ClassInput} />
	    <Route path="/signin" component={Home} />
      <Route path="/gereqs" component={GEReqs} />
      <Route path="/majorreqs" component={MajorReqs} />
	    <Route component={Error} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
};
export default App;
