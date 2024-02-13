import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Question from "./Components/Question";
import qBank from "./Components/QuestionBank";
import Score from "./Components/Score";
import "./App.css";
import Stopwatch from "./Components/Stopwatch";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questionBank: qBank,
      currentQuestion: 0,
      selectedOption: "",
      score: 0,
      quizEnd: false,
      loggedIn: false,
      code: "",
      timeTaken: 0,
      startTime: "",
    };
  }

  handleOptionChange = (e) => {
    this.setState({ selectedOption: e.target.value });
  };

  handleFormSubmit = (e) => {
    e.preventDefault();
    this.checkAnswer();
    this.handleNextQuestion();
  };

  checkAnswer = () => {
    const { questionBank, currentQuestion, selectedOption } = this.state;

    if (selectedOption === questionBank[currentQuestion].answer) {
      this.setState((prevState) => ({ score: prevState.score + 1 }));
    }
  };
  handleNextQuestion = () => {
    const { questionBank, currentQuestion, timeTaken, code } = this.state;
    if (currentQuestion + 1 < questionBank.length) {
      this.setState((prevState) => ({
        currentQuestion: prevState.currentQuestion + 1,
        selectedOption: "",
      }));
    } else {
      // Conver Time to mm: ss
      let milis = new Date().getTime() - timeTaken;
      let seconds = code !== "test" ? Math.floor((milis / 1000) % 60) : " -- ";
      let minutes =
        code !== "test" ? Math.floor((milis / 1000 / 60) % 60) : " -- ";
      this.setState({
        timeTaken: minutes + " minutes  and " + seconds + " seconds",
        quizEnd: true,
      });
    }
  };

  letIn = (event) => {
    event.preventDefault();
    const { code } = this.state;
    let codesFromSession = JSON.parse(localStorage.getItem("codeBank"));
    let index = codesFromSession.codes.indexOf(code);
    if (index > -1) {
      alert("You are in, Good Luck!");

      let ques = code === "test" ? qBank.testQues : qBank.realQues;
      this.setState({
        loggedIn: true,
        timeTaken: new Date().getTime(),
        startTime: new Date().toLocaleTimeString([], {
          year: "numeric",
          month: "numeric",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }),
        questionBank: ques,
      });
      if (code !== "test") {
        codesFromSession.codes.splice(index, 1);
        localStorage.setItem("codeBank", JSON.stringify(codesFromSession));
      }
    } else {
      alert("Wrong Code , Try again!");
      this.setState({
        code: "",
      });
    }
  };

  getName = () => {
    const { code } = this.state;
    let namesMap = {
      test: " ",
      sush: "Sushmita",
      klo74: "Priyanka & Vishal",
      lepqy: "Priyanka & Vishal",
      "8vyg1": "Vandana & Jayanta",
      "1wz7y": "Vandana & Jayanta",
      he3hd: "Somya & Anubhav",
      mjixh: "Somya & Anubhav",
      edw6e: "Sneha & Jitesh",
      irhpw: "Sneha & Jitesh",
      dc5ne: "Shubhangi & Rakesh",
      "5tnm7": "Shubhangi & Rakesh",
      fb6zp: "Neelam & Shibendra",
      yhfpf: "Neelam & Shibendra",
      e97rc: "Shruti & Pratik",
      nnazw: "Shruti & Pratik",
      nsb3q: "Somita & Gaurav",
      jpvmj: "Somita & Gaurav",
      qd2tr: "Sanket",
      "4t0nq": "Sanket",
      pb1sb: "Vaishali & Vikas",
      iu2yk: "Vaishali & Vikas",
      ls7nm: "Rinkle & Sushil",
      v5npn: "Rinkle & Sushil",
      eqgz1: "Pratiksha & Amit",
      bja5x: "Pratiksha & Amit",
      ysrrx: "Asmita & Subhav",
      rqo8p: "Asmita & Subhav",
      "20l2e": "Jean & Ron",
      "0s9bb": "Jean & Ron",
    };
    return namesMap[code];
  };

  render() {
    const {
      questionBank,
      currentQuestion,
      selectedOption,
      score,
      quizEnd,
      loggedIn,
      code,
      timeTaken,
      startTime,
    } = this.state;

    if (localStorage.getItem("codeBank") === null) {
      localStorage.setItem(
        "codeBank",
        JSON.stringify({
          codes: [
            "test",
            "sush",
            "klo74",
            "lepqy",
            "xhdny",
            "l61gi",
            "c7h8n",
            "3s04z",
            "043tp",
            "14b25",
            "98sy0",
            "pi2d0",
            "20l2e",
            "0s9bb",
            "ysrrx", //
            "rqo8p",
            "eqgz1", //
            "bja5x",
            "ls7nm", //
            "v5npn",
            "pb1sb", //
            "iu2yk",
            "qd2tr", //
            "4t0nq",
            "nsb3q", //
            "jpvmj",
            "e97rc", //
            "nnazw", //
            "fb6zp",
            "yhfpf",
            "dc5ne",
            "5tnm7",
            "edw6e",
            "irhpw",
            "he3hd",
            "mjixh",
            "8vyg1",
            "1wz7y",
          ],
        })
      );
    }

    return (
      <div className="App d-flex flex-column align-items-center justify-content-center">
        <h1 className="app-title">It's Vihaan's Birthday!</h1>
        {!quizEnd ? (
          !loggedIn ? (
            <form onSubmit={this.letIn}>
              <label className="portalText">
                Enter your code:
                <input
                  className="codeBox"
                  type="text"
                  value={code}
                  onChange={(e) =>
                    this.setState({
                      code: e.target.value,
                    })
                  }
                />
              </label>
              <input type="submit" />
            </form>
          ) : (
            <>
              <Stopwatch startStop={quizEnd}></Stopwatch>
              <Question
                startStop={quizEnd}
                question={questionBank[currentQuestion]}
                selectedOption={selectedOption}
                onOptionChange={this.handleOptionChange}
                onSubmit={this.handleFormSubmit}
              />
            </>
          )
        ) : (
          <Score
            score={score}
            timeTaken={timeTaken}
            startTime={startTime}
            name={this.getName()}
            onNextQuestion={this.handleNextQuestion}
            className="score"
          />
        )}
      </div>
    );
  }
}

export default App;
