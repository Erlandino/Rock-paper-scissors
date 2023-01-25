// Imports
import { useState, useEffect } from "react";
import paper from "./media/icon-paper.svg";
import scissors from "./media/icon-scissors.svg";
import rock from "./media/icon-rock.svg";
import rules from "./media/image-rules.svg";
import logo from "./media/logo.svg";

// Component
export default function RockPaperScissors() {
  // useStates
  const [playerHand, setPlayerHand] = useState(null);
  const [computerHand, setComputerHand] = useState(null);
  const [winner, setWinner] = useState(null);
  const [score, setScore] = useState(0);
  const [ifShowRules, setIfShowRules] = useState(false);

  // function to start and decide winner of rock paper scissor game
  // 1 = Paper, 2 = Scissors, 3 = Rock
  function playGame(playerChoice) {
    console.log(playerChoice);
    // sets the players choice to useState "playerHand"
    setPlayerHand((prevHand) => {
      return playerChoice;
    });

    // sets the computer player to a random number(hand) from 1-3
    setComputerHand((prevHand) => {
      return Math.floor(Math.random() * 3) + 1;
    });
  }

  useEffect(() => {
    // checks all possibile hands and decides a winner appropriately
    if (playerHand != null && computerHand != null) {
      if (playerHand === 1 && computerHand === 3) {
        setWinner((prevWinner) => "YOU WIN"); /* Player wins */
        setScore((prevScore) => prevScore + 1);
      } else if (playerHand === 2 && computerHand === 1) {
        setWinner((prevWinner) => "YOU WIN"); /* Player wins */
        setScore((prevScore) => prevScore + 1);
      } else if (playerHand === 3 && computerHand === 2) {
        setWinner((prevWinner) => "YOU WIN"); /* Player wins */
        setScore((prevScore) => prevScore + 1);
      } else if (playerHand === computerHand) {
        setWinner((prevWinner) => "TIE"); /* Tie */
      } else {
        setWinner((prevWinner) => "YOU LOSE"); /* Computer wins */
        setScore((prevScore) => prevScore + -1);
      }
    }
  }, [playerHand, computerHand]);

  console.log("Player: " + playerHand);
  console.log("Computer: " + computerHand);
  console.log("Winner: " + winner);

  return (
    <>
      <div
        className="main__container"
        style={{ opacity: ifShowRules ? "0.2" : "1" }}
        onClick={() => {
          ifShowRules && setIfShowRules((prevState) => !prevState);
        }}
      >
        <div className="headline">
          <img src={logo} alt="" className="title__logo" />
          <div className="scoreboard">
            <p>Score</p>
            <p className="score">{score}</p>
          </div>
        </div>

        {!playerHand && (
          <div className="main__button__container button__container">
            <div className="button__container">
              <button onClick={() => playGame(1)} className="button button--paper">
                <img
                  src={paper}
                  alt="human hand with paper sign"
                  className="button__image button__image--paper"
                />
              </button>
              <button onClick={() => playGame(2)} className="button button--scissors">
                <img
                  src={scissors}
                  alt="human hand with scissors sign"
                  className="button__image button__image--scissors"
                />
              </button>
            </div>

            <button onClick={() => playGame(3)} className="button button--rock">
              <img
                src={rock}
                alt="human hand with rock sign"
                className="button__image button__image--rock"
              />
            </button>
          </div>
        )}

        {playerHand && (
          <>
            <div className="container__endgame">
              <div className="endgame__player">
                <h3>YOU PICKED</h3>
                <button
                  className={`button button--${
                    playerHand === 1 ? "paper" : playerHand === 2 ? "scissors" : "rock"
                  }`}
                >
                  <img
                    src={playerHand === 1 ? paper : playerHand === 2 ? scissors : rock}
                    alt="human hand with paper sign"
                    className="button__image button__image--paper"
                  />
                </button>
              </div>

              <div className="endgame__computer">
                <h3>THE HOUSE PICKED</h3>
                <button
                  className={`button button--${
                    computerHand === 1 ? "paper" : computerHand === 2 ? "scissors" : "rock"
                  }`}
                >
                  <img
                    src={computerHand === 1 ? paper : computerHand === 2 ? scissors : rock}
                    alt="human hand with paper sign"
                    className="button__image button__image--paper"
                  />
                </button>
              </div>
            </div>
            {winner && (
              <div className="results">
                <h1 className="results__text">{winner}</h1>
                <button
                  className="results__button"
                  onClick={() => setPlayerHand((prevHand) => null)}
                >
                  PLAY AGAIN
                </button>
              </div>
            )}
          </>
        )}

        <button onClick={() => setIfShowRules((prevState) => !prevState)} className="button--rules">
          RULES
        </button>
      </div>
      {ifShowRules && (
        <div className="rules">
          <p>RULES</p>
          <img src={rules} alt="" />
        </div>
      )}
    </>
  );
}
