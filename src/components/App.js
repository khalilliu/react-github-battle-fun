import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./Home";
import Battle from "./Battle";
import Popular from "./Popular";
import Result from "./Result";
import Nav from "./Nav";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
          <Nav />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/battle" component={Battle} />
            <Route path="/popular" component={Popular} />
            <Route path="/battle/results" component={Result} />
            <Route
              render={() => {
                return <p>Not found</p>;
              }}
            />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
