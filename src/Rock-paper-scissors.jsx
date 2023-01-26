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
  const [width, setWidth] = useState(window.innerWidth);

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
      return randomHand();
    });
  }

  // Sets computerHand state to a random hand sign from paper, scissors and rock
  function randomHand() {
    let handNumber = Math.floor(Math.random() * 3) + 1;

    if (handNumber === 1) return "paper";
    else if (handNumber === 2) return "scissors";
    else return "rock";
  }

  // Sets these 3 states to their default values "null".
  // making all elements depending on the states being true display while the ones depending on them being false are hidden
  function resetGame() {
    setPlayerHand((prevHand) => null);
    setComputerHand((prevHand) => null);
    setWinner((prevHand) => null);
  }

  useEffect(() => {
    // checks all possibile hands and decides a winner appropriately
    // also changes and stores new score in "score" useState
    if (playerHand != null && computerHand != null) {
      if (playerHand === "paper" && computerHand === "rock") {
        setWinner((prevWinner) => "YOU WIN"); /* Player wins */
        setScore((prevScore) => prevScore + 1); /*  + 1 score */
      } else if (playerHand === "scissors" && computerHand === "paper") {
        setWinner((prevWinner) => "YOU WIN"); /* Player wins */
        setScore((prevScore) => prevScore + 1); /*  + 1 score */
      } else if (playerHand === "rock" && computerHand === "scissors") {
        setWinner((prevWinner) => "YOU WIN"); /* Player wins */
        setScore((prevScore) => prevScore + 1); /*  + 1 score */
      } else if (playerHand === computerHand) {
        setWinner((prevWinner) => "TIE"); /* Tie */
      } else {
        setWinner((prevWinner) => "YOU LOSE"); /* Computer wins */
        setScore((prevScore) => prevScore + -1); /*  - 1 score */
      }
    }
  }, [
    playerHand,
    computerHand,
  ]); /* only runs content of useEffect if "playerHand" or "computerHand" state has changed value */

  // Gathers the viewport width of the the device and sets it to "width" state
  useEffect(() => {
    // Sets the viewport width on width resize
    window.addEventListener("resize", () => {
      setWidth((prevState) => window.innerWidth);
    });
    // cleanup
    return () =>
      window.removeEventListener("resize", () => {
        setWidth((prevState) => window.innerWidth);
      });
  }, []);

  console.log("Player: " + playerHand);
  console.log("Computer: " + computerHand);
  console.log("Winner: " + winner);
  console.log(width);

  const winnerAnimation = {
    animation: "10s borderGlow",
    animationDelay: "0.5s",
  };

  // jsx elements
  return (
    <>
      {/* Adds opacity to container if rules are displayed
          and makes the container hide the rules that are displayed if clicked */}
      <div
        className="main__container"
        style={{ opacity: ifShowRules ? "0.2" : "1" }} /* opacity */
        onClick={() => {
          ifShowRules && setIfShowRules((prevState) => !prevState); /* hide/display rules */
        }}
      >
        {/* Container for headline */}
        <div className="headline">
          {/* logo with "rock paper scissors" text */}
          <img src={logo} alt="logo with `rock paper scissors` text" className="title__logo" />{" "}
          {/* Container for scoreboard */}
          <div className="scoreboard">
            <p>Score</p>
            <p className="score">{score}</p> {/* Displays "score" state */}
          </div>
        </div>
        {/* Container for headline end */}

        {/* Displays content if "playerHand" is not true, 
            Meaning at the start of the game or after the player presses "PLAY AGAIN"  */}
        {!playerHand && (
          // Container for rock-paper-scissors choices
          <div className="main__button__container button__container">
            {/* Container for paper-scissors buttons */}
            <div className="button__container">
              {/* Calls playGame function with the number 1, 1 is used as paper in the function*/}
              <button onClick={() => playGame("paper")} className="button button--paper">
                <img
                  src={paper} /* imported image of a human hand with paper sign */
                  alt="human hand with paper sign"
                  className="button__image button__image--paper"
                />
              </button>
              {/* Calls playGame function with the number 2, 2 is used as scissors in the function*/}
              <button onClick={() => playGame("scissors")} className="button button--scissors">
                <img
                  src={
                    scissors
                  } /* imported image of a human hand with scissors sign in the function*/
                  alt="human hand with scissors sign"
                  className="button__image button__image--scissors"
                />
              </button>
            </div>
            {/* Container for paper-scissors buttons end */}

            {/* Rock button */}
            {/* Calls playGame function with the number 3, 3 is used as rock */}
            <button onClick={() => playGame("rock")} className="button button--rock">
              <img
                src={rock} /* imported image of a human hand with rock sign */
                alt="human hand with rock sign"
                className="button__image button__image--rock"
              />
            </button>
            {/* Rock button end */}
          </div>
          // Container for rock-paper-scissors end
        )}

        {/* Displays content if "playerHand" is true.
            Meaning at the end of the game when the results are released/releasing  */}
        {playerHand && (
          <>
            {/* Container for the hand signs and text above */}
            <div className="container__endgame">
              {/* Players choice container */}
              <div className="endgame__player">
                {/* Container for button */}
                <div style={winner === "YOU WIN" ? winnerAnimation : {}} className="buttonShadow">
                  {/* Button with different styling using class, depending on player hand choice */}
                  {/* Has an image of the player hand choice inside of it */}
                  <button className={`button button--${playerHand}`}>
                    {/* Choses image and other attributes based on player hand sign choice */}
                    <img
                      src={
                        playerHand === "paper" ? paper : playerHand === "scissors" ? scissors : rock
                      }
                      alt={`human hand with ${playerHand} sign`}
                      className={`button__image button__image--${playerHand}`}
                    />
                  </button>
                </div>
                <h3>YOU PICKED</h3>
              </div>
              {/* Players choice container end*/}

              {/* Computer choice container */}
              <div className="endgame__computer">
                {/* Container for button */}
                <div style={winner === "YOU LOSE" ? winnerAnimation : {}} className="buttonShadow">
                  {/* Button with different styling using class, depending on computer hand choice */}
                  {/* Has an image of the computer hand choice inside of it */}
                  <button className={`button button--${computerHand}`}>
                    {/* Choses image and other attributes based on player hand sign choice */}
                    <img
                      src={
                        computerHand === "paper"
                          ? paper
                          : computerHand === "scissors"
                          ? scissors
                          : rock
                      }
                      alt={`human hand with ${computerHand} sign`}
                      className={`button__image button__image--${computerHand}`}
                    />
                  </button>
                </div>
                <h3>THE HOUSE PICKED</h3>
              </div>
              {/* Computer choice container end*/}
            </div>
            {/* Container for the hand signs and text above end*/}
          </>
        )}

        {/* Displays content if "winner" is true.
            Meaning at the end of the game when the results are released.
            Still takes space when hidden unless width is more than 1000px*/}
        {((width > 1000 && winner) || width < 1000) && (
          <div className="results" style={{ visibility: winner ? "visible" : "hidden" }}>
            {/* title with state that contains either "YOU WIN", "YOU LOSE" or "TIE" in it depending on match results*/}
            <h1 className="results__text">{winner}</h1>
            {/* button that resets the game */}
            <button className="results__button" onClick={resetGame}>
              PLAY AGAIN
            </button>
          </div>
        )}

        {/* Button that makes rest of page transparent and displays an image with rules of the game on top of it */}
        <button onClick={() => setIfShowRules((prevState) => !prevState)} className="button--rules">
          RULES
        </button>
      </div>

      {/* Displays when ifShowRules is true.
          Meaning after rules button is clicked*/}
      {ifShowRules && (
        <div className="rules">
          <p>RULES</p>
          {/* Imported image of the rules of the game */}
          <img src={rules} alt="" />
        </div>
      )}
    </>
  );
}
