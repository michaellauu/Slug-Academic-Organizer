import React, { Component } from "react";
import "./ClassLogging.css";
import ClassInput from "./ClassInput";
import {getFromStorage} from './storage';

class ClassLogging extends Component {
  constructor(props) {
    super(props);
    this.state = {
      response: "", //server response
      classes: {},
      isLoading: false,
      token: ''
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.delete = this.delete.bind(this);
  };

  delete(_id, idx, quarter, year) {
    this.deletePost(_id)
      .then(res => this.setState({ response: res.express }))
      .catch(err => console.log(err));
      var newClasses = this.state.classes;
      newClasses[year][quarter].splice(idx, 1);
      const size = newClasses[year][0].length+newClasses[year][1].length+newClasses[year][2].length
        +newClasses[year][3].length;
      if(size === 0){
        delete(newClasses[year]);
      }
      this.setState({classes: newClasses});
  };

  handleSubmit(newClass, _id, quarter, year) {
    var newClasses = this.state.classes;
    if(year in newClasses){
      newClasses[year][quarter].push({courseID: newClass, _id: _id});
    }else{
      newClasses[year] = [[],[],[],[]];
      newClasses[year][quarter].push({courseID: newClass, _id:_id});
    }
    this.setState({classes: newClasses});
    console.log(newClasses);
  };

  //makes get request to server after the component mounts
  componentDidMount() {
    const obj = getFromStorage('the_main_app');
    if (obj && obj.token) {
      const { token } = obj;
      // Verify token
      fetch('/api/account/verify?token=' + token)
        .then(res => res.json())
        .then(json => {
          if (json.success) {
            this.setState({
              token,
              isLoading: false
            });
              this.makePost(token)
                .then(res => this.setState({ classes: res }))
                .catch(err => console.log(err));
          } else {
            this.setState({
              isLoading: false,
            });
          }
        });
    } else {
      this.setState({
        isLoading: false,
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

  makePost = async (token) => {
    const response = await fetch('/api/userClasses', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({token: token})
    });

    const body = await response.json();

    if(response.status !== 200) throw Error(body.message);

    console.log(body);

    return body;
  };

  deletePost = async (_id) => {
    const response = await fetch('/api/deleteClass', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({_id: _id})
    });

    const body = await response.json();

    if(response.status !== 200) throw Error(body.message);

    console.log(body);

    return body;
  };

  render() {
    if(!this.state.isLoading){
      return (
        <div className="App">
          <div className="wrapper">
            <div className="one">
              <ClassInput onSubmit = {this.handleSubmit} token = {this.state.token}/>
            </div>
            <div className="two">
              <b>Year</b>
                {Object.keys(this.state.classes).slice(0).reverse().map((year, idx) => {
                  return (
                    <table key={idx} className="classLog">
                      <thead key={idx}>
                        <tr>
                          <th>
                            {year}
                          </th>
                        </tr>
                      </thead>
                        {this.state.classes[year].map((i, quarter) => {
                          return(
                            <tbody key={quarter}>
                              <tr key={quarter}>
                                {quarter === 3 && this.state.classes[year][quarter].length !== 0 &&
                                  <td><b>Fall</b></td>}
                                {quarter === 2 && this.state.classes[year][quarter].length !== 0 &&
                                  <td><b>Winter</b></td>}
                                {quarter === 1 && this.state.classes[year][quarter].length !== 0 &&
                                  <td><b>Spring</b></td>}
                                {quarter === 0 && this.state.classes[year][quarter].length !== 0 &&
                                  <td><b>Summer</b></td>}
                              </tr>
                              <>
                                {this.state.classes[year][quarter].map((userClass, classIdx) => {
                                  return(
                                    <tr key={classIdx}>
                                      <td key={classIdx}>
                                        {userClass.courseID}
                                      </td>
                                      <td>
                                        <button key={classIdx} onClick={() => {this.delete(userClass._id, classIdx, quarter, year)}}>
                                          Delete
                                        </button>
                                      </td>
                                    </tr >
                                  );
                                })}
                              </>
                            </tbody>
                          );
                        })}
                    </table>
                  );
                })}
            </div>
          </div>
        </div>
      );
    }else{
      return(
        <div className="Loading">
          <p> loading ... </p>
        </div>
      );
    }
  }
};
export default ClassLogging;