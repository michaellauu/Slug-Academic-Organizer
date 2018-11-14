import React, { Component } from "react";
import { Row, Col, Container } from "reactstrap";
import '../../styles/Major.css';
import ClassDataTooltips from "./ClassDataTooltips";

const upperDivs = {
    CMPS101: false,
    CMPE110: false,
    CMPS111: false,
    CMPS102: false,
    CMPS112: false,
    AMS131: false,
    CMPE107: false
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

const dcClasses = {
    CMPS115: false,
    CMPS132W: false,
    CMPS180W: false,
    CMPS185: false,
    CMPS195: false,
    CMPE185: false
};

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

export default class Electives extends Component {
    constructor(props) {
        super(props);

        this.state = {
            classes: [],
            cmpmData:{},
            mathData: {},
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
    }

    componentDidMount() {
        this.makePostForClassData(mathElectives)
            .then(res => this.setState({ mathData: res }))
            .catch(err => console.log(err));

        this.makePostForClassData(cmpmElectives)
            .then(res => this.setState({ cmpmData: res }))
            .catch(err => console.log(err));
    }

    // Post call to the database to get the user classes
    makePostForClassData = async (classes) => {
        const response = await fetch('/api/getMajorClassData', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ classes: classes })
        });

        const body = await response.json();

        if (response.status !== 200) throw Error(body.message);

        console.log(body);

        return body;
    };

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
                                <React.Fragment key={i}>
                                    <ClassDataTooltips id={course} text={course} classData={this.state.mathData[course]} /><br key={i} />
                                </React.Fragment>
                            ))}
                        </Col>
                        <Col>
                            <h5>Computational Media Electives</h5>
                            {Object.keys(cmpmElectives).map((course, i) => (
                                <React.Fragment key={i}>
                                    <ClassDataTooltips id={course} text={course} classData={this.state.cmpmData[course]} /><br key={i} /
                                ></React.Fragment>
                            ))}
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}