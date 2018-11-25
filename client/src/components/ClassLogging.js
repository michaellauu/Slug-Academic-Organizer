import React, { Component } from "react";
import "../styles/ClassLogging.css";
import { getFromStorage } from "./storage";
import { Button, UncontrolledCollapse } from "reactstrap";
import SearchCourse from "./SearchCourse";

class ClassLogging extends Component {
  constructor(props) {
    super(props);
    this.state = {
      response: "", //server response
      classes: {},
      isLoading: false,
      userID: ""
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.delete = this.delete.bind(this);
  }

  // Send request to server to delete the class
  delete(_id, idx, quarter, year) {
    this.deletePost(_id)
      .then(res => this.setState({ response: res.express }))
      .catch(err => console.log(err));
    //remove the class from the state
    var newClasses = this.state.classes;
    newClasses[year][quarter].splice(idx, 1);
    const size =
      newClasses[year][0].length +
      newClasses[year][1].length +
      newClasses[year][2].length +
      newClasses[year][3].length;
    if (size === 0) {
      delete newClasses[year];
    }
    this.setState({ classes: newClasses });
  }

  // Called by ClassInput component when there's a submit, basically adds the new class to the state
  handleSubmit(newClass, _id, quarter, year, grade) {
    var newClasses = this.state.classes;
    if (year in newClasses) {
      newClasses[year][quarter].push({ courseID: newClass, _id: _id, grade: grade });
    } else {
      newClasses[year] = [[], [], [], []];
      newClasses[year][quarter].push({ courseID: newClass, _id: _id, grade: grade });
    }
    this.setState({ classes: newClasses });
    console.log(newClasses);
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

  // Post to delete the selected class from the server
  deletePost = async _id => {
    const response = await fetch("/api/deleteClass", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ _id: _id })
    });

    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);

    console.log(body);

    return body;
  };

  convertGrade(grade) {
    switch (grade) {
      case 0:
        return "A+";
      case 1:
        return "A";
      case 2:
        return "A-";
      case 3:
        return "B+";
      case 4:
        return "B";
      case 5:
        return "B-";
      case 6:
        return "C+";
      case 7:
        return "C";
      case 8:
        return "C-";
      case 9:
        return "D+";
      case 10:
        return "D";
      case 11:
        return "D-";
      case 12:
        return "F";
      case 13:
        return "W";
      case 14:
        return "N/A";
      case 15:
        return "Pass";
      case 16:
        return "No Pass";
      default:
        return "error";
    }
  }

  changeGrade = (_id, idx, quarter, year) => (event) => {
    let classes = this.state.classes;
    classes[year][quarter][idx].grade = parseInt(event.target.value);
    this.editPost({ _id: _id, grade: parseInt(event.target.value) });
    this.setState({ classes: classes });
  }

  editPost = async data => {
    const response = await fetch("/api/editGrade", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ _id: data._id, grade: data.grade })
    });

    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);

    console.log(body);

    return body;
  };

  render() {
    if (!this.state.isLoading) {
      return (
        <div className="logContainer">
          <div className="searchCol">
            <SearchCourse
              onSubmit={this.handleSubmit}
              userID={this.state.userID}
            />
          </div>
          <div className="logCol">
            {Object.keys(this.state.classes)
              .slice(0)
              .reverse()
              .map((year, idx) => {
                return (
                  <>
                    <div key={idx} className="classLog">
                      <div key={idx}>
                        <Button className="yearButton" id={"id" + year + idx}>{year}</Button>
                      </div>
                      <UncontrolledCollapse toggler={"id"+year+idx}>
                        {this.state.classes[year].map((i, quarter) => {
                          return (
                            <div key={quarter}>
                              <div className="quarter" key={quarter}>
                                {quarter === 0 && this.state.classes[year][quarter].length !== 0 && (<td><b>Fall</b></td>)}
                                {quarter === 1 && this.state.classes[year][quarter].length !== 0 && (<td><b>Summer</b></td>)}
                                {quarter === 2 && this.state.classes[year][quarter].length !== 0 && (<td><b>Spring</b></td>)}
                                {quarter === 3 && this.state.classes[year][quarter].length !== 0 && (<td><b>Winter</b></td>)}
                              </div>
                              <div className={this.state.classes[year][quarter].length!==0 ? 'quarterClassContainer' : 'empty'}>
                                {this.state.classes[year][quarter].map(
                                  (userClass, classIdx) => {
                                    return (
                                      <div className="classContainer" key={classIdx}>
                                        <div className="courseID" key={classIdx}>
                                          {userClass.courseID}
                                        </div>
                                        <div className="gradeSelect">
                                          {"Grade: "}
                                          <select
                                            value={userClass.grade}
                                            onChange={this.changeGrade(userClass._id, classIdx, quarter, year)}
                                            className="grade"
                                          >
                                            <option value="0">A+</option>
                                            <option value="1">A</option>
                                            <option value="2">A-</option>
                                            <option value="3">B+</option>
                                            <option value="4">B</option>
                                            <option value="5">B-</option>
                                            <option value="6">C+</option>
                                            <option value="7">C</option>
                                            <option value="8">C-</option>
                                            <option value="9">D+</option>
                                            <option value="10">D</option>
                                            <option value="11">D-</option>
                                            <option value="12">F</option>
                                            <option value="13">W</option>
                                            <option value="14">Not Completed</option>
                                            <option value="15">Pass</option>
                                            <option value="16">No Pass</option>
                                          </select>
                                        </div>
                                        <div className="deleteButton">
                                          <Button key={classIdx} onClick={() => { this.delete(userClass._id, classIdx, quarter, year); }}>
                                            Delete
                                            </Button>
                                        </div>
                                      </div>
                                    );
                                  }
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </UncontrolledCollapse>
                    </div>
                    <br />
                  </>
                );
              })}
          </div>
        </div >
      );
    } else {
      return (
        <div className="Loading">
          <p> loading ... </p>
        </div>
      );
    }
  }
}
export default ClassLogging;
