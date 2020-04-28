import React from "react";

function Result({ score, playAgain }) {
  return (
    <div className="score-board">
      <div className="score">You Scored {score} / 5 correct Answers</div>
      <button onClick={playAgain} className="playBtn">
        Play Again
      </button>
    </div>
  );
}

export default Result;
