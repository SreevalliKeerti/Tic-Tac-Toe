import React, { useState, useEffect } from "react";
import {Link } from "react-router-dom";

import { Container, Button } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';

import '../App.css';

const Board = () => {
  const styling = {
    height: 80,
    width: 100,
    backgroundColor: '#2827CC',
    margin: 10,
    fontSize: 30, 
  };

  const divstyle = {
    display: "flex",
    flexDirection: "row",
    padding: 10,
    justifyContent: "center",
  };

  const [position, setposition] = useState([
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ]);

  const [count, setcount] = useState(0);

  const scoreList = {
    X: -1,
    O: 1,
    D: 0,
  };

  const [player, setplayer] = useState("X");

  const [winner, setWinner] = useState("");

  const resetBoard = () => {
    let values = [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ];
    setposition(values);
    setplayer("X");
    setcount(0);
    setWinner("");
  };

  useEffect(() => {
    checkWinner(position);
  }, [position]);

  useEffect(() => {
    if (count < 9) {
      console.log(count);
      if (player === "O") {
        nextMove();
      }
    }
  }, [player]);

  const checkWinner = (array) => {
    if (
      (array[0][0] === "X" && array[0][1] === "X" && array[0][2] === "X") ||
      (array[1][0] === "X" && array[1][1] === "X" && array[1][2] === "X") ||
      (array[2][0] === "X" && array[2][1] === "X" && array[2][2] === "X") ||
      (array[0][0] === "X" && array[1][0] === "X" && array[2][0] === "X") ||
      (array[0][1] === "X" && array[1][1] === "X" && array[2][1] === "X") ||
      (array[2][0] === "X" && array[2][1] === "X" && array[2][2] === "X") ||
      (array[0][0] === "X" && array[1][1] === "X" && array[2][2] === "X") ||
      (array[0][2] === "X" && array[1][1] === "X" && array[2][0] === "X")
    ) {
      setWinner("X");
      return "X";
    } else if (
      (array[0][0] === "O" && array[0][1] === "O" && array[0][2] === "O") ||
      (array[1][0] === "O" && array[1][1] === "O" && array[1][2] === "O") ||
      (array[2][0] === "O" && array[2][1] === "O" && array[2][2] === "O") ||
      (array[0][0] === "O" && array[1][0] === "O" && array[2][0] === "O") ||
      (array[0][1] === "O" && array[1][1] === "O" && array[2][1] === "O") ||
      (array[2][0] === "O" && array[2][1] === "O" && array[2][2] === "O") ||
      (array[0][0] === "O" && array[1][1] === "O" && array[2][2] === "O") ||
      (array[0][2] === "O" && array[1][1] === "O" && array[2][0] === "O")
    ) {
      setWinner("O");
      return "O";
    } else {
      let draw = true;

      for (let i = 0; i < position.length; i++) {
        for (let j = 0; j < 3; j++) {
          if (position[i][j] === "") {
            draw = false;
          }
        }
      }

      if (draw === true) {
        setWinner("D");
        return "D";
      }
    }
  };

  const playerSelect = (a, b) => {
    if (winner === "") {
      setcount(count + 1);
      let array = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""],
      ];
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          array[i][j] = position[i][j];
        }
      }
      if (position[a][b] === "") {
        array[a][b] = player;
        setposition(array);
      }
      //   if (player === "X") {
      //     setplayer("O");
      //   } else {
      //     setplayer("X");
      //   }
      setplayer("O");
    }
  };
  const nextMove = () => {
    setcount(count + 1);
    let bestSore = -Infinity;
    let values = [...position];
    let a, b;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (values[i][j] === "") {
          values[i][j] = "O";
         
          let score = minimax(values, 0, false);
          values[i][j] = "";
          if (score > bestSore) {
            bestSore = score;
            a = i;
            b = j;
          }
        }
      }
    }
    values[a][b] = "O";
    setposition(values);
    setplayer("X");
  };

  const minimax = (array, depth, decision) => {
    let result = checkWinner(array);
    setWinner("");
    if (result != null) {
      return scoreList[result];
    }

    if (decision) {
      let bestSore = -Infinity;
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (array[i][j] === "") {
            array[i][j] = "O";
            let score = minimax(array, depth + 1, false);
            array[i][j] = "";
            if (score !== null) {
              bestSore = Math.max(bestSore, score);
            }
          }
        }
      }
      return bestSore;
    } else {
      let bestSore = +Infinity;
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (array[i][j] === "") {
            array[i][j] = "X";
            let score = minimax(array, depth + 1, true);
            array[i][j] = "";
            if (score !== null) {
              bestSore = Math.min(bestSore, score);
            }
          }
        }
      }
      return bestSore;
    }
  };

  const winmsg = () => {
    switch(winner){
      case 'X': return <h1 className="text-center text-success">You Won!!</h1>;
      case 'O': return <h1 className="text-center text-danger">Computer Won!!</h1>;
      case 'D': return <h1 className="text-center text-warning">Its a tie</h1>;
      default: return <h1 className="text-center text-danger">Error</h1>;
    }
  }

  return (
    <Container className="p-5">
        <div>
        <h1 className="text-center">Human vs Computer</h1>
        <div>
            <div  style={divstyle}>
            <Button
                onClick={() => playerSelect(0, 0)}
                style={styling}
            >
                {position[0][0]}
            </Button>
            <Button 
                onClick={() => playerSelect(0, 1)}
                style={styling}
            >
                {position[0][1]}
            </Button>
            <Button
                onClick={() => playerSelect(0, 2)}
                style={styling}
            >
                {position[0][2]}
            </Button>
            </div>
            <div  style={divstyle}>
            <Button
                onClick={() => playerSelect(1, 0)}
                style={styling}
            >
                {position[1][0]}
            </Button>
            <Button
                onClick={() => playerSelect(1, 1)}
                style={styling}
            >
                {position[1][1]}
            </Button>
            <Button
                onClick={() => playerSelect(1, 2)}
                style={styling}
            >
                {position[1][2]}
            </Button>
            </div>
            <div  style={divstyle}>
            <Button
                onClick={() => playerSelect(2, 0)}
                style={styling}
            >
                {position[2][0]}
            </Button>
            <Button
                onClick={() => playerSelect(2, 1)}
                style={styling}
            >
                {position[2][1]}
            </Button>
            <Button
                onClick={() => playerSelect(2, 2)}
                style={styling}
            >
                {position[2][2]}
            </Button>
            </div>
        </div>
        {winner !== "" ? (
          <div>
              {winmsg()}
          </div>
          ) : <h1 className="text-center text-warning">
                {winner}
              </h1>}
        <div className="text-center">
            <button type="button" onClick={() => resetBoard()} className="btn btn-outline-success m-2 p-2">
              Reset
            </button>

            <Link to="/">
              <button type="button" className="btn btn-outline-info m-2 p-2">
                Home
              </button>
            </Link>
          </div>
        </div>
    </Container>
  );
};

export default Board;