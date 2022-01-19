import app from "firebase/app";
import "firebase/auth";
import "firebase/database";

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID
};

class Firebase {
  constructor() {
    app.initializeApp(config);
    this.auth = app.auth();
    this.db = app.database();
  }

  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignOut = authUser => {
    this.auth.signOut();
    authUser = null;
    return authUser;
  };

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = password => this.auth.currentUser.updatePassword(password);

  // *** Merge Auth and DB User API *** //

  onAuthUserListener = (next, fallback) =>
    this.auth.onAuthStateChanged(authUser => {
      if (authUser) {
        this.user(authUser.uid)
          .once("value")
          .then(snapshot => {
            // merge auth

            authUser = {
              uid: authUser.uid,
              email: authUser.email
            };

            this.db
              .ref(`/users/${authUser.uid}`)
              .once("value")
              .then(snapshot => {
                const unit = snapshot.val();

                if (unit) {
                  authUser = {
                    uid: authUser.uid,
                    email: authUser.email,
                    unitname: unit.unitname,
                    username: authUser.username
                  };
                  this.db
                    .ref(`/units/${authUser.unitname}/users/${authUser.uid}/`)
                    .once("value")
                    .then(snapshot => {
                      const thisAuthUser = snapshot.val();

                      if (thisAuthUser) {
                        authUser = {
                          uid: authUser.uid,
                          email: thisAuthUser.email,
                          unitname: thisAuthUser.unitname,
                          username: thisAuthUser.username,
                          role: thisAuthUser.role
                        };
                        next(authUser);
                      }
                    });
                }
              });
          });
      } else {
        console.log(authUser);
        authUser = {};
        console.log(authUser);
        next(authUser);
        fallback();
      }
    });

  // USER API
  //user = username => this.db.ref(`users/${username}`);
  //The next line is totally contraintuitive .The order as field are created is reversed
  //In Firebases tree will show ->this-users-c
  // Get the last 10 users, ordered by key
  usernameRef = (unitname, uid) =>
    this.db.ref(`/units/${unitname}/users/ ${uid}/username`);

  user = unitname => this.db.ref(`/units/${unitname}/users/`);
  unit = unitname => this.db.ref(`/units/${unitname}`);
  dbRef = () => this.db.ref(`/`);
  dbserialnumber = unitname => this.db.ref(`/SerialNumbers/${unitname}`);
  dbunitname = () => this.db.ref(`/units/`);
  populatenewunit = unitname => this.db.ref(`/units/${unitname}`);
  globalChat = () => this.db.ref(`/chat/`);
  localChat = unitname => this.db.ref(`/units/${unitname}/chat/`);
  localGroup = (group, unitname) =>
    this.db.ref(`/units/${unitname}/chat/groups/${group}/messages/`);
  globalGroup = group => this.db.ref(`/chat/groups/${group}/messages/`);

  checkSerialNumberExists = (serialnumber, unitname) => {
    console.log(serialnumber);
    console.log(unitname);
    const allow = new Promise((resolve, reject) => {
      this.dbserialnumber(unitname)
        .once("value")
        .then(snapshot => {
          const number = snapshot.val();
          if (number) {
            if (number == serialnumber) {
              console.log("OK");
              console.log(`${number} = ${serialnumber}`);
              resolve("OK");
            } else {
              console.log("error");
              console.log(`${number} != ${serialnumber}`);
              reject();
            }
          }
        });
    });
    return allow;
  };

  checkUnitExists = unitname => {
    console.log(unitname);
    const unit = new Promise((resolve, reject) => {
      this.dbunitname()
        .once("value")
        .then(snapshot => {
          var unitsArray = snapshot.val();
          console.log(unitsArray);
          const unitfromarray = unitsArray[unitname];
          console.log(unitfromarray);
          if (unitfromarray) {
            console.log("Unit found");
            resolve("OK");
          } else {
            console.log("Unit not found");
            reject();
          }
        });
    });
    return unit;
  };

  //
}
export default Firebase;
