import { withFirebase } from "../../../../../../../Firebase";
import "../Panel.css";

export const CreatePrivateChat = (data, props) => {
  const targetName = data.targetUsername;
  const targetUnitname = data.targetUnitname;
  const creatorName = data.authUser.username;
  const creatorUnitname = data.authUser.unitname;
  var group = null;
  var local = null;
  var ref = null;
  var ref2 = null;
  var area = null;
  var type = group;
  var chatPublic = false;

  const group1 = targetName + "-" + creatorName;
  const group2 = creatorName + "-" + targetName;
  group = group1;

  console.log(props);

  const onCreateChange = obj => {
    if (obj) {
      var data = obj;
      console.log(data);
      props.onSearchChange(data);
    }
  };

  targetUnitname === creatorUnitname ? (local = true) : (local = false);

  if (local === true) {
    area = "local";
    // data =unitname, group, chatpublic, group1, group2

    ref = props.firebase.db.ref(
      `/units/${creatorUnitname}/chat/groups-private/${group1}/`
    );
    ref2 = props.firebase.db.ref(
      `/units/${creatorUnitname}/chat/groups-private/${group2}/`
    );
  } else {
    area = "global";
    ref = props.firebase.db.ref(`/chat/groups-private/${group1}/`);
    ref2 = props.firebase.db.ref(`/chat/groups-private/${group2}/`);
  }

  var data = {
    area: area,
    type: "group",
    unitname: creatorUnitname,
    username: creatorName,
    group: group1,
    group1: group1,
    group2: group2,
    chatPublic: false
  };

  ref.once("value").then(snapshot => {
    var group = snapshot.val();
    console.log(group);

    if (!group) {
      console.log("Try the second name");
      ref2.once("value").then(snapshot => {
        var group = snapshot.val();
        console.log(group);
        if (!group) {
          console.log(
            "Couldnt find with the second name either . Lets create it with the first name"
          );
          ref
            .update({
              messages: {
                "-CREATOR": {
                  message: "",
                  author: ` ${creatorName}`
                }
              }
            })
            .then(() => {
              data = { ...{ group: group1 } };
              console.log(data);
              onCreateChange(data);
            });
        } else {
          console.log("Group found with the second name.Open It");
          data = { ...{ group: group2 } };
          console.log(data);
          onCreateChange(data);
        }
      });
    } else {
      console.log("Group found with the first name.Open It");
      console.log(data);
      data.group = group1;
      console.log(data);
      onCreateChange(data);
    }
  });
};

export default withFirebase(CreatePrivateChat);
