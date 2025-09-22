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
// (1702) FRONTEND INDEX CHANGED, 
function App() {
  const [gameState, setGameState] = useState<GameState>(initGameState)

  return (
    <>
      <h1>TIC-TAC-REACC</h1>
      <table className='grid'>
        <tbody>
          <tr>
            <td onClick={() => setGameState(makeMove(gameState,0,0))}>{gameState.board[0]}</td>
            <td onClick={() => setGameState(makeMove(gameState,0,1))}>{gameState.board[1]}</td>
            <td onClick={() => setGameState(makeMove(gameState,0,2))}>{gameState.board[2]}</td>
          </tr>
          <tr>
            <td onClick={() => setGameState(makeMove(gameState,1,0))}>{gameState.board[3]}</td>
            <td onClick={() => setGameState(makeMove(gameState,1,1))}>{gameState.board[4]}</td>
            <td onClick={() => setGameState(makeMove(gameState,1,2))}>{gameState.board[5]}</td>
          </tr>
          <tr>
            <td onClick={() => setGameState(makeMove(gameState,2,0))}>{gameState.board[6]}</td>
            <td onClick={() => setGameState(makeMove(gameState,2,1))}>{gameState.board[7]}</td>
            <td onClick={() => setGameState(makeMove(gameState,2,2))}>{gameState.board[8]}</td>
          </tr>
        </tbody>
      </table>
      {gameState.winner 
      ? <h1>{gameState.winner} WINS!</h1>
      : <></>}
    </>
  )
}

export default App
