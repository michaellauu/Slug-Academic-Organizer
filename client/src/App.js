import React, { Component } from 'react';
import './App.css';
import 'rc-time-picker/assets/index.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import TimePicker from 'rc-time-picker';

const format = 'h:mm a';

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      response: '', //server response
      class: '', //class value from form
      M: false,
      Tu: false,
      W: false,
      Th: false,
      F: false,
      startTime: '',
      endTime: '',
      location: ''
    };

    this.changeClass = this.changeClass.bind(this);
    this.changeDays = this.changeDays.bind(this);
    this.changeStartTime = this.changeStartTime.bind(this);
    this.changeEndTime = this.changeEndTime.bind(this);
    this.changeLocation = this.changeLocation.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

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

  //enter class value
  changeClass(event){
    this.setState({class: event.target.value});
  }

  changeDays(event){
    if(event.target.value==="M"){
      this.setState(prevState => ({
        M: !prevState.M
      }));
    }else if(event.target.value==="Tu"){
      this.setState(prevState => ({
        Tu: !prevState.Tu
      }));
    }else if(event.target.value==="W"){
      this.setState(prevState => ({
        W: !prevState.W
      }));
    }else if(event.target.value==="Th"){
      this.setState(prevState => ({
        Th: !prevState.Th
      }));
    }else if(event.target.value==="F"){
      this.setState(prevState => ({
        F: !prevState.F
      }));
    }
  }

  changeStartTime(event){
    if(event && event.target){
      this.setState({startTime: event.target.value});
    }
  }

  changeEndTime(event){
    if(event && event.target){
      this.setState({endTime: event.target.value});
    }
  }

  changeLocation(event){
    this.setState({location: event.target.value});
  }

  //form submission->post request to server
  handleSubmit(event){
    this.getClasses(this.state.class, this.state.M, this.state.Tu, this.state.W,
                    this.state.Th, this.state.F, this.state.startTime,
                    this.state.endTime, this.state.location)
      .then(res => this.setState({response: res.express, class: '', M: false,
            Tu: false, W: false, Th: false, F: false, startTime: '',
            endTime: '', location: ''}))
      .catch(err => console.log(err));
    event.preventDefault();
  }

  getClasses = async (data) => {
    const response = await fetch('/api/getClasses', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        class: data
      })
    });
    const body = await response.json();

    if(response.status !== 200) throw Error(body.message);

    return body;
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">

          <form id="classform" onSubmit = {this.handleSubmit}>
            <div  class="class">
              Class<br />
              <input type="text" value={this.state.class} onChange={this.changeClass} />
            </div>

            <div class="days">
              <input type="checkbox" value="M" onChange={this.changeDays} checked={this.state.M} /> M 
              <input type="checkbox" value="Tu" onChange={this.changeDays} checked={this.state.Tu} /> Tu 
              <input type="checkbox" value="W" onChange={this.changeDays} checked={this.state.W} /> W 
              <input type="checkbox" value="Th" onChange={this.changeDays} checked={this.state.Th} /> Th 
              <input type="checkbox" value="F" onChange={this.changeDays} checked={this.state.F} /> F
            </div>
            
            <div class="time">
              Time<br />
              <TimePicker
                showSecond={false}
                onChange={this.changeStartTime}
                format={format}
                use12Hours
                minuteStep={5}
              />-
              <TimePicker
                showSecond={false}
                onChange={this.changeStartTime}
                format={format}
                use12Hours
                minuteStep={5}
              />
            </div>
            <div class="location">
              Location<br />
              <input type="text" onChange={this.changeLocation} />
              <input type="submit" value="Submit" />
            </div>
          </form>

        </header>
      </div>
    );
  }
}

export default App;
