import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ClassLogging from "./components/ClassLogging";
import GERequirements from "./components/GERequirements";
import Calendar from "./components/Calendar";
import NavBar from "./components/NavBar";
import SignIn from "./components/Home";
import PNPProgress from "./components/PNPProgress";
import GPACalculator from "./components/GPACalculator";
import "./App.css";
import "./styles/NavBar.css";

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
      <Router>
        <div className="container main">
          <header>
            <NavBar />
          </header>
          <br />
          <div className="content">
            <Switch>
              <Route exact path="/" component={SignIn} />
              <Route path="/logging" component={ClassLogging} />
              <Route path="/pnp" component={PNPProgress} />
              <Route path="/gpa" component={GPACalculator} />
              <Route path="/ge" component={GERequirements} />
              <Route path="/calendar" component={Calendar} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}
export default App;
