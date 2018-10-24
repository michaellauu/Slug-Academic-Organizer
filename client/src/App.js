import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      response: "", //server response
      class: "" //class value from form
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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

  //change to form
  handleChange(event) {
    this.setState({ class: event.target.value });
  }

  //form submission->post request to server
  handleSubmit(event) {
    this.getClasses(this.state.class)
      .then(res => this.setState({ response: res.express, class: "" }))
      .catch(err => console.log(err));
    event.preventDefault();
  }

  getClasses = async data => {
    const response = await fetch("/api/getClasses", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        class: data
      })
    });
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);

    return body;
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1>{this.state.response}</h1>
          <form onSubmit={this.handleSubmit}>
            <label>
              Search:
              <input
                type="text"
                value={this.state.class}
                onChange={this.handleChange}
              />
            </label>
            <input type="submit" value="Submit" />
          </form>
        </header>
      </div>
    );
  }
}

export default App;
