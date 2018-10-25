import React, { Component } from 'react';
import './ClassInput.css';

class ClassInput extends Component {

  constructor(props){
    super(props);
    this.state = {
      response: '', //server response
      class: '', //class value from form
    };

    this.changeClass = this.changeClass.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  //user enters class value
  changeClass(event){
    this.setState({class: event.target.value.trim()});
  }
  //form submission->post request to server
  handleSubmit(event){
    this.submitClass({class: this.state.class, token: this.props.token}) //send all form data to server
      .then(res => this.setState({response: res.express, class: ''})) //then reset all states
      .catch(err => console.log(err));
    event.preventDefault(); //prevent default page reload
    this.props.onSubmit();
  }

  //make post call to server
  submitClass = async (data) => {
    const response = await fetch('/api/submitClass', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({class: data.class, token: data.token})
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
                  <input type="text" value={this.state.class} onChange={this.changeClass} />
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