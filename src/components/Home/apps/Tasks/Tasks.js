import React from "react";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import events from "./events";
import moment from "moment";
import "./react-big-calendar.css";
import { Container } from "../../components/styled-components";
import firebase, { auth } from "firebase";
import { AuthUserContext } from "../../../Session";
import "../../style.css";

var authUser = null;

const eventStyleGetter = (event, start, end, isSelected) => {
  var backgroundColor = "#" + event.hexColor;
  var style = {
    backgroundColor: backgroundColor,
    borderRadius: "6px",
    opacity: 0.8,
    color: "white",
    border: "0px",
    display: "block"
  };
  return {
    style: style
  };
};

function Event({ event }) {
  console.log(event);
  let local = null;
  let global = null;
  let me = null;

  if (event.receiver === "global") {
    global = true;
    local = null;
  }
  if (event.receiver === "local") {
    global = null;
    local = true;
  }
  if (event.author === "my own task") {
    global = null;
    local = true;
  }
  console.log(local, global, me);

  return (
    <span>
      <strong>{event.title}</strong>
      {local ? <p>{event.author}</p> : null}
      {global ? (
        <p>
          {event.author} - {event.authorUnitname}
        </p>
      ) : null}
    </span>
  );
}

const localizer = momentLocalizer(moment);

class Tasks extends React.Component {
  constructor(...args) {
    super(...args);

    this.state = { authUser: null, event: "", events: events };
  }

  startStr = "start";
  endStr = "end";
  titleStr = "title";
  keyStr = "key";
  authorStr = "author";
  receiver = "receiver";
  hexColor = null;
  date;

  handleSelect = ({ start, end, key, author }) => {
    const title = window.prompt("New Event name");
    var hexColor = null;
    if (title) {
      var receiver = window.prompt(
        "Who can see the event?..Type in 'me','local',or 'global'"
      );
      if (this.state.authUser) {
        if (receiver) {
          var valid = false;
          if (receiver === "me") {
            hexColor = "3f52b5";
            receiver = this.state.authUser.uid;
            valid = true;
          }
          if (receiver === "local") {
            hexColor = "61ab6c";
            receiver = "local";
            valid = true;
          }
          if (receiver === "global") {
            hexColor = "c977bc";
            valid = true;
          }
          if (valid === true) {
            this.setState({
              events: [
                ...this.state.events,
                {
                  authUser,
                  start,
                  end,
                  title,
                  key,
                  author,
                  receiver,
                  hexColor
                }
              ]
            });

            let event = {
              start: String(start),
              end: String(end),
              title: title,
              author: this.state.authUser.username,
              authorUnitname: this.state.authUser.unitname,
              receiver: receiver,
              hexColor: hexColor
            };
            this.updateCalendarEvents(event);
          }
        }
      }
    }
  };

  onSelectEvent(pEvent) {
    if (this.state.authUser.username) {
      if (this.state.authUser.username === pEvent.author) {
        const r = window.confirm("Would you like to remove this event?");
        if (r === true) {
          this.setState((prevState, props) => {
            const events = [...prevState.events];
            const idx = events.indexOf(pEvent);
            events.splice(idx, 1);
            return { events };
          });
          firebase
            .database()
            .ref(`/units/${this.authUser.unitname}/calendar/calendar_events`)
            .child(pEvent.key)
            .remove();
        }
      }
    }
  }

  readCalendarEvents = authUser => {
    firebase
      .database()
      .ref(`/units/${this.authUser.unitname}/calendar/calendar_events`)
      .once("value")
      .then(snapshot => {
        const events = snapshot.val();
        let publicEvent = false;
        let myEvents = [];

        if (events) {
          if (events !== undefined) {
            Object.keys(events).map(function(key) {
              let event = events[key];
              let startDate;
              let endDate;
              let local = null;
              publicEvent = false;

              if (event.start !== undefined) {
                startDate = new Date(event.start);
                endDate = new Date(event.end);
              }

              if (events[key].authorUnitname === authUser.unitname) {
                local = true;
              } else {
                local = false;
              }

              if (events[key].receiver === authUser.uid) {
                event.author = "my own task";
                publicEvent = true;
              }
              if (events[key].receiver === "local") {
                publicEvent = true;
              }
              if (events[key].receiver === "global") {
                publicEvent = true;
              }

              if (publicEvent === true) {
                event.authorUntiname = events[key].authorUnitname;
                event.key = key;
                event.start = startDate;
                event.end = endDate;
                event.local = local;
                event.publicEvent = publicEvent;
                myEvents = myEvents.concat(event);
              }

              return null;
            });

            if (publicEvent === true) {
              console.log("Set state");
            }
            if (myEvents !== undefined) {
              this.setState({ ...{ events: myEvents } }, () => {});
            }
          }
        }
      });
  };

  updateCalendarEvents = event => {
    firebase
      .database()
      .ref(`/units/${this.authUser.unitname}/calendar/calendar_events/`)
      .push(event);
  };

  componentDidMount() {
    if (this.authUser) {
      this.setState({ ...{ authUser: this.authUser } }, () => {
        console.log(this.authUser);
      });
      this.readCalendarEvents(this.authUser);
      let newDate = new Date();
      this.date = newDate.getDate();
    }
  }

  render() {
    //const { localizer } = this.props;

    return (
      <div className="task-canvas">
        <AuthUserContext.Consumer>
          {authUser => {
            if (authUser) {
              this.authUser = authUser;
            }
          }}
        </AuthUserContext.Consumer>

        <Container className="is-card-dark  calendar-card is-dark-text-light letter-spacing text-small">
          <Calendar
            selectable
            className="calendar-canvas"
            Style={{ height: "fit-content" }}
            events={this.state.events}
            culture={this.state.culture}
            defaultDate={this.date}
            defaultView={Views.MONTH}
            localizer={localizer}
            onSelectEvent={event => this.onSelectEvent(event)}
            onSelectSlot={this.handleSelect}
            eventPropGetter={eventStyleGetter}
            components={{ event: Event }}
          />
        </Container>
      </div>
    );
  }
}

export default Tasks;
