import React, { Component } from "react";
import { Row, Col, Container } from "reactstrap";
import '../styles/Major.css';
import ClassDataTooltips from "./ClassDataTooltips";

function parseTakenClasses(taken, classes) {
    for (var i = 0; i < classes.length; i++) {
        if (classes[i].courseID in taken) {
            taken[classes[i].courseID] = true;
        }
    }
    return taken;
}

export default class UpperDiv extends Component {
    constructor(props) {
        super(props);

        this.state = {
            classes: [],
            taken: {
                CMPS101: false,
                CMPE110: false,
                CMPS111: false,
                CMPS102: false,
                CMPS112: false,
                AMS131: false,
                CMPE107: false
            },
            classData: {}
        };

        this.statisticsCompleted = this.statisticsCompleted.bind(this);
    }

    componentWillReceiveProps(nextProps) {
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
                                <ClassDataTooltips id='cmps101' text='CMPS101' classData={this.state.classData['CMPS101']} /> 
                                {this.state.taken['CMPS101'] && <b>X</b>}
                            </Col>
                        </Row>
                        <Row>
                            <Col className={this.state.taken['CMPE110'] ? 'completed' : 'uncompleted'}>
                                <ClassDataTooltips id='cmpe110' text='CMPE110' classData={this.state.classData['CMPE110']} />  
                                {this.state.taken['CMPE110'] && <b>X</b>}
                            </Col>
                        </Row>
                        <Row>
                            <Col className={this.state.taken['CMPS111'] ? 'completed' : 'uncompleted'}>
                                <ClassDataTooltips id='cmps111' text='CMPS111' classData={this.state.classData['CMPS111']} />  
                                {this.state.taken['CMPS111'] && <b>X</b>}
                            </Col>
                        </Row>
                        <Row>
                            <Col className={this.state.taken['CMPS102'] ? 'completed' : 'uncompleted'}>
                                <ClassDataTooltips id='cmps102' text='CMPS102' classData={this.state.classData['CMPS102']} /> 
                                {this.state.taken['CMPS102'] && <b>X</b>}
                            </Col>
                        </Row>
                        <Row>
                            <Col className={this.state.taken['CMPS112'] ? 'completed' : 'uncompleted'}>
                                <ClassDataTooltips id='cmps112' text='CMPS112' classData={this.state.classData['CMPS112']} />
                                {this.state.taken['CMPS112'] && <b>X</b>}
                            </Col>
                        </Row>
                        <Row className={this.statisticsCompleted() ? 'completed' : 'uncompleted'}>
                            <Col sm={{ size: "auto" }}>
                                <ClassDataTooltips id='ams131' text='AMS131' classData={this.state.classData['AMS131']} /> 
                                {this.state.taken['AMS131'] && <b>X</b>}
                            </Col>
                            <Col sm={{ size: "auto" }}>or</Col>
                            <Col>
                                <ClassDataTooltips id='cmpe107' text='CMPE107' classData={this.state.classData['CMPE107']} /> 
                                {this.state.taken['CMPE107'] && <b>X</b>}
                            </Col>
                        </Row>
                    </Container>
                </Container>
            </div>
        );
    }
}