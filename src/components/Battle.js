import React, { Component } from "react";
import { Link } from "react-router-dom";
import PlayerInput from "./PlayerInput";
import PlayerPreview from "./PlayerPreview";

class Battle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playerOneName: "",
      playerOneImage: null,
      playerTwoName: "",
      playerTwoImage: null
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }
  handleSubmit(id, userName) {
    this.setState(
      {
        [id + "Name"]: userName,
        [id + "Image"]: `https://github.com/${userName}.png?size=200`
      },
      () => console.log(this.state)
    );
  }

  handleReset(id) {
    this.setState({
      [id + "Name"]: "",
      [id + "Image"]: null
    });
  }

  render() {
    const { match } = this.props;
    console.log(match);
    const {
      playerOneImage,
      playerOneName,
      playerTwoImage,
      playerTwoName
    } = this.state;
    return (
      <div>
        <div className="row">
          {!this.state.playerOneName && (
            <PlayerInput
              onSubmit={this.handleSubmit}
              label="Player One"
              id="playerOne"
            />
          )}
          {this.state.playerOneImage && (
            <PlayerPreview
              id="playerOne"
              userName={playerOneName}
              avatar={playerOneImage}
            >
              <button
                className="reset"
                onClick={() => this.handleReset("playerOne")}
              >
                Reset
              </button>
            </PlayerPreview>
          )}
          {!this.state.playerTwoName && (
            <PlayerInput
              onSubmit={this.handleSubmit}
              label="Player Two"
              id="playerTwo"
            />
          )}
          {this.state.playerTwoImage && (
            <PlayerPreview
              id="playerTwo"
              userName={playerTwoName}
              avatar={playerTwoImage}
            >
              <button
                className="reset"
                onClick={() => this.handleReset("playerTwo")}
              >
                Reset
              </button>
            </PlayerPreview>
          )}
        </div>
        {playerOneImage &&
          playerTwoImage && (
            <Link
              className="button"
              to={{
                pathname: match.url + "/results",
                search:
                  "?playerOneName=" +
                  playerOneName +
                  "&playerTwoName=" +
                  playerTwoName
              }}
            >
              Battle
            </Link>
          )}
      </div>
    );
  }
}

export default Battle;
