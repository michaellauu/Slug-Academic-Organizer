import React, { Component } from "react";
import "./App.css";
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ClassLogging from "./components/ClassLogging";
import Home from "./components/Home";
import Major from "./components/Major";
import Error from "./components/Error";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      response: "" //server response
    };
  };

  //makes get request to server after the component mounts
  componentDidMount() {
    this.callApi()
      .then(res => this.setState({ response: res.express }))
      .catch(err => console.log(err));

  };

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
      	    <Route path="/" component={ClassLogging} exact />
      	    <Route path="/signin" component={Home} />
            <Route path="/major" component={Major} />
      	    <Route component={Error} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
};
export default App;
