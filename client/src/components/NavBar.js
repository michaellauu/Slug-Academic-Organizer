import React, { Component } from "react";
import {
  Route,
  NavLink,
  HashRouter
} from "react-router-dom";
import SignIn from "./Home";
import ClassInput from "./ClassInput";
import GEReqs from "./GEReqs";
import MajorReqs from "./MajorReqs";
import "./NavBar.css";


class NavBar extends Component {
  render() {

    return (
      <HashRouter>
        <div>
          <h1>Slug Academic Organizer</h1>
          <ul className="header">
            <li><NavLink exact to="/">Sign In</NavLink></li>
            <li><NavLink to="/classinput">Class Input</NavLink></li>
            <li><NavLink to="/gereqs">GE Requirements</NavLink></li>
            <li><NavLink to="/majorreqs">Major Requirements</NavLink></li>
          </ul>
          <div className="content">
            <Route path="/classinput"component={ClassInput} />
            <Route exact path="/" component={SignIn} />
            <Route path="/gereqs" component={GEReqs} />
            <Route path="/majorreqs" component={MajorReqs} />
          </div>
        </div>
      </HashRouter>
    );
  }
}

export default NavBar;
