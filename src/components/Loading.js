import React, { Component } from "react";

var styles = {
  content: {
    textAlign: "center",
    fontSize: "35px"
  }
};

class Loading extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
  }

  tick = () => {
    let { count } = this.state;
    let maxLength = this.props.maxLength;
    this.timer = setTimeout(() => {
      if (count < maxLength) {
        this.setState({ count: count + 1 }, () => {
          this.tick();
        });
      } else {
        this.setState(
          {
            count: 0
          },
          () => this.tick()
        );
      }
    }, this.props.speed);
  };
  componentDidMount() {
    this.tick();
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  render() {
    return (
      <div style={styles.content}>
        {this.props.text}
        {Array(this.state.count + 1).join("😂")}
      </div>
    );
  }
}

Loading.defaultProps = {
  text: "Loading",
  speed: 200,
  maxLength: 5
};

export default Loading;
