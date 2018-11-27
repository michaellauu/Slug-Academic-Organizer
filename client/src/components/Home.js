// Code is used from @Keithweaver_ on medium.com

import React, { Component } from "react";
import {
  Container,
  Col,
  Form,
  FormGroup,
  FormFeedback,
  Label,
  Input,
  Button,
  ButtonGroup
} from 'reactstrap';
// import { Link } from 'react-router-dom';
import "whatwg-fetch";

import { getFromStorage, setInStorage } from "./storage";
import './Home.css';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      signInValid: true,
      signUpValid: true,
      isLoading: true,
      token: "",
      signUpError: "",
      signInError: "",
      signInUsername: "",
      signInPassword: "",
      signUpUsername: "",
      signUpPassword: ""
    };

    this.onRadioBtnClick = this.onRadioBtnClick.bind(this);

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
              isLoading: false,
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

  onRadioBtnClick(rSelected) {
    this.setState({ rSelected });
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
            isLoading: false,
            signUpValid: true,
            signUpUsername: "",
            signUpPassword: ""
          });
        } else {
          this.setState({
            signUpError: json.message,
            isLoading: false,
            signUpValid: false,
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
            isLoading: false,
            signInValid: true,
            signInPassword: "",
            signInUsername: "",
            token: json.token
          });
        } else {
          this.setState({
            signInError: json.message,
            isLoading: false,
            signInValid: false,
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
      signInUsername,
      signInPassword,
      signUpUsername,
      signUpPassword,
      signUpError,
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
        <>
          {(this.state.rSelected === 1 &&
            <div className="signInForm">
              <Container className="signIn">
                <div className="text-right">
                  <ButtonGroup className="signInButtons">
                    <Button color="primary" onClick={() => this.onRadioBtnClick(1)} active={this.state.rSelected === 1}>Sign In</Button>
                    <Button color="primary" onClick={() => this.onRadioBtnClick(2)} active={this.state.rSelected === 2}>Sign Up</Button>
                  </ButtonGroup>
                </div>
                <h2 className="sign-in">Sign In</h2>
                <Form>
                  <Col>
                    <FormGroup>
                      <Label><b>Username</b></Label>
                      <Input
                        type="username"
                        placeholder="Username"
                        value={signInUsername}
                        onChange={this.onTextboxChangeSignInUsername}
                        invalid={this.state.signInValid === false}
                      />
                      <FormFeedback signInValid>
                        {signInError}
                      </FormFeedback>
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <Label><b>Password</b></Label>
                      <Input
                        type="password"
                        placeholder="Password"
                        value={signInPassword}
                        onChange={this.onTextboxChangeSignInPassword}
                        invalid={this.state.signInValid === false}
                      />
                    </FormGroup>
                    <FormFeedback signInValid>
                      {signInError}
                    </FormFeedback>
                  </Col>
                  <div className="submit-button">
                    <Button onClick={this.onSignIn}>Sign In</Button>
                  </div>
                </Form>
              </Container>
            </div>) || (
              <div className="signUpForm">
                <Container className="signUp">
                  <div className="text-right">
                    <ButtonGroup>
                      <Button color="primary" onClick={() => this.onRadioBtnClick(1)} active={this.state.rSelected === 1}>Sign In</Button>
                      <Button color="primary" onClick={() => this.onRadioBtnClick(2)} active={this.state.rSelected === 2}>Sign Up</Button>
                    </ButtonGroup>
                  </div>
                  {signUpError ? <p>{signUpError}</p> : null}
                  <h2 className="sign-up">Sign Up</h2>
                  <Form>
                    <Col>
                      <FormGroup>
                        <Label><b>Username</b></Label>
                        <Input
                          type="username"
                          placeholder="Username"
                          value={signUpUsername}
                          onChange={this.onTextboxChangeSignUpUsername}
                          invalid={this.state.signUpValid === false}
                        />
                        <FormFeedback signUpValid>
                          {signUpError}
                        </FormFeedback>
                      </FormGroup>
                    </Col>
                    <Col>
                      <FormGroup>
                        <Label><b>Password</b></Label>
                        <Input
                          type="password"
                          placeholder="Password"
                          value={signUpPassword}
                          onChange={this.onTextboxChangeSignUpPassword}
                          invalid={this.state.signUpValid === false}
                        />
                        <FormFeedback signUpValid>
                          {signUpError}
                        </FormFeedback>
                      </FormGroup>
                    </Col>
                    <div className="submit-button">
                      <Button onClick={this.onSignUp}>Sign Up</Button>
                    </div>
                  </Form>
                </Container>
              </div>
            )
          }
        </>
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
