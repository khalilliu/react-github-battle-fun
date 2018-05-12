import React, { Component } from "react";

class PlayerInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({
      userName: e.target.value
    });
  }

  handleSubmit(e) {
    //console.log(this.props.id, this.state.userName);
    e.preventDefault();
    this.props.onSubmit(this.props.id, this.state.userName);
  }
  render() {
    return (
      <form className="column" onSubmit={this.handleSubmit}>
        <label className="header" htmlFor="userName">
          {this.props.label}
        </label>
        <input
          type="text"
          onChange={this.handleChange}
          autoComplete="off"
          placeholder="github username"
          value={this.state.userName}
        />
        <button
          className="button"
          type="submit"
          disabled={!this.state.userName}
        >
          Submit
        </button>
      </form>
    );
  }
}

export default PlayerInput;
