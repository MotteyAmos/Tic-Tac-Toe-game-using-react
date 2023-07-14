import { useState } from "react"
import "./App.css";

const Square = ({className, value, onSquareClick})=>{

  return <button className={className}onClick={onSquareClick}>{value}</button>
}
function checkWinner(square){
  let lines = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
  ]

  for (let i = 0; i<lines.length; i++){
    let [a,b,c] = lines[i];

    if (square[a] && square[a] === square[b] && square[a] === square[c]){
      return square[a];
    }
  }

}
const Board = ({square, setHistory})=>{

  const [xIsNext, setXIsNext] = useState(true);
  const handleSquareClick = (index)=>{

    if (square[index] || checkWinner(square)) {
      return ;
    }
      const newSquare = square.slice();
     
      if(newSquare[index] == null){
        if(xIsNext){
          newSquare[index] = "X";
        }
        else{
          newSquare[index] = "O";
        }
      }

      setXIsNext(!xIsNext);
      setHistory([...square, newSquare])
  }
  
  const winner = checkWinner(square);

  let status;
  if (winner){
    status = `${winner} win`;
  }
  else{
    status = xIsNext ? `it X turn to play`: `it O turn to play`;
  }

  return(
    <>
      <div>{status}</div>
      <div className="board">
        <div className="board-row">
          <Square className="square"  onSquareClick={()=>handleSquareClick(0)} value={square[0]}/>
          <Square className="square"  onSquareClick={()=>handleSquareClick(1)} value={square[1]}/>
          <Square className="square"  onSquareClick={()=>handleSquareClick(2)} value={square[2]}/>
        </div>
        <div className="board-row">
          <Square className="square" onSquareClick={()=>handleSquareClick(3)} value={square[3]}/>
          <Square className="square"  onSquareClick={()=>handleSquareClick(4)} value={square[4]}/>
          <Square className="square"  onSquareClick={()=>handleSquareClick(5)} value={square[5]}/>
        </div>
        <div className="border-row">
          <Square className="square" onSquareClick={()=>handleSquareClick(6)} value={square[6]}/>
          <Square className="square" onSquareClick={()=>handleSquareClick(7)} value={square[7]}/>
          <Square className="square"  onSquareClick={()=>handleSquareClick(8)} value={square[8]}/>
        </div>
      </div>
       
    </>
  )
}
const App = ()=>{


  return(
    <>
     <Game />
    </>
  )
}

const Game = ()=>{
  const [history, setHistory] = useState(Array(9).fill(Array(9).fill(null)));

  const currentState = history[history.length - 1];
  function jumpTo(nextMove){

  }

  const moves = history.map((squares, move)=>{
    let description;
    if (move > 0){
      description = 'Go to move #' + move;
    }
    else{
      description = 'Go to game start';
    }
    return(
      <li>
        <button onClick={()=>jumpTo(move)}>{description}</button>
      </li>
    )
  })
  return(
    <>
      <Board square={currentState} setHistory={setHistory}/>
      <div >
        <ol>
          {moves}
        </ol>
      </div>
    </>
  )
}
export default App;