import React, { Component } from "react";
import { Jumbotron, Container, Button, Media} from 'reactstrap';
import "../styles/Landing.css";
import Grades from "../images/Grades2.png";
import Calendar from "../images/Calendar.png";
import Major from "../images/Major.png";

const style = {
  height: '100%',
  width: '100%',
  objectfit: 'contain'
}

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
         <Button className="leadButton" href= "/account" >Start Planning</Button>
        </p>
       </Container>
      </Jumbotron>
      
     <div className="infoContainer">
       <div className="Plan">
          <Media className="img" left top href="/calendar">
            <img src={Calendar} style={style} alt="Calendar" />
          </Media>
          <Media className="desc" body>
            <Media heading>
              Plan Your Schedule
            </Media>
            Add classes and plan your quarterly calendar. View all tracked classes whether you prefer a daily, weekly, or monthly schedule.
          </Media>
        </div>
      <hr className="divider"/>
      <div className="Record">
        <Media className="GPADesc desc" body>
          <Media heading>
            Record Your Classes
          </Media>
          Record your academic history and current classes. Calculate your cummulative GPA, quarterly GPA, and Pass/No Pass percentage.
        </Media>
        <Media className="GPAimg img" right top href="/grades">
          <img src={Grades} style={style} alt="Grades" />
        </Media>
       </div>
      <hr className="divider"/>
      <div className="Track">
        <Media className="img" left top href="/major">
          <div className="column">
            <img src={Major} style={style} alt="Major" />
          </div>
        </Media>
        <Media className="desc" body>
          <Media heading>
            Track Your Progress
          </Media>
          Track your progress towards your degree, including General Education Requirements and Major Requirements.
        </Media>
      </div>
     </div>
    </div>

  );
};



export default Landing;
