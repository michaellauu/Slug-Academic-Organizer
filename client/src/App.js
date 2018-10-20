import React, { Component } from 'react';
import './App.css';
import ClassInput from './ClassInput.js'
//import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class App extends Component {

  //makes get request to server after the component mounts
  componentDidMount(){
    this.callApi()
      .then(res => this.setState({response: res.express}))
      .catch(err => console.log(err));
  }

  callApi = async () => {
    const response = await fetch('/api');
    const body = await response.json();

    if(response.status !== 200) throw Error(body.message);

    return body;
  };

  render() {
    return (
      <div className="App">
        <ClassInput />
      </div>
    );
  }
}

export default App;
