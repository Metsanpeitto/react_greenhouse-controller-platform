import React from "react";
import TextField from "@material-ui/core/TextField";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import validate from "./validate";
import "../../../style.css";

const theme = createMuiTheme({
  overrides: {
    MuiInputLabel: {
      // Name of the component ⚛️ / style sheet
      root: {
        // Name of the rule
        color: "white",
        "&$focused": {
          // increase the specificity for the pseudo class
          color: "green"
        },
        transform: "scale(0.9)"
      }
    }
  }
});
const styles = theme => ({
  container: {},
  textFieldInput: {},

  input: {
    color: theme.palette.common.white
  },

  cssLabel: {},

  cssOutlinedInput: {},

  cssFocused: {},

  notchedOutline: {}
});

class ValidField extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleValueChange.bind(this);
    this.handleFromParent = this.handleFromParent.bind(this);

    this.state = {
      id: this.props.id,
      label: this.props.label,
      value: this.props.value,
      comment: ""
    };
  }

  myState = {
    id: this.props.id,
    label: this.props.label,
    value: this.props.value,
    comment: ""
  };

  handleFromParent = () => {
    let data = { value: this.state.value, id: this.props.id };
    this.props.handleFromParent(data);
  };

  handleValueChange = event => {
    this.setState({
      value: event.target.value
    });
    this.myState = this.state;
    this.myState.value = event.target.value;

    if (event.target.value !== "" || event.target.value !== undefined) {
      validate(this.myState);
      this.value = event.target.value;
    }
  };

  //days-in-veg,days-in-flo-hour-on-veg-hour-on-flo,water-temp-max,water-temp-min,water-ph-max,water-ph-min
  // ,tamp-max,temp-min,humi-max,humi-minthis.props.

  render() {
    return (
      <div className="setup-div-textfield">
        {" "}
        <ThemeProvider theme={theme}>
          <TextField
            id={this.state.id}
            label={this.state.label}
            className="setup-textField "
            value={this.myState.value}
            onChange={this.handleChange}
            onBlur={this.handleFromParent}
            variant="outlined"
            style={{ color: "gray" }}
            InputLabelProps={{
              classes: {
                root: theme.white,
                focused: "white"
              }
            }}
            InputProps={{
              className: styles.input,
              style: { color: "gray" },
              classes: {
                className: styles.input,
                root: styles.cssOutlinedInput,
                focused: styles.cssFocused,
                notchedOutline: styles.notchedOutline
              },
              inputMode: "numeric"
            }}
          />
          <h6 className="text-x-small" style={{ color: "green" }}>
            {this.state.comment}
          </h6>
        </ThemeProvider>
      </div>
    );
  }
}

ValidField.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ValidField);
