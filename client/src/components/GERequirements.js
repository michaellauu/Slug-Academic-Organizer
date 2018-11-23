import React, { Component } from "react";
import "../styles/GERequirements.css";
import { getFromStorage } from './storage';

class GERequirements extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ge: [], //server response,
      userID: '',
      classes: {}
    };
  }

  //makes get request to server after the component mounts
  componentDidMount() {
    this.callApi()
      .then(res => this.setState({ ge: res }))
      .catch(err => console.log(err));
    // Stolen from Michael's code: verifies the token and gets the userID
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
            this.makePost(json.userId)
              .then(res => this.setState({ classes: res }))
              .catch(err => console.log(err));
          }
        });
    }
  }

  callApi = async () => {
    const response = await fetch("/api/GERequirements");
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);
    console.log(body);
    return body;
  };

  // Post call to the database to get the user classes
  makePost = async (userID) => {
    const response = await fetch('/api/geClasses', {
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
        <h3 className="pageTitle">GE Requirements</h3>
        <table>
          {this.state.ge.map(function(current, index) {
            return (
                <tbody className="GETable" key={index}>
                  <tr>
                    <td className="category">
                      <b>GE ID:</b>
                    </td>
                    <td className="GE">{current.geID}</td>
                  </tr>
                  <tr>
                    <td className="category">
                      <b>Description:</b>
                    </td>
                    <td className="GE">{current.desc}</td>
                  </tr>
                  <tr>
                    <td className="category">
                      <b>Credits:</b>
                    </td>
                    <td className="GE">{current.credits}</td>
                  </tr>
                </tbody>
            );
          })}
        </table>
      </div>
    );
  }
}

export default GERequirements;
