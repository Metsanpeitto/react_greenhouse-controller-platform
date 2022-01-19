const validate = props => {
  if (props.id === "daysinveg") {
    if (props.value < 5 || props.value > 30) {
      props.comment = "Minimun 5 and maximun 30";
    } else {
      props.comment = "";
    }
  }
  if (props.id === "daysinflo") {
    if (props.value < 45 || props.value > 90) {
      props.comment = "Minimun 45 and maximun 90";
    } else {
      props.comment = "";
    }
  }
  if (props.id === "watertempmax") {
    if (props.value < 21 || props.value > 28) {
      props.comment = "Minimun 21 and maximun 28";
    } else {
      props.comment = "";
    }
  }
  if (props.id === "watertempmin") {
    if (props.value < 0 || props.value > 21) {
      props.comment = "Minimun 0 and maximun 21";
    } else {
      props.comment = "";
    }
  }
  if (props.id === "waterphmax") {
    if (props.value < 6 || props.value > 8) {
      props.comment = "Minimun 6 and maximun 8";
    } else {
      props.comment = "";
    }
  }
  if (props.id === "waterphmin") {
    if (props.value < 5 || props.value > 6) {
      props.comment = "Minimun 5 and maximun 6";
    } else {
      props.comment = "";
    }
  }
  if (props.id === "temp-max") {
    if (props.value < 24 || props.value > 40) {
      props.comment = "Minimun 24 and maximun 40";
    } else {
      props.comment = "";
    }
  }
  if (props.id === "tempmin") {
    if (props.value < 12 || props.value > 24) {
      props.comment = "Minimun 12 and maximun 24";
    } else {
      props.comment = "";
    }
  }
  if (props.id === "humimax") {
    if (props.value < 45 || props.value > 90) {
      props.comment = "Minimun 45 and maximun 90";
    } else {
      props.comment = "";
    }
  }
  if (props.id === "humimin") {
    if (props.value < 20 || props.value > 45) {
      props.comment = "Minimun 20 and maximun 45";
    } else {
      props.comment = "";
    }
  }
};

export default validate;
