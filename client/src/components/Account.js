import React, { Component } from "react";
import { getFromStorage } from './storage';
import {
  Col,
  Form,
  FormGroup,
  FormFeedback,
  Label,
  Input,
  Button,
} from 'reactstrap';
import {Redirect } from 'react-router'
export default class Account extends Component {

  constructor(props) {
    super(props);
    this.state = {
	  toHome: false,
	  isLoading: false,
      userID: '',
	  username: '',
	  checkPassword: "",
      changePassword: "",
	  checkPasswordError: "",
	  changePasswordError: "",
	  changePasswordSucces: "",
    };
	this.onChange = this.onChange.bind(this);
	this.logout = this.logout.bind(this);
    this.onTextboxChangecheckPassword = this.onTextboxChangecheckPassword.bind(this);
    this.onTextboxChangechangePassword = this.onTextboxChangechangePassword.bind(this);
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
              .then(res => this.setState({ username: res.username }))
              .catch(err => console.log(err));
          }
        });
    }
  }

  // Post call to the database to get the username
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
  
  // logout api call
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
              isLoading: false,
			  toHome: true
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
  
  //change password
  onChange() {
    // Grab state
    const { userID, username, checkPassword, changePassword } = this.state;
    this.setState({
      isLoading: true
    });

      // Post request to backend to change password
   fetch("/api/account/changePassword", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
		userID: userID,
		username: username,
        checkPassword: checkPassword,
        changePassword: changePassword
      })
    })
      .then(res => res.json())
      .then(json => {
        console.log("json", json);
        if (json.success) {
          this.setState({
            isLoading: false,
			checkPassword: '',
			changePassword: '',
			checkPasswordError: null,
			changePasswordError: null,
			changePasswordSuccess: json.changePasswordSuccess
			
          });
        } else {
          this.setState({
			checkPasswordError: json.checkPasswordError,
			changePasswordError: json.changePasswordError,
			changePasswordSuccess: null,
            isLoading: false
          });
        }
      });
  }

  onTextboxChangecheckPassword(event) {
    this.setState({
      checkPassword: event.target.value
    });
  }

  onTextboxChangechangePassword(event) {
    this.setState({
     changePassword: event.target.value
    });
  }

  render() {
	const {
	  userID,
      checkPassword,
      changePassword,
	  checkPasswordError,
	  changePasswordError,
	  changePasswordSuccess,
    } = this.state;
	
	if (this.state.toHome === true) {
      return <Redirect to='/' />
	}
	
    if(userID) return (
      <div>
	    <p>userID: {this.state.userID}</p>
        <p>username: {this.state.username}</p> <br />
			<Form>
                <Col>
                    <FormGroup>
                      <Label className="password"><b>Current Password</b></Label>
                      <Input
                        type="password"
                        placeholder="Current Password"
                        value={checkPassword}
                        onChange={this.onTextboxChangecheckPassword}
                        invalid={this.state.checkPasswordError != null || this.state.changePasswordError != null}
                      />
                      <FormFeedback invalid>
                        {checkPasswordError}
                      </FormFeedback>
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <Label className="password2"><b>New Password</b></Label>
                      <Input
                        type="password"
                        placeholder="New Password"
                        value={changePassword}
                        onChange={this.onTextboxChangechangePassword}
                        invalid={this.state.changePasswordError != null || this.state.checkPasswordError != null
						|| this.state.changePasswordSuccess}
                      />
                      <FormFeedback invalid>
                        {changePasswordError}{changePasswordSuccess}
					  </FormFeedback>
                    </FormGroup>
                  </Col>
                  <div className="submit-button">
                    <Button onClick={this.onChange}>Change Password</Button>
                  </div>
				  <div className="logout-button">
					<Button onClick={this.logout}>Logout</Button>
				  </div>
                </Form>
      </div>
    );
	else return(
	<p>You shouldn't be here</p>
	)
  };
}