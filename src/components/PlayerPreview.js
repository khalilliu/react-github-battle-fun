import React, { Component } from "react";
const PlayerPreview = ({ id, userName, avatar, children }) => {
  return (
    <div>
      <div className="column">
        <img src={avatar} className="avatar" alt={"Avatar for " + userName} />
        <h2 className="classname">@{userName}</h2>
      </div>
      {children}
    </div>
  );
};

export default PlayerPreview;
