import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from "reactstrap";
import "../styles/NavBar.css";
// import SignIn from "./Home";
// import GERequirements from "./GERequirements";
// import ClassLogging from "./ClassLogging";
// import Calendar from "./Calendar";
// import PNPProgress from "./PNPProgress";
// import GPACalculator from "./GPACalculator";
// import "../styles/NavBar.css";

export default class NavBar extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: true
    };
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    return (
      <div>
        <Navbar color="faded" light expand="md" role="navigation">
          <div className="home-link">
            <NavbarBrand tag={Link} to="/" className="mr-auto">
              Slug Organizer
            </NavbarBrand>
          </div>
          <NavbarToggler onClick={this.toggle} className="mr-2" />
          <Collapse isOpen={!this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem className="link-1">
                <NavLink tag={Link} to="/">
                  Sign In
                </NavLink>
              </NavItem>
              <NavItem className="link-2">
                <NavLink tag={Link} to="/logging">
                  Class Logging
                </NavLink>
              </NavItem>
              <NavItem className="link-3">
                <NavLink tag={Link} to="/pnp">
                  Pass/No Pass
                </NavLink>
              </NavItem>
              <NavItem className="link-4">
                <NavLink tag={Link} to="/gpa">
                  GPA Calculator
                </NavLink>
              </NavItem>
              <NavItem className="link-5">
                <NavLink tag={Link} to="/ge">
                  GE Requirements
                </NavLink>
              </NavItem>
              <NavItem className="link-6">
                <NavLink tag={Link} to="/calendar">
                  Calendar
                </NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

// {
//   /* <div>
//           <h1>Slug Academic Organizer</h1>
//           <ul className="header">
//             <li>
//               <NavLink exact to="/">
//                 Sign In
//               </NavLink>
//             </li>
//             <li>
//               <NavLink to="/logging">Class Logging</NavLink>
//             </li>
//             <li>
//               <NavLink to="/pnp">Pass/No Pass Percentage</NavLink>
//             </li>
//             <li>
//               <NavLink to="/gpa">GPA Calculator</NavLink>
//             </li>
//             <li>
//               <NavLink to="/ge">GE Requirements</NavLink>
//             </li>
//             <li>
//               <NavLink to="/calendar">Calendar</NavLink>
//             </li>
//           </ul> */
// }
// {
//   /* <div className="content">
//             <Route exact path="/" component={SignIn} />
//             <Route path="/logging" component={ClassLogging} />
//             <Route path="/pnp" component={PNPProgress} />
//             <Route path="/gpa" component={GPACalculator} />
//             <Route path="/ge" component={GERequirements} />
//             <Route path="/calendar" component={Calendar} />
//           </div> */
// }
// {
//   /* </div> */
// }

// export default NavBar;
