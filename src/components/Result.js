import React, { Component } from "react";
import Player from "./Player";
import { Link } from "react-router-dom";
import queryString from "query-string";
import Loading from "./Loading";

import * as api from "../utils/api";

class Result extends Component {
  constructor(props) {
    super(props);
    this.state = {
      winner: null,
      loser: null,
      errror: null,
      loading: true
    };
  }

  componentDidMount() {
    const players = queryString.parse(this.props.location.search);
    //console.log(players);
    const _this = this;
    api.battle([players.playerOneName, players.playerTwoName]).then(data => {
      if (data === null) {
        return this.setState({
          error:
            "Looks like there was an error. Check that both users exist on Github.",
          loading: false
        });
      }

      _this.setState({
        error: null,
        winner: data[0],
        loser: data[1],
        loading: false
      });
    });
  }

  render() {
    const { error, loading, loser, winner } = this.state;

    if (loading === true) {
      return <Loading />;
    }

    if (error) {
      return (
        <div>
          <p>{error}</p>
          <Link to="/battle">Reset</Link>
        </div>
      );
    }

    return (
      <div>
        <div className="row">
          <Player
            label="Winner"
            score={winner.score}
            profile={winner.profile}
          />
          <Player label="Loser" score={loser.score} profile={loser.profile} />
        </div>
        <Link to="/battle" className="button">
          Back To Battle🚀🚀
        </Link>
      </div>
    );
  }
}

export default Result;
