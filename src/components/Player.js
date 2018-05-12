import React, { Component } from "react";

import PlayerPreview from "./PlayerPreview";

function Profile(props) {
  const info = props.info;

  return (
    <PlayerPreview userName={info.name} avatar={info.avatar_url}>
      <ul className="space-list-items align-center">
        {info.name && <li>{info.name}</li>}
        {info.location && <li>{info.location}</li>}
        {info.company && <li>{info.company}</li>}
        <li>Followers: {info.followers}</li>
        <li>Followering: {info.Followering}</li>
        <li>Public Repos: {info.public_repos}</li>
        {info.blog && (
          <li>
            <a href={info.blog}>{info.blog}</a>
          </li>
        )}
      </ul>
    </PlayerPreview>
  );
}

class Player extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <h1 className="header">{this.props.label}</h1>
        <h3 style={{ textAlign: "center" }}>score: {this.props.score}</h3>
        <Profile info={this.props.profile} />
      </div>
    );
  }
}

export default Player;
