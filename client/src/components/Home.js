// Code is used from @Keithweaver_ on medium.com

import React, { Component } from "react";
// import { Link } from 'react-router-dom';
import "whatwg-fetch";

import { getFromStorage, setInStorage } from "./storage";

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      token: "",
	  signUpError: "",
	  signInError: "",
      signUpErrorUser: "",
	  signUpErrorPass: "",
	  signInErrorUser: "",
      signInErrorPass: "",
      signInUsername: "",
      signInPassword: "",
      signUpUsername: "",
      signUpPassword: ""
    };

    this.onTextboxChangeSignInUsername = this.onTextboxChangeSignInUsername.bind(
      this
    );
    this.onTextboxChangeSignInPassword = this.onTextboxChangeSignInPassword.bind(
      this
    );
    this.onTextboxChangeSignUpUsername = this.onTextboxChangeSignUpUsername.bind(
      this
    );
    this.onTextboxChangeSignUpPassword = this.onTextboxChangeSignUpPassword.bind(
      this
    );

    this.onSignIn = this.onSignIn.bind(this);
    this.onSignUp = this.onSignUp.bind(this);
    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    const obj = getFromStorage("the_main_app");
    if (obj && obj.token) {
      const { token } = obj;
      // Verify token
      fetch("/api/account/verify?token=" + token)
        .then(res => res.json())
        .then(json => {
          if (json.success) {
            this.setState({
              token,
              isLoading: false
            });
          } else {
            this.setState({
              isLoading: false
            });
          }
        });
    } else {
      this.setState({
        isLoading: false
      });
    }
  }

  onTextboxChangeSignInUsername(event) {
    this.setState({
      signInUsername: event.target.value
    });
  }

  onTextboxChangeSignInPassword(event) {
    this.setState({
      signInPassword: event.target.value
    });
  }

  onTextboxChangeSignUpUsername(event) {
    this.setState({
      signUpUsername: event.target.value
    });
  }

  onTextboxChangeSignUpPassword(event) {
    this.setState({
      signUpPassword: event.target.value
    });
  }

  onSignUp() {
    // Grab state
    const { signUpUsername, signUpPassword } = this.state;

    this.setState({
      isLoading: true
    });

    // Post request to backend
    fetch("/api/account/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: signUpUsername,
        password: signUpPassword
      })
    })
      .then(res => res.json())
      .then(json => {
        console.log("json", json);
        if (json.success) {
          this.setState({
			signUpError: json.message,
            signUpErrorUser: json.messageUser,
			signUpErrorPass: json.messagePass,
            isLoading: false,
			signInUsername: "",
            signInPassword: "",
            signUpUsername: "",
            signUpPassword: "",
			signInErrorUser: null,
			signInErrorPass: null
          });
        } else {
          this.setState({
			signUpError: json.message,
            signUpErrorUser: json.messageUser,
			signUpErrorPass: json.messagePass,
			signInUsername: "",
            signInPassword: "",
			signInErrorUser: null,
			signInErrorPass: null,
            isLoading: false
          });
        }
      });
  }

  onSignIn() {
    // Grab state
    const { signInUsername, signInPassword } = this.state;

    this.setState({
      isLoading: true
    });

    // Post request to backend
    fetch("/api/account/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: signInUsername,
        password: signInPassword
      })
    })
      .then(res => res.json())
      .then(json => {
        console.log("json", json);
        if (json.success) {
          setInStorage("the_main_app", { token: json.token });
          this.setState({
			signInError: json.message,
            signInErrorUser: json.messageUser,
			signInErrorPass: json.messagePass,
			signUpErrorUser: null,
			signUpErrorPass: null,
            isLoading: false,
            signInPassword: "",
            signInUsername: "",
			signUpPassword: "",
            signUpUsername: "",
            token: json.token
          });
        } else {
          this.setState({
			signInError: json.message,
            signInErrorUser: json.messageUser,
			signInErrorPass: json.messagePass,
			signUpPassword: "",
            signUpUsername: "",
			signUpErrorUser: null,
			signUpErrorPass: null,
            isLoading: false
          });
        }
      });
  }

  logout() {
    this.setState({
      isLoading: true
    });
    const obj = getFromStorage("the_main_app");
    if (obj && obj.token) {
      const { token } = obj;
      // Verify token
      fetch("/api/account/logout?token=" + token)
        .then(res => res.json())
        .then(json => {
          if (json.success) {
            this.setState({
              token: "",
              isLoading: false
            });
          } else {
            this.setState({
              isLoading: false
            });
          }
        });
    } else {
      this.setState({
        isLoading: false
      });
    }
  }

  render() {
    const {
      isLoading,
      token,
	  signInError,
	  signUpError,
      signInErrorUser,
	  signInErrorPass,
      signInUsername,
      signInPassword,
      signUpUsername,
      signUpPassword,
      signUpErrorUser,
	  signUpErrorPass
    } = this.state;

    if (isLoading) {
      return (
        <div>
          <p>Loading...</p>
        </div>
      );
    }

    if (!token) {
      return (
        <div>
          <div>
            <p>Sign In</p>
			{signInError ? <p>{signInError}</p> : null}
            {signInErrorUser ? <p>{signInErrorUser}</p> : null}
            <input
              type="username"
              placeholder="Username"
              value={signInUsername}
              onChange={this.onTextboxChangeSignInUsername}
            />
            <br />
			{signInErrorPass ? <p>{signInErrorPass}</p> : null}
            <input
              type="password"
              placeholder="Password"
              value={signInPassword}
              onChange={this.onTextboxChangeSignInPassword}
            />
            <br />
            <button onClick={this.onSignIn}>Sign In</button>
          </div>
          <br />
          <br />
          <div>
            <p>Sign Up</p>
			{signUpError ? <p>{signUpError}</p> : null}
            {signUpErrorUser ? <p>{signUpErrorUser}</p> : null}
            <input
              type="username"
              placeholder="Username"
              value={signUpUsername}
              onChange={this.onTextboxChangeSignUpUsername}
            />
            <br />
			{signUpErrorPass ? <p>{signUpErrorPass}</p> : null}
            <input
              type="password"
              placeholder="Password"
              value={signUpPassword}
              onChange={this.onTextboxChangeSignUpPassword}
            />
            <br />
            <button onClick={this.onSignUp}>Sign Up</button>
          </div>
        </div>
      );
    }

    return (
      <div>
        <p>Account</p>
        <button onClick={this.logout}>Logout</button>
      </div>
    );
  }
}

export default Home;
