import React, { Component } from "react";
import ClassDataTooltips from "./ClassDataTooltips";
import { Row, Col, Container } from "reactstrap";
import '../../styles/Major.css';

function parseTakenClasses(taken, classes) {
    for (var i = 0; i < classes.length; i++) {
        if (classes[i].courseID in taken) {
            taken[classes[i].courseID] = true;
        }
    }
    return taken;
}

export default class LowerDiv extends Component {
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
            },
            classData: {},
            tooltipOpen: false
        };

        this.regularIntroTrackCompleted = this.regularIntroTrackCompleted.bind(this);
        this.introProgrammingCompleted = this.introProgrammingCompleted.bind(this);
        this.dataStructuresCompleted = this.dataStructuresCompleted.bind(this);
        this.calc1Completed = this.calc1Completed.bind(this);
        this.calc2Completed = this.calc2Completed.bind(this);
        this.linearAlgCompleted = this.linearAlgCompleted.bind(this);
        this.mathCompleted = this.mathCompleted.bind(this);
        this.toggle = this.toggle.bind(this);
    }

    componentWillReceiveProps = (nextProps) => {
        this.setState({ classes: nextProps.classes });
        let taken = this.state.taken;
        taken = parseTakenClasses(taken, nextProps.classes)
        this.setState({ taken: taken });
    }

    componentDidMount() {
        this.makePostForClassData(this.state.taken)
            .then(res => this.setState({ classData: res }))
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

        //console.log(body);

        return body;
    };

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

    mathCompleted = () => {
        return (this.calc1Completed() && this.calc2Completed() && this.linearAlgCompleted() &&
            this.state.taken['CMPE16'] && this.state.taken['MATH23A'])
    }

    toggle() {
        this.setState({ tooltipOpen: !this.state.tooltipOpen });
    }

    render() {
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
                                            <Col sm={{ size: "auto" }}>
                                                <ClassDataTooltips id='cmps12al' text='CMPS12A/L' classData={this.state.classData['CMPS12A']} /> 
                                                {this.state.taken['CMPS12A'] && this.state.taken['CMPS12L'] && <b>X</b>}
                                            </Col>
                                            <Col sm={{ size: "auto" }}> or </Col>
                                            <Col sm={{ size: "auto" }} >
                                                <Row className={this.state.taken['CMPS5J'] ? 'completed' : 'uncompleted'}>
                                                    <ClassDataTooltips id='cmps5j' text='CMPS5J' classData={this.state.classData['CMPS5J']} />
                                                    {this.state.taken['CMPS5J'] && <b>X</b>}
                                                </Row>
                                                <Row>and</Row>
                                                <Row>
                                                    <ClassDataTooltips id='cmps11' text='CMPS11' classData={this.state.classData['CMPS11']} />
                                                    {this.state.taken['CMPS11'] && <b>X</b>}
                                                </Row>
                                            </Col>
                                            <Col sm={{ size: "auto" }}> or </Col>
                                            <Col sm={{ size: "auto" }} >
                                                <ClassDataTooltips id='cmpe13' text='CMPE13/L' classData={this.state.classData['CMPE13']} />
                                                {this.state.taken['CMPE13'] && this.state.taken['CMPE13L'] && <b>X</b>} 
                                            </Col>
                                        </Row>
                                        <Row className={this.state.taken['CMPS12B'] ? 'completed' : 'uncompleted'}>
                                            <Col sm={{ size: "auto" }}>
                                                <ClassDataTooltips id='cmps12b' text='CMPS12B' classData={this.state.classData['CMPS12B']} />
                                                {this.state.taken['CMPS12B'] && this.state.taken['CMPS12M'] && <b>X</b>}
                                            </Col>
                                        </Row>
                                    </Container>
                                </div>
                            </Col>
                            <Col sm={{ size: "auto" }}> <b>or</b> </Col>
                            <Col sm={{ size: "auto" }}>
                                <div className="honors">
                                    <b>Honors Track</b><br />
                                    <ClassDataTooltips id='cmps13h' text='CMPS13H/L' classData={this.state.classData['CMPS13H']} />
                                    {this.state.taken['CMPS13H'] && this.state.taken['CMPS13L'] && <b>X</b>}
                                </div>
                            </Col>
                        </Row>
                    </div>
                    <Row>
                        <b>Math</b>
                    </Row>
                    <Container className={this.mathCompleted() ? 'completed' : 'uncompleted'}>
                        <Row>
                            <Col sm={{ size: "auto" }}>
                                <Row className={this.calc1Completed() ? 'completed' : 'uncompleted'}>
                                    <ClassDataTooltips id='math19a' text='MATH19A' classData={this.state.classData['MATH19A']} /> 
                                    {this.state.taken['MATH19A'] && <b>X</b>} &nbsp; &nbsp;
                                </Row>
                                <Row className={this.calc2Completed() ? 'completed' : 'uncompleted'}>
                                    <ClassDataTooltips id='math19b' text='MATH19B' classData={this.state.classData['MATH19B']} /> 
                                    {this.state.taken['MATH19B'] && <b>X</b>} &nbsp; &nbsp;
                                </Row>
                                <Row className={this.linearAlgCompleted() ? 'completed' : 'uncompleted'}>
                                    <ClassDataTooltips id='ams10' text='AMS10' classData={this.state.classData['AMS10']} /> 
                                    {this.state.taken['AMS10'] && <b>X</b>} &nbsp; &nbsp;
                                </Row>
                            </Col>
                            <Col sm={{ size: "auto" }}>
                                <Row className={this.calc1Completed() ? 'completed' : 'uncompleted'}>or</Row>
                                <Row className={this.calc2Completed() ? 'completed' : 'uncompleted'}>or</Row>
                                <Row className={this.linearAlgCompleted() ? 'completed' : 'uncompleted'}>or</Row>
                            </Col>
                            <Col>
                                <Row className={this.calc1Completed() ? 'completed' : 'uncompleted'}>
                                    <ClassDataTooltips id='math20a' text='MATH20A' classData={this.state.classData['MATH20A']} />  
                                    {this.state.taken['MATH20A'] && <b>X</b>}
                                </Row>
                                <Row className={this.calc2Completed() ? 'completed' : 'uncompleted'}>
                                    <ClassDataTooltips id='math20b' text='MATH20B' classData={this.state.classData['MATH20B']} />  
                                    {this.state.taken['MATH20B'] && <b>X</b>}
                                </Row>
                                <Row className={this.linearAlgCompleted() ? 'completed' : 'uncompleted'}>
                                    <ClassDataTooltips id='math21' text='MATH21' classData={this.state.classData['MATH21']} />  
                                    {this.state.taken['MATH21'] && <b>X</b>}
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
                                    <ClassDataTooltips id='cmpe12l' text='CMPE12/L' classData={this.state.classData['CMPE12']} /> 
                                    {this.state.taken['CMPE12'] && this.state.taken['CMPE12L'] && <b>X</b>}
                                </Col>
                            </Row>
                        </Container>
                    </div>
                </Container>
            </div>
        );
    }
}