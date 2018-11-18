import React, { Component } from "react";
import "../styles/GPACalculator.css";
import { Alert } from "reactstrap";
import { getFromStorage } from "./storage";


class GPACalculator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      response: "", // Server response
      quarter: 1, // 1: fall, 3: winter, 2: spring, 0: summer
      year: 2018,
      gpa: "0.0",
      gpatype: 0, // 0: cumulative, 1: quarterly
      yearError: "",
      isLoading: false,
      userID: "",
      classes: {}
    };

    this.changeQuarter = this.changeQuarter.bind(this);
    this.changeYear = this.changeYear.bind(this);
    this.handleCalculate = this.handleCalculate.bind(this);
    this.changeGPAType = this.changeGPAType.bind(this);
    this.changeGPA = this.changeGPA.bind(this);
  }

  // User changes quarter form
  changeQuarter(event) {
    this.setState({ quarter: parseInt(event.target.value) });
  }

  // User enters a year
  changeYear(event) {
    this.setState({ year: parseInt(event.target.value) });
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

  //GPA is updated
  changeGPA(event) {

    var newGPA = 0.0;

    var gpaCredits = new Array();
    gpaCredits[0] = 4.0;
    gpaCredits[1] = 4.0;
    gpaCredits[2] = 3.7;
    gpaCredits[3] = 3.3;
    gpaCredits[4] = 3.0;
    gpaCredits[5] = 2.7;
    gpaCredits[6] = 2.3;
    gpaCredits[7] = 2.0;
    gpaCredits[8] = 1.7;
    gpaCredits[9] = 1.3;
    gpaCredits[10] = 1.0;
    gpaCredits[11] = 0.7;
    gpaCredits[12] = 0.0;

    if (this.state.gpatype === 0){
      var yearKeys = Object.keys(this.state.classes);
      var k = 0;
      var total = 0;
      var achieved = 0;

      for(k = 0; k < yearKeys.length; k++){
        var j = 0;

        for(j = 0; j < 4; j++){
          var i = 0;
          for (i = 0; i < this.state.classes[yearKeys[k]][j].length; i++){
            var tempUnits = this.state.classes[yearKeys[k]][j][i].units;
            var units = 0;
            var grade = this.state.classes[yearKeys[k]][j][i].grade;
            if (grade != 13 && grade != 14 && grade != 15 && grade != 16){
              if(tempUnits === 0){
                units = 5;
                total += 5;
              }
              else if(tempUnits === 1){
                units = 2;
                total += 2;
              }
              else if(tempUnits === 2){
                units = 0;
                total += 0;
              }
              achieved = achieved + gpaCredits[grade] * units;
            }
          }
          newGPA = achieved / total;
        }
      }
    }
    else if (this.state.gpatype === 1){
      var i = 0;
      var total = 0;
      var achieved = 0;
      if (this.state.year in this.state.classes){
        for (i = 0; i < this.state.classes[this.state.year][this.state.quarter].length; i++){
          var tempUnits = this.state.classes[this.state.year][this.state.quarter][i].units;
          var units = 0;
          var grade = this.state.classes[this.state.year][this.state.quarter][i].grade;
          if (grade != 13 && grade != 14 && grade != 15 && grade != 16){
            if(tempUnits === 0){
              units = 5;
              total += 5;
            }
            else if(tempUnits === 1){
              units = 2;
              total += 2;
            }
            else if(tempUnits === 2){
              units = 0;
              total += 0;
            }
            achieved = achieved + gpaCredits[grade] * units;
          }
        }
        if(achieved === 0 && total === 0){
          newGPA = 0.0;
        }
        else{
          newGPA = achieved / total;
        }
      }
      else{
        newGPA = 0.0;
      }
    }

    this.setState({ gpa: newGPA.toFixed(1)});
  }

  // Form submission "Calculate"->pull request from server
  handleCalculate(event) {
    this.changeGPA(event);
  }

  // User selects GPA type
  changeGPAType(event) {
    this.setState({ gpatype: parseInt(event.target.value) });
  }

  render() {
    return (
      <div className="GPACalculator">
        <header className="GPACalculator-header">
          <div className="input">
            <form id="gpaform" onSubmit={this.handleCalculate}>
              <div className="GPAInfo">
                <div className="title">
                  <b>GPA</b>
                </div>
                <div className="gpatype">
                <select
                  value={this.state.gpatype}
                  onChange={this.changeGPAType}
                  className="gpatype"
                >
                <option value="0">Cumulative</option>
                <option value="1">Quarterly</option>
                </select>


                  <div className="quarter">
                    <select
                      value={this.state.quarter}
                      onChange={this.changeQuarter}
                      className="quarter"
                      disabled={this.gpatype === 0}
                    >
                      <option value="1" disabled={this.state.gpatype === 0}>Fall</option>
                      <option value="3" disabled={this.state.gpatype === 0}>Winter</option>
                      <option value="2" disabled={this.state.gpatype === 0}>Spring</option>
                      <option value="0" disabled={this.state.gpatype === 0}>Summer</option>
                    </select>
                    <div className="year">
                      <input
                        type="number"
                        value={this.state.year}
                        onChange={this.changeYear}
                        placeholder="Year"
                        disabled={this.state.gpatype === 0}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </form>
            <div>
            <b>Type = {this.state.gpatype}</b>
            </div>
            <button onClick={this.changeGPA}>Calculate</button>
            <div className="result">
              <b>{this.state.gpa}</b>
            </div>
            <div className="errors">
              {this.state.yearError.length !== 0 && (
                <Alert color="warning">
                  <b>{this.state.yearError}</b>
                </Alert>
              )}
            </div>
          </div>
        </header>
      </div>
    );
  }
}

export default GPACalculator;
