import React, { Component } from "react";
import { getFromStorage } from './storage';

export default class Account extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userID: '',
	  username: '',
    };
  }

  componentDidMount() {
    // get acc id
    const obj = getFromStorage('the_main_app');
    if (obj && obj.token) {
      const { token } = obj;
      // Verify token
      fetch('/api/account/verify?token=' + token)
        .then(res => res.json())
        .then(json => {
          // Store the userID in the state
          if (json.success) {
            this.setState({
              userID: json.userId,
              isLoading: false
            });
            // Get the user classes from the database
            this.getUsername(json.userId)
              .then(res => this.setState({ username: res }))
              .catch(err => console.log(err));
          }
        });
    }
  }

  // Post call to the database to get the user classes
  getUsername = async (userID) => {
    const response = await fetch('/api/account/info', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
	  body: JSON.stringify({ userID: userID })
	});
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
	console.log(body);
    return body;
  };

  render() {
    return (
      <div>
	    <p>userID: {this.state.userID}</p> <br />
        <p>username: {this.state.username}</p> <br />
      </div>
    );
  }
}