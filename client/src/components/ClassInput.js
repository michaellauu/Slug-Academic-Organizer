import React, { Component } from 'react';
import './ClassInput.css';

class ClassInput extends Component {

  constructor(props){
    super(props);
    this.state = {
      response: '', //server response
      class: '', //class value from form
      quarter: 3, //0: fall, 1: winter, 2: spring, 3: summer
      year: ''
    };

    this.changeClass = this.changeClass.bind(this);
    this.changeQuarter = this.changeQuarter.bind(this);
    this.changeYear = this.changeYear.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  //user enters class value
  changeClass(event){
    this.setState({class: event.target.value.trim()});
  }

  changeQuarter(event){
    this.setState({quarter: parseInt(event.target.value)});
  }

  changeYear(event){
    this.setState({year: parseInt(event.target.value)});
  }

  //form submission->post request to server
  handleSubmit(event){
    const newClass = {class: this.state.class, quarter: this.state.quarter, year: this.state.year};
    this.submitClass({class: this.state.class, token: this.props.token,
      quarter: this.state.quarter, year: this.state.year}) //send all form data to server
      .then(res => {
          this.setState({response: res.express, class: '', quarter: 3, year: ''});
          this.props.onSubmit(newClass.class, res._id, newClass.quarter, newClass.year);
      }).catch(err => console.log(err));
    event.preventDefault(); //prevent default page reload
  }

  //make post call to server
  submitClass = async (data) => {
    const response = await fetch('/api/submitClass', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({class: data.class, token: data.token, quarter: data.quarter,
        year: data.year})
    });

    const body = await response.json();

    if(response.status !== 200) throw Error(body.message);

    return body;
  }

  render() {
    return (
      <div className="classInput">
        <header className="classInput-header">

          <div className="input">
            <form id="classform" onSubmit = {this.handleSubmit}>
              <div className="classInfo">
                <div className="title">
                  <b>Class</b>
                </div>
                <div  className="class">
                  <input type="text" value={this.state.class} onChange={this.changeClass} placeholder="Course ID"/>
                </div>
                <div className="quarter"> 
                  <select value={this.state.quarter} onChange={this.changeQuarter} className="quarter">
                    <option value="3">Fall</option>
                    <option value="2">Winter</option>
                    <option value="1">Spring</option>
                    <option value="0">Summer</option>
                  </select>
                  <div className="year">
                    <input type="number" value={this.state.year} onChange={this.changeYear} placeholder="Year"/>
                  </div>
                </div>
              </div>
              <div className="submit">
                <input type="submit" className="submit" value="Submit" />
              </div>
            </form>
          </div>

        </header>
      </div>
    );
  }
}

export default ClassInput;