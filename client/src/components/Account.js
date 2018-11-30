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
export default class Account extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userID: '',
	  username: '',
	  checkPassword: "",
      changePassword: "",
	  checkPasswordError: "",
	  changePasswordError: "",
    };
	
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
      checkPassword,
      changePassword,
	  checkPasswordError,
	  changePasswordError
    } = this.state;
    return (
      <div>
	    <p>userID: {this.state.userID}</p> <br />
        <p>username: {this.state.username}</p> <br />
			<Form>
                <Col>
                    <FormGroup>
                      <Label className="password"><b>Current</b></Label>
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
                        invalid={this.state.changePasswordError != null || this.state.checkPasswordError != null}
                      />
                      <FormFeedback invalid>
                        {changePasswordError}
					  </FormFeedback>
                    </FormGroup>
                  </Col>
                  <div className="submit-button">
                    <Button onClick={this.onChange}>Change Password</Button>
                  </div>
                </Form>
      </div>
    );
  }
}