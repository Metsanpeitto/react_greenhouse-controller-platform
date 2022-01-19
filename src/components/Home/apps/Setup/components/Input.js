import React, { Component } from "react";

function onChange(value) {
  console.log("onChange", value);
}

class Input extends Component {
  constructor() {
    super();
    this.state = {
      firstName: "",
      lastName: "",
      isFriendly: false,
      gender: "",
      favColor: "blue"
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    type === "checkbox"
      ? this.setState({ [name]: checked })
      : this.setState({ [name]: value });
    this.setState({
      [name]: value
    });
  }

  render() {
    return (
      <form>
        <input
          type="text"
          name="firstName"
          value={this.state.firstName}
          placeholder="First Name"
          onChange={this.handleChange}
        />

        <br />

        <button>Submit</button>
      </form>
    );
  }
}

export default Input;
