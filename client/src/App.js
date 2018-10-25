import React, { Component } from "react";
import "./App.css";
import ClassInput from './ClassInput.js';
//import { BrowserRouter as Router, Route, Link } from "react-router-dom";


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      response: "", //server response
      classes: []
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    console.log("here");
    this.makePost()
      .then(res => this.setState({ classes: res }))
      .catch(err => console.log(err));
  }

  //makes get request to server after the component mounts
  componentDidMount() {
    this.callApi()
      .then(res => this.setState({ response: res.express }))
      .catch(err => console.log(err));
    this.makePost()
      .then(res => this.setState({ classes: res }))
      .catch(err => console.log(err));

  }

  callApi = async () => {
    const response = await fetch("/");
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);

    return body;
  };

  makePost = async () => {
    const response = await fetch('/api/userClasses', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: undefined
    });

    const body = await response.json();

    if(response.status !== 200) throw Error(body.message);

    console.log(body);

    return body;
  }

  render() {
    return (
      <div className="App">
        <div className="wrapper">
          <div className="one">
            <ClassInput onSubmit = {this.handleSubmit}/>
          </div>
          <div className="two">
            <table className="classLog">
              <thead>
                <tr>
                  <th>
                    Class
                  </th>
                </tr>
              </thead>
              <tbody>
                {this.state.classes.map(function(d, idx){
                 return (<tr key={idx}><td key={idx}>{d.courseID}</td></tr>)
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
