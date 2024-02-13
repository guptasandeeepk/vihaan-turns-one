import React, { Component } from "react";
import "../App.css";

class Score extends Component {
  render() {
    const { score, onNextQuestion, name, timeTaken, startTime } = this.props;
    console.log(onNextQuestion);
    return (
      <div className="center">
        <h2>Thank you for playing {name}.</h2>
        <h4>Your score: {score}</h4>
        <h4>Start Time : {startTime}</h4>
        <h4>Time Taken : {timeTaken}</h4>
      </div>
    );
  }
}

export default Score;
