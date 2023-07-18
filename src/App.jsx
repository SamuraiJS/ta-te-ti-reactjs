import { useState } from 'react'
import './App.css'

let clicks = 0;

function Square({ value, onClickSquare, id } ) {
  {/*El value que actua como un parámetro de "Square" se le llama prop
  Es un valor que se le puede pasar a este componente como un atributo con el mimo nombre*/}

  return (<button className="cell" onClick={onClickSquare} >{value}</button>);
}

function Board({ xIsNext, squares, onPlay }) {
    {/*
     useState: Funcion para recordar
     value: Valor a recordar
     setValue: Función que módifica el value
     Cada value es independiente de cada celda y almcena es valor
  */}

  const winner = calculateWinner(squares);
  let status;
  if(winner) {
    status = "El ganador es: " + winner;
  }else {
    status = "El siguiente en mover es: " + (xIsNext ? "X" : "O");
  }

  function handleClickSquare(i) {
    const nextSquares = squares.slice();

    if(squares[i] || calculateWinner(squares)){
      return;
    }
    if(xIsNext) {
      nextSquares[i] = 'X';
    }else {
      nextSquares[i] = 'O';
    }
    onPlay(nextSquares);
  }

  return(
    <>
      <div className="status">{status}</div>
      <div className="row-board">
        {/*A continuación utilizamos el prop del elemento square para asignarle un valor de contenido*/}
        <Square onClickSquare={() => handleClickSquare(0)} value={squares[0]}/>
        <Square onClickSquare={() => handleClickSquare(1)} value={squares[1]}/>
        <Square onClickSquare={() => handleClickSquare(2)} value={squares[2]}/>
      </div>
      <div className="row-board">
        <Square onClickSquare={() => handleClickSquare(3)} value={squares[3]}/>
        <Square onClickSquare={() => handleClickSquare(4)} value={squares[4]}/>
        <Square onClickSquare={() => handleClickSquare(5)} value={squares[5]}/>
      </div>
      <div className="row-board">
        <Square onClickSquare={() => handleClickSquare(6)} value={squares[6]}/>
        <Square onClickSquare={() => handleClickSquare(7)} value={squares[7]}/>
        <Square onClickSquare={() => handleClickSquare(8)} value={squares[8]}/>
      </div>
    </>
  )
}

function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentStatusBoard = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function handleHistory(nextMove) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {
    let description;
    if(move > 0) {
      description = `Movimiento número: ${move}`;
    }else {
      description = `Inicio del juego`;
    }
    return (
      <>
        <li key={move}>
          <button  onClick={() => handleHistory(move)}>{description}</button>
          {/*La 'key' es un elemento especial de React que le permite identificar a React los elementos
          de una lista en proximas renderizaciones, de esta manera puede saber si es un nuevo elementos o no*/}
        </li>
      </>
    )
  })

  return(
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentStatusBoard} onPlay={handlePlay}/>
      </div>
      <div className="game-history">
        <ol>
          {moves}
        </ol>
      </div>
    </div>
  )
}

export default Game

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++){
    const [a, b, c] = lines[i];
    if(squares[a] && squares[a] == squares[b] && squares[a] == squares[c]) {
      return squares[a];
    }
  }
  return null;
}