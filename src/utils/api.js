import axios from "axios";

var id = "YOUR_CLIENT_ID";
var sec = "YOUR_SECRET_ID";
const params = "?client_id=" + id + "&client_secret=" + sec;

function getProfile(username) {
  return axios
    .get("https://api.github.com/users/" + username)
    .then(user => user.data);
}

function getRepos(username) {
  return axios
    .get("https://api.github.com/users/" + username + "/repos?per_page=100")
    .then(repos => repos.data);
}

function getStarCount(repos) {
  return repos.reduce((count, repo) => {
    return count + repo.stargazers_count;
  }, 0);
}

function calculateScore(profile, repos) {
  var followers = profile.followers;
  var totalStars = getStarCount(repos);

  return followers * 3 + totalStars;
}

function handleError(error) {
  console.warn(error);
  return null;
}

function getUserData(player) {
  return axios.all([getProfile(player), getRepos(player)]).then(data => {
    var profile = data[0],
      repos = data[1];
    return {
      profile,
      score: calculateScore(profile, repos)
    };
  });
}

function sortPlayers(players) {
  return players.sort(function(a, b) {
    return b.score - a.score;
  });
}

export function battle(players) {
  return axios
    .all(players.map(getUserData))
    .then(sortPlayers)
    .catch(handleError);
}

export function fetchPopularRepos(lang) {
  var encodedURI = window.encodeURI(
    "https://api.github.com/search/repositories?q=stars:>1+language:" +
      lang +
      "&sort=stars&order=desc&type=repositories"
  );
  return axios.get(encodedURI).then(res => res.data.items);
}
