import React, { Component } from "react";
import { Jumbotron, Container, Button, Media} from 'reactstrap';
import "../styles/Landing.css";
import Grades from "../images/Grades2.png";
import Calendar from "../images/Calendar.png";
import Major from "../images/Major.png";

var imgStyle = {
  maxHeight: "100%",
  maxWidth: "100%",
  minHeight: "100%",
  minWidth: "100%"
};

const Landing = (props) => {
  return (
    <div>
      <Jumbotron fluid>
       <Container fluid>
        <h1 className="title">Slug Organizer</h1>
         <p className="subtitle">Plan your academic career all in one place.</p>
          <hr className="divider"/>
           <p className="text">Slug Organizer is an academic planner that provides students with a clear and intuitive way to plan their courses and monitor progress towards their degree.</p>
          <p className="lead">
         <Button color="info" href= "/signin" >Start Planning</Button>
        </p>
       </Container>
      </Jumbotron>

     <div className="container-fluid">
       <Media className="Plan">
        <Media left top href="/calendar">
          <Media object src={Calendar} style={imgStyle} alt="Calendar" />
        </Media>
          <Media body>
           <Media heading>
            Plan Your Schedule
          </Media>
          Add classes and plan your quarterly calendar. View all tracked classes whether you prefer a daily, weekly, or monthly schedule.
      </Media>
    </Media>
      <hr className="divider"/>
      <Media className="Record">
        <Media body>
          <Media heading>
            Record Your Classes
          </Media>
          Record your academic history and current classes. Calculate your cummulative GPA, quarterly GPA, and Pass/No Pass percentage.
        </Media>
        <Media right top href="/grades">
          <Media object src={Grades} style={imgStyle} alt="Grades" />
        </Media>
       </Media>
      <hr className="divider"/>
      <Media className="Track">
       <Media left top href="/major">
       <div className="column">
        <Media object src={Major} style={imgStyle} alt="Major" />
        </div>
      </Media>
        <Media body>
          <Media heading>
           Track Your Progress
          </Media>
          Track your progress towards your degree, including General Education Requirments and Major Requirments.
        </Media>
      </Media>
     </div>
    </div>

  );
};



export default Landing;
