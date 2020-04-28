import React, { Component } from "react";
import QuizBee from "./component/QuizBee";
import "./assets/style.css";
import quizService from "./quizService";
import QuestionBox from "./component/QuestionBox";
import Result from "./component/Result";

export class App extends Component {
  state = {
    questionBank: [],
    score: 0,
    responses: 0,
  };

  computeAnswer = (answer, correct) => {
    if (answer === correct) {
      this.setState({
        score: this.state.score + 1,
      });
    }
    this.setState({
      responses: this.state.responses < 5 ? this.state.responses + 1 : 5,
    });
  };

  getQuestions = () => {
    quizService().then((question) => {
      this.setState({
        questionBank: question,
      });
    });
  };

  playAgain = () => {
    this.getQuestions();
    this.setState({
      score: 0,
      responses: 0,
    });
  };

  componentDidMount() {
    this.getQuestions();
  }
  render() {
    return (
      <div className="container">
        <QuizBee />
        {this.state.questionBank.length > 0 &&
          this.state.responses < 5 &&
          this.state.questionBank.map(
            ({ question, answers, correct, questionId }) => (
              <QuestionBox
                question={question}
                options={answers}
                key={questionId}
                selected={(answer) => this.computeAnswer(answer, correct)}
              />
            )
          )}

        {this.state.responses === 5 ? (
          <Result score={this.state.score} playAgain={this.playAgain} />
        ) : null}
      </div>
    );
  }
}

export default App;
