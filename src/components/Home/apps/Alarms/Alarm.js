import React from "react";
import { MDBTable, MDBTableBody, MDBTableHead } from "mdbreact";
import { Container } from "../../components/styled-components";
import firebase from "firebase";
import AuthUserContext from "../../../Session/context";
import TableHead from "./TableHead";
import "../../style.css";

var authUser = undefined;

const Table = ({ state, alarms }) => {
  if (state) {
    console.log(state);
  }

  return (
    <Container className="card alarm-card  is-card-dark">
      <Container className="is-dark-text-light letter-spacing text-small">
        <h1 className="text-large" style={{ textAlign: "center" }}>
          {" "}
          Record of the Last Alarms
        </h1>
        <MDBTable>
          <TableHead />

          <MDBTableBody color="primary-color" textWhite>
            {alarms !== undefined ? (
              Object.keys(alarms).map(function(key) {
                let alarm = alarms[key];
                // alarm.data = key;
                const alarmString = "Alarm";
                const okString = "OK";
                let ac, ad, ah, am, lf, lh, ll, ln, ma, mo, wh;
                let acColor,
                  adColor,
                  ahColor,
                  amColor,
                  lfColor,
                  lhColor,
                  llColor,
                  lnColor,
                  maColor,
                  moColor,
                  whColor;
                const readable = new Intl.DateTimeFormat("en-US", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit"
                }).format(alarm.timestamp);

                if (alarms.ac === 1) {
                  ac = alarmString;
                  acColor = "red";
                } else {
                  ac = okString;
                  acColor = "green";
                }
                if (alarms.ad === 1) {
                  ad = alarmString;
                  adColor = "red";
                } else {
                  ad = okString;
                  adColor = "green";
                }
                if (alarms.ah === 1) {
                  ah = alarmString;
                  ahColor = "red";
                } else {
                  ah = okString;
                  ahColor = "green";
                }
                if (alarms.am === 1) {
                  am = alarmString;
                  amColor = "red";
                } else {
                  am = okString;
                  amColor = "green";
                }
                if (alarms.lf === 1) {
                  lf = alarmString;
                  lfColor = "red";
                } else {
                  lf = okString;
                  lfColor = "green";
                }
                if (alarms.lh === 1) {
                  lh = alarmString;
                  lhColor = "red";
                } else {
                  lh = okString;
                  lhColor = "green";
                }
                if (alarms.ll === 1) {
                  ll = alarmString;
                  llColor = "red";
                } else {
                  ll = okString;
                  llColor = "green";
                }
                if (alarms.ln === 1) {
                  ln = alarmString;
                  lnColor = "red";
                } else {
                  ln = okString;
                  lnColor = "green";
                }
                if (alarms.ma === 1) {
                  ma = alarmString;
                  maColor = "red";
                } else {
                  ma = okString;
                  maColor = "green";
                }
                if (alarms.mo === 1) {
                  mo = alarmString;
                  moColor = "red";
                } else {
                  mo = okString;
                  moColor = "green";
                }
                if (alarms.wh === 1) {
                  wh = alarmString;
                  whColor = "red";
                } else {
                  wh = okString;
                  whColor = "green";
                }
                return (
                  <tr key={key}>
                    <td>{readable}</td>
                    <td style={{ color: acColor }}>{ac}</td>
                    <td style={{ color: adColor }}>{ad}</td>
                    <td style={{ color: ahColor }}>{ah} </td>
                    <td style={{ color: amColor }}>{am}</td>
                    <td style={{ color: lfColor }}>{lf}</td>
                    <td style={{ color: lhColor }}>{lh}</td>
                    <td style={{ color: llColor }}>{ll}</td>
                    <td style={{ color: lnColor }}>{ln}</td>
                    <td style={{ color: maColor }}>{ma}</td>
                    <td style={{ color: moColor }}>{mo}</td>
                    <td style={{ color: whColor }}>{wh}</td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="5">Loading...</td>
              </tr>
            )}
          </MDBTableBody>
        </MDBTable>
      </Container>
    </Container>
  );
};

class Alarm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  readAlarms = () => {
    if (this.authUser !== undefined) {
      firebase
        .database()
        .ref(`units/${this.authUser.unitname}/alarm/timestamped_alarms`)
        .once("value")
        .then(snapshot => {
          const data = snapshot.val();
          if (data) {
            this.setState({
              ...{ alarms: data }
            });
          }
        });
    }
  };

  readAlarmState = () => {
    if (this.authUser !== undefined) {
      firebase
        .database()
        .ref(`units/${this.authUser.unitname}/alarm/alarm_state`)
        .once("value")
        .then(snapshot => {
          const data = snapshot.val();
          if (data) {
            this.setState({
              ...{ alarm: data }
            });
          }
        });
    }
  };

  componentDidMount() {
    this.readAlarms();
    this.readAlarmState();
  }

  render() {
    return (
      <div key={Math.random()} className="alarm-canvas">
        <AuthUserContext.Consumer>
          {authUser => {
            if (authUser !== undefined) {
              this.authUser = authUser;
            }
          }}
        </AuthUserContext.Consumer>
        <Table {...this.state} />
      </div>
    );
  }
}

export default Alarm;
