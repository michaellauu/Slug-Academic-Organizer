import React, { Component } from 'react';
import {Progress, Button} from 'reactstrap';
import { getFromStorage } from "./storage";
import  "../styles/PNPProgress.css";

class PNPProgress extends Component{
  constructor(props) {
    super(props);
    this.state = {
      response: "", // Server response
      isLoading: false,
      userID: "",
      classes: {},
      percentage: 0
    };

    this.calculatePNP = this.calculatePNP.bind(this);
  }

  // Makes get request to server after the component mounts
  componentDidMount() {
    // Stolen from Michael's code: verifies the token and gets the userID
    const obj = getFromStorage("the_main_app");
    if (obj && obj.token) {
      const { token } = obj;
      // Verify token
      fetch("/api/account/verify?token=" + token)
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
    this.callApi()
      .then(res => this.setState({ response: res.express }))
      .catch(err => console.log(err));
  }

  callApi = async () => {
    const response = await fetch("/");
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);

    return body;
  };

  // Post call to the database to get the user classes
  makePost = async userID => {
    const response = await fetch("/api/userClasses", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ userID: userID })
    });

    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);

    console.log(body);

    return body;
  };

  calculatePNP(){
    //pull all classes taken by user in database
    //loop through and sum all classes/classes taken pnp
    //return ((pnp / all classes) * 100).toFixed(1)
    var pnp = 0;
    var total = 0;
    var yearKeys = Object.keys(this.state.classes);
    var k = 0;

    for(k = 0; k < yearKeys.length; k++){
      var j = 0;

      for(j = 0; j < 4; j++){
        var i = 0;

        for(i = 0; i < this.state.classes[yearKeys[k]][j].length; i++){
          if(this.state.classes[yearKeys[k]][j][i].grade !== 13 && this.state.classes[yearKeys[k]][j][i].grade !== 14){
            total++;
          }
          if(this.state.classes[yearKeys[k]][j][i].grade === 15 || this.state.classes[yearKeys[k]][j][i].grade === 16){
            pnp++;
          }
        }
      }
    }
    this.setState({ percentage: ((pnp/total) * 100).toFixed(1) });
  }

  render() {
    return (
      <div>
        <div className="text-center">{this.state.percentage} of 25%</div>
        <Progress value={this.state.percentage} max="25"/>
        <Button className="calculatePNPButton" onClick={this.calculatePNP}>Calculate</Button>
      </div>
    );
  };
}
export default PNPProgress;
