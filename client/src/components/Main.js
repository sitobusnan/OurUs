import React, { Component } from "react";
import Datetime from "react-datetime-picker";
import Calendar from "react-calendar";
import { Button, Modal, Input, Col, Card, CardTitle } from "react-materialize";
import AuthService from "./Tools";

export default class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: this.props.user.user,
      family: this.props.user.family,
      newTask: {
        kid: null,
        description: null,
        tutor: null,
        type: "Education",
        text: null,
        status: true,
        date: null,
        place: null,
        family_name: this.props.user.family.name
      },
      newReminder: {
        kid: null,
        description: null,
        text: null,
        status: true,
        date: null,
        family_name: this.props.user.family.name
      }
    };
    this.authService = new AuthService();
    this.today = new Date();
    this.today = this.dateChange(this.today);
    this.ifLoggedIn();
  }

  ifLoggedIn = () => {
    this.authService.loggedin().then(user => {
      this.setState({ ...this.state, user: user.user, family: user.family });
    });
  };

  dateChange = d => {
    let usedDate = [];
    var letter = true;
    var day = 0;
    var mon = "";
    var yea = 0;
    d = d.toISOString().split("");
    for (let i = 0; i < d.length; i++) {
      if (d[i] === "T") {
        letter = false;
      }
      if (letter) {
        usedDate.push(d[i]);
      }
    }
    usedDate = usedDate.join("").split("-");
    yea = usedDate[0].toString();
    day = usedDate[2].toString();
    if (usedDate[1] === "1") {
      mon = "January";
    }
    if (usedDate[1] === "2") {
      mon = "February";
    }
    if (usedDate[1] === "3") {
      mon = "March";
    }
    if (usedDate[1] === "4") {
      mon = "April";
    }
    if (usedDate[1] === "5") {
      mon = "May";
    }
    if (usedDate[1] === "6") {
      mon = "June";
    }
    if (usedDate[1] === "7") {
      mon = "July";
    }
    if (usedDate[1] === "8") {
      mon = "August";
    }
    if (usedDate[1] === "9") {
      mon = "September";
    }
    if (usedDate[1] === "10") {
      mon = "October";
    }
    if (usedDate[1] === "11") {
      mon = "November";
    }
    if (usedDate[1] === "12") {
      mon = "December";
    }
    usedDate = day + " " + mon + ", " + yea;
    return usedDate;
  };

  ifLoggedIn = () => {
    this.authService.loggedin().then(user => {
      this.setState({ ...this.state, user: user.user, family: user.family });
    });
  };

  handlerState = e => {
    const { name, value } = e.target;
    const obj = {
      ...this.state.newTask,
      [name]: value
    };
    this.setState({ newTask: obj });
  };

  handlerStateReminder = e => {
    const { name, value } = e.target;
    const obj = {
      ...this.state.newReminder,
      [name]: value
    };
    this.setState({ newReminder: obj });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    const {
      kid,
      description,
      tutor,
      type,
      text,
      status,
      place,
      date,
      family_name
    } = this.state.newTask;
    this.authService
      .newTask({
        kid,
        description,
        tutor,
        type,
        text,
        date,
        status,
        place,
        family_name
      })
      .then(task => {
        const obj = {
          kid: null,
          description: null,
          tutor: null,
          type: "Education",
          text: null,
          status: true,
          date: null,
          place: null,
          family_name: task.family_name
        };

        this.setState({ newTask: obj });
        this.ifLoggedIn();
      });
  };

  handleFormSubmitReminder = event => {
    event.preventDefault();
    const {
      kid,
      description,
      text,
      status,
      date,
      family_name
    } = this.state.newReminder;
    this.authService
      .newReminder({ kid, description, text, status, date, family_name })
      .then(reminder => {
        const obj = {
          kid: null,
          description: null,
          text: null,
          status: true,
          date: null,
          family_name: reminder.family_name
        };
        this.setState({ newTask: obj });
        this.ifLoggedIn();
      });
  };

  render() {
    // TASK TO DISPLAY
    let taskToDispaly = this.state.family.tasks.map(element => {
      if (element.date === this.today && element.status) {
        return element;
      }
    });
    let tasks = [];
    taskToDispaly.map(element => {
      return this.state.family.tutors.forEach(tutor => {
        if (tutor._id === element.tutor) {
          element.tutor = tutor;
          tasks.push(element);
        }
      });
    });
    taskToDispaly = tasks;
    tasks = [];
    taskToDispaly.map(element => {
      return this.state.family.kids.forEach(kid => {
        if (kid._id === element.kid) {
          element.kid = kid;
          tasks.push(element);
        }
      });
    });

    // REMINDERS TO DISPLAY
    let remindersToDisplay = this.state.family.reminders.map(element => {
      if (element.status) {
        return element;
      }
    });
    let reminders = [];
    remindersToDisplay.map(element => {
      return this.state.family.kids.forEach(kid => {
        if (kid._id === element.kid) {
          element.kid = kid;
          reminders.push(element);
        }
      });
    });

    return (
      <div>
        <Modal
          header="ADD TASK"
          fixedFooter
          trigger={<Button>ADD TASK</Button>}
        >
          <form action="submit" onSubmit={this.handleFormSubmit}>
            <Input
              type="text"
              label="description"
              name="description"
              s={12}
              onChange={e => this.handlerState(e)}
            />
            <Input
              type="textarea"
              name="text"
              onChange={e => this.handlerState(e)}
            />
            <Input
              name="date"
              type="date"
              onChange={e => this.handlerState(e)}
            />
            {/* <Input name='time' type='time' onChange={e => this.handlerState(e)} /> */}
            <Input
              type="text"
              label="Place"
              name="place"
              s={12}
              onChange={e => this.handlerState(e)}
            />
            <Input
              s={12}
              type="select"
              name="type"
              label="Select"
              defaultValue="Select Type of Task"
              onChange={e => this.handlerState(e)}
            >
              <option value="Education">Education</option>
              <option value="Home">Home</option>
            </Input>
            <Input
              s={12}
              type="select"
              name="tutor"
              label="Select"
              onChange={e => this.handlerState(e)}
            >
              <option value="">Choose tutor</option>
              {this.state.family.tutors.map((element, index) => {
                return (
                  <option key={index} value={element._id}>
                    {element.username}
                  </option>
                );
              })}
            </Input>
            <Input
              s={12}
              type="select"
              name="kid"
              label="Select"
              onChange={e => this.handlerState(e)}
            >
              <option value="">Choose a kid</option>
              {this.state.family.kids.map((element, index) => {
                return (
                  <option key={index} value={element._id}>
                    {" "}
                    {element.username}
                  </option>
                );
              })}
            </Input>
            <Button className="modal-close" waves="light" type="submit">
              Create
            </Button>
          </form>
        </Modal>

        <Modal
          header="ADD REMINDER"
          fixedFooter
          trigger={<Button>ADD REMINDER</Button>}
        >
          <form action="submit" onSubmit={this.handleFormSubmitReminder}>
            <Input
              type="text"
              label="description"
              name="description"
              s={12}
              onChange={e => this.handlerStateReminder(e)}
            />
            <Input
              type="textarea"
              name="text"
              onChange={e => this.handlerStateReminder(e)}
            />
            <Input
              name="date"
              type="date"
              onChange={e => this.handlerStateReminder(e)}
            />
            {/* <Input name='time' type='time' onChange={e => this.handlerState(e)} /> */}
            <Input
              s={12}
              type="select"
              name="kid"
              label="Select"
              onChange={e => this.handlerStateReminder(e)}
            >
              <option value="">Choose a kid</option>
              {this.state.family.kids.map((element, index) => {
                return (
                  <option key={index} value={element._id}>
                    {" "}
                    {element.username}
                  </option>
                );
              })}
            </Input>
            <Button className="modal-close" waves="light" type="submit">
              Create
            </Button>
          </form>
        </Modal>

        <div id="taskList-container" />

        <div id="taskList-container">
          {tasks.map((task, index) => {
            return (
              <div key={index} id="listed-task">
                <Col m={7} s={12}>
                  <Card
                    horizontal
                    header={<CardTitle image={task.tutor.photo} />}>
                    <h5>{task.description}</h5>
                    <CardTitle image={task.kid.photo} />
                  </Card>
                </Col>
              </div>
            );
          })}
        </div>

        <div id="reminderskList-container">
          {reminders.map((reminder, index) => {
            return (
              <Modal
                header={reminder.description}
                fixedFooter
                trigger={<div key={index} id="listed-reminder"><Col m={7} s={12}><Card horizontal header={<CardTitle image={reminder.kid.photo} />}>
                    <h5>{reminder.description}</h5>
                    <h6>{reminder.date}</h6>
                  </Card>
                </Col>
              </div>}>
                
              </Modal>
            );
          })}
        </div>
      </div>
    );
  }
}
