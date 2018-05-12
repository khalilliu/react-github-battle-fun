import React, { Component } from "react";
import * as api from "../utils/api";
import Loading from "./Loading";

const SelectLanguage = props => {
  const languages = ["All", "JavaScript", "Ruby", "Java", "CSS", "Python"];

  return (
    <ul className="languages">
      {languages.map(lang => {
        return (
          <li
            key={lang}
            style={
              lang === props.selectedLanguage ? { color: "#d0021b" } : null
            }
            onClick={() => props.onSelectLanguage(lang)}
          >
            {lang}
          </li>
        );
      })}
    </ul>
  );
};

const ReposGrid = ({ repos }) => {
  return (
    <ul className="popular-list ">
      {repos.map((repo, index) => (
        <RepoItem repo={repo} key={index} index={index} />
      ))}
    </ul>
  );
};

const RepoItem = ({ repo, index }) => {
  return (
    <li className="popular-item">
      <div className="popular-rank">#{index + 1}</div>
      <ul className="space-list-items align-center">
        <li>
          <img
            className="avatar"
            src={repo.owner.avatar_url}
            alt={"Avatar for " + repo.owner.login}
          />
        </li>
        <li>
          <a href={repo.html_url}>{repo.name}</a>
        </li>
        <li>@{repo.owner.login}</li>
        <li>{repo.stargazers_count} stars</li>
      </ul>
    </li>
  );
};

class Popular extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedLanguage: "All",
      repos: null
    };
    this.updateLanguage = this.updateLanguage.bind(this);
  }

  componentDidMount() {
    this.updateLanguage(this.state.selectedLanguage);
  }

  updateLanguage(language) {
    this.setState(
      {
        selectedLanguage: language,
        repos: null
      },
      () => {
        api.fetchPopularRepos(language).then(repos => {
          this.setState({ repos: repos }, () => {
            console.log(this.state.repos);
          });
        });
      }
    );
  }

  render() {
    return (
      <div>
        <SelectLanguage
          selectedLanguage={this.state.selectedLanguage}
          onSelectLanguage={this.updateLanguage}
        />
        {!this.state.repos ? (
          <Loading />
        ) : (
          <ReposGrid repos={this.state.repos} />
        )}
      </div>
    );
  }
}

export default Popular;
