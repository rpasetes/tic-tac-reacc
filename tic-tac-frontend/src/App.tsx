import { useState } from 'react'
import './App.css'
import { initGameState, makeMove } from './tictactoe'
import type { GameState } from './tictactoe'

// // (1532) don't abstract something that isn't being repeated
// // (1533) leave it behind and make the app usable
// function Cell(row: number, col: number) {
//   return (
//     <td></td>
//   )
// }

// (1543) TARGET: MAKE APP RESPONSIVE
// (1604) WE HAVE A RESPONSIVE APP LFG
function App() {
  // (1508) you can just deconstruct gameState
  // (1515) ahh they gave me this limitation for a reason, honor it
  // const [board, setBoard] = useState(GameState.board)
  // const [winner, setWinner] = useState(GameState.winner)
  // const [currentPlayer, setCurrentPlayer] = useState(GameState.nowPlaying)
  // (1516) ohhh this is to simulate data from the backend huh...
  // (1556) set type to satisfy untyped error
  const [gameState, setGameState] = useState<GameState>(initGameState)

  return (
    <>
      <h1>TIC-TAC-REACC</h1>
      <table className='grid'>
        <tbody>
          <tr>
            <td onClick={() => setGameState(makeMove(gameState,0,0))}>{gameState.board[0][0]}</td>
            <td onClick={() => setGameState(makeMove(gameState,0,1))}>{gameState.board[0][1]}</td>
            <td onClick={() => setGameState(makeMove(gameState,0,2))}>{gameState.board[0][2]}</td>
          </tr>
          <tr>
            <td onClick={() => setGameState(makeMove(gameState,1,0))}>{gameState.board[1][0]}</td>
            <td onClick={() => setGameState(makeMove(gameState,1,1))}>{gameState.board[1][1]}</td>
            <td onClick={() => setGameState(makeMove(gameState,1,2))}>{gameState.board[1][2]}</td>
          </tr>
          <tr>
            <td onClick={() => setGameState(makeMove(gameState,2,0))}>{gameState.board[2][0]}</td>
            <td onClick={() => setGameState(makeMove(gameState,2,1))}>{gameState.board[2][1]}</td>
            <td onClick={() => setGameState(makeMove(gameState,2,2))}>{gameState.board[2][2]}</td>
          </tr>
        </tbody>
      </table>
    </>
  )
}

export default App
