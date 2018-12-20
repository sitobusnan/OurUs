import React, { Component } from "react";
import {
  Button,
  Modal,
  Input,
  Col,
  Card,
  CardTitle,
  Carousel,
  MediaBox
} from "react-materialize";
import AuthService from "../Tools";
import Footer from "../Footer/Footer";
import "./Main.css";
import { Link } from "react-router-dom";

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
      },
      photo: null
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

  handlerStateCheckTask = (status, id) => {
    this.authService.checkTask({ status, id }).then(task => {
      this.ifLoggedIn();
    });
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

  handlerNewPhotoState = e => {
    this.setState({ ...this.state, photo: e.target.files[0] });
  };

  handlerSetPhoto = e => {
    this.setState({ ...this.state, photo: null });
    this.ifLoggedIn();
  };

  handlerNewPhoto = e => {
    e.preventDefault();
    const photo = e.target.files[0];
    this.authService
      .newPhoto({ photo: photo, family: this.state.family._id })
      .then(family => {});
  };

  render() {
    // TASK TO DISPLAY
    let taskToDispaly = [];
    this.state.family.tasks.forEach((element, index) => {
      if (
        element.date === this.today &&
        element.tutor === this.state.user._id
      ) {
        taskToDispaly.push(element);
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
    let reminders = [];
    this.state.family.reminders.forEach(element => {
      return this.state.family.kids.forEach(kid => {
        if (kid._id === element.kid) {
          element.kid = kid;
          reminders.push(element);
        }
      });
    });

    // IMAGES TO DISPLAY

    
    
    return (
      <div className="main">
      {/* //HEADER */}
        <div className="sec-family">
          <div className="sec-family-user">
          <Link to='/profile'><img className="sec-family-user-photo" src={this.state.user.photo} alt=""/></Link>
          </div>
          <div className="sec-family-family">
          <Link to='/family'><h6>{this.state.family.name}</h6></Link>
            {this.state.family.tutors.map((element,index)=>{
              return <img className="sec-family-family-photo" src={element.photo} alt=""/>
            })}
          </div>
        </div>


        {/* //KIDS */}
            <h2>KIDS</h2>
        <div className="sec-kids">
            {this.state.family.kids.map((element)=>{
              return (
                <div className="sec-kids-card">
                  <div className="sec-kid-card-photo-container">
                  <img className="sec-kids-card-photo" src={element.photo} alt=""/>
                  </div>
                  <h5>{element.username}</h5>
                </div>
              )
            })}
        </div>
        
        {/* // TODO */}

          <h2>TODO LIST</h2>
        <div className="taskList-container">
          {tasks.map((task, index) => {
            return (
              <div key={index} className="todo-task">
                <Input
                  className="task-tik"
                  name="status"
                  type="checkbox"
                  value="red"
                  label="-"
                  checked={!task.status}
                  onChange={e =>
                    this.handlerStateCheckTask(task.status, task._id)
                  }
                />
                <Modal
                  header={task.description}
                  fixedFooter
                  trigger={
                    <div className="task-info">
                      <div className="task-info-des">
                        <h5>{task.description}</h5>
                      </div>
                      <div className="task-info-images">
                        <img className="task-info-image" src={task.kid.photo} alt="" />
                        <img className="task-info-image" src={task.tutor.photo} alt="" />
                      </div>
                    </div>
                  }
                >
                  <div className="task-modal">
                    <div className="task-modal-images">
                      <img className="task-modal-image" src={task.tutor.photo} alt="" />
                      <img className="task-modal-image" src={task.kid.photo} alt="" />
                    </div>
                    <label htmlFor="">TEXT</label>
                    <p>{task.text}</p>
                    <label htmlFor="">DATE</label>
                    <p>{task.date}</p>
                    <label htmlFor="">PLACE</label>
                    <p>{task.place}</p>
                    <label htmlFor="">TASK TYPE</label>
                    <p>{task.type}</p>
                  </div>
                </Modal>
              </div>
            );
          })}
        </div>

        {/* REMINDERS */}
        <h2>REMINDERS</h2>
        <div className="remindersList-container">
          {reminders.map((reminder, index) => {
            return (
              
                <Modal
                  header={reminder.description}
                  fixedFooter
                  trigger={
                    <div className="listed-reminder">
                      <div className="reminder-image-cont">
                        <img className="reminder-image" src={reminder.kid.photo} alt=""/>
                      </div>
                      <div className="reminder-info">
                        <h4>{reminder.date}</h4>
                        <h4>{reminder.description}</h4>
                      </div>
                    </div>
                  }
                >
                  <div className="task-modal">
                    <div className="task-modal-images">
                      <img className="task-modal-image" src={reminder.kid.photo} alt="" />
                    </div>
                    <label htmlFor="">TEXT</label>
                    <p>{reminder.text}</p>
                    <label htmlFor="">DATE</label>
                    <p>{reminder.date}</p>
                    
                  </div>
                </Modal>
              
            );
          })}
        </div>

        {/* NOTICES */}
        <h2>NOTICES</h2>
        <div className="taskNotices-container">
          {this.state.family.tasks
            .filter(task => task.status === false && task.date === this.today)
            .map((task, index) => {
              return (
                
                  <Modal
                    header={task.description}
                    fixedFooter
                    trigger={
                      <div className="notice">
                      <div className="notice-images">
                        <img className="notice-image" src={task.tutor.photo} alt=""/>
                        <img className="notice-image" src={task.kid.photo} alt=""/>
                      </div>
                        <div className="notice-text">
                          <h4>{task.description}</h4>
                        </div>
                      </div>
                    }
                  >
                    <div className="task-modal">
                    <div className="task-modal-images">
                      <img className="task-modal-image" src={task.tutor.photo} alt="" />
                      <img className="task-modal-image" src={task.kid.photo} alt="" />
                    </div>
                    <label htmlFor="">TEXT</label>
                    <p>{task.text}</p>
                    <label htmlFor="">DATE</label>
                    <p>{task.date}</p>
                    <label htmlFor="">PLACE</label>
                    <p>{task.place}</p>
                    <label htmlFor="">TASK TYPE</label>
                    <p>{task.type}</p>
                  </div>
                  </Modal>
               
              );
            })}
        </div>

        {/* PHOTOS */}
        <h2>PHOTO GALERY</h2>
        <div>
          <Carousel
            images={this.state.family.photos.map((element,index)=>{
              return <div key={index}><MediaBox src={element}  width="350"/></div>
            })}
          />
        </div>



        <div>
          <Modal header="Modal Header" trigger={<div className="a-photo"/>}>
            <form action="" onChange={e => this.handlerNewPhoto(e)}>
              <Input
                name="newphoto"
                type="file"
                label="File"
                s={12}
                onChange={e => this.handlerNewPhotoState(e)}
              />
              {this.state.photo === null ? (
                <div />
              ) : (
                <Button
                  className="modal-close"
                  onChange={e => this.handlerSetPhoto(e)}
                >
                  DONE!
                </Button>
              )}
            </form>
          </Modal>
        </div>




        
        


        <Modal
          header="ADD TASK"
          fixedFooter
          trigger={<div className="a-task"/>}>
          <form action="submit" onSubmit={this.handleFormSubmit}>
            <Input type="text" label="description" name="description" s={12} onChange={e => this.handlerState(e)}/>
            <Input type="textarea" name="text" onChange={e => this.handlerState(e)}/>
            <Input name="date" type="date" onChange={e => this.handlerState(e)} />
            <Input type="text" label="Place" name="place" s={12} onChange={e => this.handlerState(e)} />
            <Input s={12} type="select" name="type" label="Select" defaultValue="Select Type of Task" onChange={e => this.handlerState(e)}>
              <option value="Education">Education</option>
              <option value="Home">Home</option>
            </Input>
            <Input s={12} type="select" name="tutor" label="Select" onChange={e => this.handlerState(e)}>
              <option value="">Choose tutor</option>
              {this.state.family.tutors.map((element, index) => {
                return (
                  <option key={index} value={element._id}>
                    {element.username}
                  </option>
                );
              })}
            </Input>
            <Input s={12} type="select" name="kid" label="Select" onChange={e => this.handlerState(e)}>
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
          trigger={<div className="a-reminder"/>}
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
        

        




      </div>
    );
  }
}
