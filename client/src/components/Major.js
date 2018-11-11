import React, { Component } from "react";
import { getFromStorage } from './storage';
import { Button, Row, Col, Container } from "reactstrap";
import './Major.css';
import { isThisMinute } from "date-fns";

/* 
 * This component displays the major requirement page for 
 * Computer Science B.S. . Eventually, we will create a process to 
 * generate layouts that work for all majors, but until we figure 
 * that out, a single major page will work.
 */
// Add dropdown to select major
export default class Major extends Component {
  // Initial Database -> Page setup -- Anthony

  constructor(props) {
    super(props);

    this.state = {
      userID: '',
      classes: []
    };
  }

  componentDidMount() {
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

  // Post call to the database to get the user classes
  makePost = async (userID) => {
    const response = await fetch('/api/majorClasses', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ userID: userID })
    });

    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);

    //console.log(body);

    return body;
  };

  render() {
    return (
      <div>
        <LowerDiv classes={this.state.classes} /> <br />
        <UpperDiv classes={this.state.classes} /> <br />
        <Electives classes={this.state.classes} /> <br />
        <Capstone classes={this.state.classes} /> <br />
        <DC classes={this.state.classes} />
      </div>
    );
  }
}

function parseTakenClasses(taken, classes) {
  for (var i = 0; i < classes.length; i++) {
    if (classes[i].courseID in taken) {
      taken[classes[i].courseID] = true;
    }
  }
  return taken;
}

class LowerDiv extends Component {
  constructor(props) {
    super(props);
    this.state = {
      classes: [],
      taken: {
        CMPS12A: false,
        CMPS12L: false,
        CMPS5J: false,
        CMPS11: false,
        CMPE13: false,
        CMPE13L: false,
        CMPS12B: false,
        CMPS12M: false,
        CMPS13H: false,
        CMPS13L: false,
        MATH19A: false,
        MATH19B: false,
        MATH20A: false,
        MATH20B: false,
        CMPE16: false,
        MATH23A: false,
        AMS10: false,
        MATH21: false,
        CMPE12: false,
        CMPE12L: false
      }
    };

    this.regularIntroTrackCompleted = this.regularIntroTrackCompleted.bind(this);
    this.introProgrammingCompleted = this.introProgrammingCompleted.bind(this);
    this.dataStructuresCompleted = this.dataStructuresCompleted.bind(this);
    this.calc1Completed = this.calc1Completed.bind(this);
    this.calc2Completed = this.calc2Completed.bind(this);
    this.linearAlgCompleted = this.linearAlgCompleted.bind(this);
    this.MATHCompleted = this.MATHCompleted.bind(this);
  }

  componentWillReceiveProps = (nextProps) => {
    this.setState({ classes: nextProps.classes });
    let taken = this.state.taken;
    taken = parseTakenClasses(taken, nextProps.classes)
    this.setState({ taken: taken });
  }

  regularIntroTrackCompleted = () => {
    if (this.state.taken['CMPS12A'] && this.state.taken['CMPS12L']) {
      return true;
    } else if (this.state.taken['CMPS11']) {
      return true;
    } else if (this.state.taken['CMPE13'] && this.state.taken['CMPE13L']) {
      return true;
    }
    return false;
  }

  dataStructuresCompleted = () => {
    return (this.state.taken['CMPS12B'] && this.state.taken['CMPS12M']);
  }

  introProgrammingCompleted() {
    return ((this.regularIntroTrackCompleted() && this.dataStructuresCompleted()) ||
     (this.state.taken['CMPS13H'] && this.state.taken['CMPS13L']));
  }

  calc1Completed = () => {
    return (this.state.taken['MATH19A'] || this.state.taken['MATH20A']);
  }

  calc2Completed = () => {
    return (this.state.taken['MATH19B'] || this.state.taken['MATH20B']);
  }

  linearAlgCompleted = () => {
    return (this.state.taken['MATH21'] || this.state.taken['AMS10']);
  }

  MATHCompleted = () => {
    return (this.calc1Completed() && this.calc2Completed() && this.linearAlgCompleted() &&
     this.state.taken['CMPE16'] && this.state.taken['MATH23A'])
  }

  render() {
    console.log(this.state);
    return (
      <div className="lowerDivs">
        <Container>
          <h3>Lower Division Requirements</h3>
          <Row>
            <b>Intro To Programming</b>
          </Row>
          <div className={this.introProgrammingCompleted() ? 'completed' : 'uncompleted'}>
            <Row>
              <Col sm={{ size: "auto" }}>
                <div className="introProgramming">
                  <Container className={this.introProgrammingCompleted() ? 'completed' : 'uncompleted'}>
                    <b>Regular Track</b><br />
                    <Row className={this.regularIntroTrackCompleted() ? 'completed' : 'uncompleted'}>
                      <Col sm={{ size: "auto" }} >CMPS12A/L {this.state.taken['CMPS12A'] && this.state.taken['CMPS12L'] && <b>X</b>} </Col>
                      <Col sm={{ size: "auto" }}> or </Col>
                      <Col sm={{ size: "auto" }} >
                        <Row className={this.state.taken['CMPS5J'] ? 'completed' : 'uncompleted'}>
                          CMPS5J {this.state.taken['CMPS5J'] && <b>X</b>}
                        </Row>
                        <Row>and</Row>
                        <Row>CMPS11 {this.state.taken['CMPS11'] && <b>X</b>}</Row>
                      </Col>
                      <Col sm={{ size: "auto" }}> or </Col>
                      <Col sm={{ size: "auto" }} >CMPE13/L {this.state.taken['CMPE13'] && this.state.taken['CMPE13L'] && <b>X</b>} </Col>
                    </Row>
                    <Row className={this.state.taken['CMPS12B'] ? 'completed' : 'uncompleted'}>
                      <Col sm={{ size: "auto" }}>CMPS12B/M {this.state.taken['CMPS12B'] && this.state.taken['CMPS12M'] && <b>X</b>}</Col>
                    </Row>
                  </Container>
                </div>
              </Col>
              <Col sm={{ size: "auto" }}> <b>or</b> </Col>
              <Col sm={{ size: "auto" }}>
                <div className="honors">
                  <b>Honors Track</b><br />CMPS13H/L {this.state.taken['CMPS13H'] && this.state.taken['CMPS13L'] && <b>X</b>}
                </div>
              </Col>
            </Row>
          </div>
          <Row>
            <b>Math</b>
          </Row>
          <Container className={this.MATHCompleted() ? 'completed' : 'uncompleted'}>
            <Row>
              <Col sm={{ size: "auto" }}>
                <Row className={this.calc1Completed() ? 'completed' : 'uncompleted'}>
                  MATH19A {this.state.taken['MATH19A'] && <b>X</b>} &nbsp; &nbsp;
                </Row>
                <Row className={this.calc2Completed() ? 'completed' : 'uncompleted'}>
                  MATH19B {this.state.taken['MATH19B'] && <b>X</b>} &nbsp; &nbsp;
                </Row>
                <Row className={this.linearAlgCompleted() ? 'completed' : 'uncompleted'}>
                  AMS10 {this.state.taken['AMS10'] && <b>X</b>} &nbsp; &nbsp;
                </Row>
              </Col>
              <Col sm={{ size: "auto" }}>
                <Row className={this.calc1Completed() ? 'completed' : 'uncompleted'}>or</Row>
                <Row className={this.calc2Completed() ? 'completed' : 'uncompleted'}>or</Row>
                <Row className={this.linearAlgCompleted() ? 'completed' : 'uncompleted'}>or</Row>
              </Col>
              <Col>
                <Row className={this.calc1Completed() ? 'completed' : 'uncompleted'}>
                  MATH20A {this.state.taken['MATH20A'] && <b>X</b>}
                </Row>
                <Row className={this.calc2Completed() ? 'completed' : 'uncompleted'}>
                  MATH20B {this.state.taken['MATH20B'] && <b>X</b>}
                </Row>
                <Row className={this.linearAlgCompleted() ? 'completed' : 'uncompleted'}>
                  MATH21 {this.state.taken['MATH21'] && <b>X</b>}
                </Row>
              </Col>
            </Row>
          </Container>
          <div className="CE">
            <Row>
              <b>Computer Systems & Assembly Language</b><br />
            </Row>
            <Container>
              <Row>
                <Col className={this.state.taken['CMPE12'] ? 'completed' : 'uncompleted'}>
                  CMPE12/L {this.state.taken['CMPE12'] && this.state.taken['CMPE12L'] && <b>X</b>}
                </Col>
              </Row>
            </Container>
          </div>
        </Container>
      </div>
    );
  }
}


const upperDivs = {
  CMPS101: false,
  CMPE110: false,
  CMPS111: false,
  CMPS102: false,
  CMPS112: false,
  AMS131: false,
  CMPE107: false
}

class UpperDiv extends Component {
  constructor(props) {
    super(props);

    this.state = {
      classes: [],
      taken: {}
    };

    this.statisticsCompleted = this.statisticsCompleted.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ classes: nextProps.classes });
    let taken = upperDivs;
    taken = parseTakenClasses(taken, nextProps.classes)
    this.setState({ taken: taken });
  }

  statisticsCompleted = () => {
    return (this.state.taken['AMS131'] || this.state.taken['CMPE107']);
  }

  render() {
    return (
      <div className="upperDivs">
        <Container>

          <Row>
            <Col><h3>Upper Division Requirements</h3></Col>
          </Row>
          <Container>
            <Row>
              <Col className={this.state.taken['CMPS101'] ? 'completed' : 'uncompleted'}>
                CMPS101 {this.state.taken['CMPS101'] && <b>X</b>}
              </Col>
            </Row>
            <Row>
              <Col className={this.state.taken['CMPE110'] ? 'completed' : 'uncompleted'}>
                CMPE110 {this.state.taken['CMPE110'] && <b>X</b>}
              </Col>
            </Row>
            <Row>
              <Col className={this.state.taken['CMPS111'] ? 'completed' : 'uncompleted'}>
                CMPS111 {this.state.taken['CMPS111'] && <b>X</b>}
              </Col>
            </Row>
            <Row>
              <Col className={this.state.taken['CMPS102'] ? 'completed' : 'uncompleted'}>
                CMPS102 {this.state.taken['CMPS102'] && <b>X</b>}
              </Col>
            </Row>
            <Row>
              <Col className={this.state.taken['CMPS112'] ? 'completed' : 'uncompleted'}>
                CMPS112 {this.state.taken['CMPS112'] && <b>X</b>}
              </Col>
            </Row>
            <Row className={this.statisticsCompleted() ? 'completed' : 'uncompleted'}>
              <Col sm={{ size: "auto" }}>AMS131 {this.state.taken['AMS131'] && <b>X</b>}</Col>
              <Col sm={{ size: "auto" }}>or</Col>
              <Col>CMPE107 {this.state.taken['CMPE107'] && <b>X</b>}</Col>
            </Row>
          </Container>
        </Container>
      </div>
    );
  }
}

const capstoneClasses = {
  CMPS104B: false,
  CMPS117: false,
  CMPS161: false,
  CMPS161L: false,
  CMPS162: false,
  CMPS162L: false,
  CMPS165: false,
  CMPS181: false,
  CMPS183: false,
  CMPS184: false,
  CMPM172: false
};

class Capstone extends Component {
  constructor(props) {
    super(props);

    this.state = {
      classes: [],
      taken: {}
    };

    this.capstoneCompleted = this.capstoneCompleted.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    this.setState({ classes: nextProps.classes });
    let taken = capstoneClasses;
    taken = parseTakenClasses(taken, nextProps.classes)
    this.setState({ taken: taken });
  }

  capstoneCompleted = () => {
    return(this.state.taken['CMPS104B'] || this.state.taken['CMPS117'] || (this.state.taken['CMPS161'] && this.state.taken['CMPS161L']) ||
      (this.state.taken['CMPS162'] && this.state.taken['CMPS162L']) || this.state.taken['CMPS165'] || this.state.taken['CMPS181'] ||
      this.state.taken['CMPS183'] || this.state.taken['CMPS184'] || this.state.taken['CMPM172']);
  }

  render() {
    return (
      <div className="capstone">
        <Container>
          <Row>
            <Col>
              <h3>Capstone</h3>
              complete a Senior Thesis or one of the following classes: <br />
            </Col>
          </Row>
          <Row className={this.capstoneCompleted() ? 'completed' : 'uncompleted'}>
            <Col>
              CMPS104B {this.state.taken['CMPS104B'] && <b>X</b>} <br />
              CMPS117 {this.state.taken['CMPS117'] && <b>X</b>} <br />
              CMPS161/L {this.state.taken['CMPS161'] && this.state.taken['CMPS161L'] && <b>X</b>} <br />
              CMPS162/L {this.state.taken['CMPS162'] && this.state.taken['CMPS162L'] && <b>X</b>} <br />
              CMPS165 {this.state.taken['CMPS165'] && <b>X</b>} <br />
              CMPS181 {this.state.taken['CMPS181'] && <b>X</b>} <br />
              CMPS183 {this.state.taken['CMPS183'] && <b>X</b>} <br />
              CMPS184 {this.state.taken['CMPS184'] && <b>X</b>} <br />
              CMPM172 {this.state.taken['CMPM172'] && <b>X</b>}
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

const dcClasses = {
  CMPS115: false,
  CMPS132: false,
  CMPS132W: false,
  CMPS180: false,
  CMPS180W: false,
  CMPS185: false,
  CMPS195: false,
  CMPE185: false
};

class DC extends Component {
  constructor(props) {
    super(props);

    this.state = {
      classes: [],
      taken: {}
    };
    this.dcCompleted = this.dcCompleted.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ classes: nextProps.classes });
    let taken = dcClasses;
    taken = parseTakenClasses(taken, nextProps.classes)
    this.setState({ taken: taken });
  }

  dcCompleted = () => {
    return (this.state.taken['CMPS115'] || (this.state.taken['CMPS132'] && this.state.taken['CMPS132W']) || this.state.taken['CMPS185'] ||
      this.state.taken['CMPS195'] || this.state.taken['CMPE185']);
  }

  render() {
    return (
      <div className="DC">
        <Container>
          <Row>
            <Col>
              <h3>Disciplinary Communication</h3>
              complete one of the following classes: <br />
            </Col>
          </Row>
          <Row className={this.dcCompleted() ? 'completed' : 'uncompleted'}>
            <Col>
              CMPS115 {this.state.taken['CMPS115'] && <b>X</b>} <br />
              CMPS132W {this.state.taken['CMPS132'] && this.state.taken['CMPS132W'] && <b>X</b>} <br />
              CMPS180W {this.state.taken['CMPS180'] && this.state.taken['CMPS180W'] && <b>X</b>} <br />
              CMPS185 {this.state.taken['CMPS185'] && <b>X</b>} <br />
              CMPS195 {this.state.taken['CMPS195'] && <b>X</b>} <br />
              CMPE185 {this.state.taken['CMPE185'] && <b>X</b>}
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

const mathElectives = {
  AMS114: '',
  AMS132: '',
  AMS147: '',
  MATH115: '',
  MATH116: '',
  MATH117: '',
  MATH134: '',
  MATH148: '',
  MATH160: '',
  MATH161: ''
};

const cmpmElectives = {
  CMPM120: '',
  CMPM131: '',
  CMPM146: '',
  CMPM164: '',
  CMPM171: '',
  CMPM172: ''
};

const specialClassesOrLabs = {
  CMPS104A: false,
  CMPS104B: false,
  CMPS132W: true,
  CMPS160L: true,
  CMPS161L: true,
  CMPS162L: true,
  CMPS164L: true,
  CMPS166A: false,
  CMPS166B: false,
  CMPS180W: true,
  CMPS195: false
}

class Electives extends Component {
  constructor(props) {
    super(props);

    this.state = {
      classes: [],
      electives: [],
      additionalElectives: []
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ classes: nextProps.classes });
    var dc = false, capstone = false, electives = [], additionalElectives = [], additional = 0;
    for (var i = 0; i < nextProps.classes.length; i++) {
      const courseID = nextProps.classes[i].courseID;
      if (courseID in dcClasses) {
        if (dc) {
          if (electives.length < 2) {
            electives.push(courseID);
          } else {
            additionalElectives.push(courseID);
          }
        } else {
          dc = true;
        }
      } else if (courseID in capstoneClasses) {
        if (capstone) {
          if (electives.length < 2) {
            electives.push(courseID);
          } else {
            additionalElectives.push(courseID);
          }
        } else {
          capstone = true;
        }
      } else if (courseID in mathElectives && additional < 2) {
        additionalElectives.push(courseID);
        additional++;
      } else if (courseID in cmpmElectives && additional < 2) {
        electives.push(courseID);
        additional++;
      } else if (courseID in specialClassesOrLabs) {
        if (!specialClassesOrLabs[courseID]) {
          if (electives.length < 2) {
            electives.push(courseID);
          } else {
            additionalElectives.push(courseID);
          }
        }
      } else if (!(courseID in upperDivs)) {
        const csIdx = courseID.search('CMPS'), ceIdx = courseID.search('CMPE');
        const courseNum = courseID.slice(4);
        if (!isNaN(courseNum)) {
          if (ceIdx > -1 && additional < 2) {
            if (courseNum >= 100 && courseNum <= 190) {
              additional++;
              additionalElectives.push(courseID);
            }
          } else if (csIdx > -1) {
            if (courseNum >= 100 && courseNum <= 190) {
              if (electives.length < 2) {
                electives.push(courseID);
              } else {
                additionalElectives.push(courseID);
              }
            }
          }
        }
      }
    }
    this.setState({ electives: electives, additionalElectives: additionalElectives })
    console.log(electives, additionalElectives);
  }

  render() {
    return (
      <div className="electives">
        <Container>
          <Row>
            <Col>
              <h3>Upper Division Electives</h3>
              <Container>
                <div className="cmpsElective">
                  <Row>
                    <h5>CMPS Electives:</h5>
                    CS upper div 190 and below or CMPS195 <br />
                    <Container>
                      <Row className={this.state.electives.length > 0 ? 'completed' : 'uncompleted'}>
                        1: {this.state.electives.length > 0 && <>{this.state.electives[0]}</>}
                      </Row>
                      <Row className={this.state.electives.length > 1 ? 'completed' : 'uncompleted'}>
                        2: {this.state.electives.length > 1 && <>{this.state.electives[1]}</>}
                      </Row>
                    </Container>
                  </Row>
                </div>
                <div className="electives">
                  <Row>
                    <h5>Additional Electives:</h5>
                    CS/CE upper div 190 and below, CMPS195, or a course from the math or CMPM electives list <br />
                    <Container>
                      <Row className={this.state.additionalElectives.length > 0 ? 'completed' : 'uncompleted'}>
                        1: {this.state.additionalElectives.length > 0 && <>{this.state.additionalElectives[0]}</>}
                      </Row>
                      <Row className={this.state.additionalElectives.length > 1 ? 'completed' : 'uncompleted'}>
                        2: {this.state.additionalElectives.length > 1 && <>{this.state.additionalElectives[1]}</>}
                      </Row>
                    </Container>
                  </Row>
                </div>
              </Container>
            </Col>
            <Col>
              <h5>Mathematics Electives</h5>
              {Object.keys(mathElectives).map((course, i) => (
                <>{course}<br key={i} /></>
              ))}
            </Col>
            <Col>
              <h5>Computational Media Electives</h5>
              {Object.keys(cmpmElectives).map((course, i) => (
                <>{course}<br key={i} /></>
              ))}
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}