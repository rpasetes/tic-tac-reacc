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


function Game({ gameState, setGameState }) {
  const board = gameState.board
  const winner = gameState.winner
  const blah = true

  return (
    <div>
      {(() => {
        if (blah) {
        return 'blhhh'
        }
      })()}
      <table className='grid'>
        <tbody>
          <tr>
            <td onClick={() => setGameState(makeMove(gameState,0,0))}>{board[0]}</td>
            <td onClick={() => setGameState(makeMove(gameState,0,1))}>{board[1]}</td>
            <td onClick={() => setGameState(makeMove(gameState,0,2))}>{board[2]}</td>
          </tr>
          <tr>
            <td onClick={() => setGameState(makeMove(gameState,1,0))}>{board[3]}</td>
            <td onClick={() => setGameState(makeMove(gameState,1,1))}>{board[4]}</td>
            <td onClick={() => setGameState(makeMove(gameState,1,2))}>{board[5]}</td>
          </tr>
          <tr>
            <td onClick={() => setGameState(makeMove(gameState,2,0))}>{board[6]}</td>
            <td onClick={() => setGameState(makeMove(gameState,2,1))}>{board[7]}</td>
            <td onClick={() => setGameState(makeMove(gameState,2,2))}>{board[8]}</td>
          </tr>
        </tbody>
      </table>
      {winner 
      ? <h1>{winner} WINS!</h1>
      : <></>}
    </div>
  )
}

// (2015) 25 Minutes: Refactor Code check back in.
// (2046) ehh i'm not really having fun asking for
// help with chatgpt, but abstracting components seem
// important here, just by replacing gameState with
// the useQuery hook and the setGameState with
// useMutation. if anything, that enough is setting
// up for tomorrow. 2055
function App() {
  const [gameState, setGameState] = useState<GameState>(initGameState)

  return (
    <>
      <h1>TIC-TAC-REACC</h1>
      <Game gameState={gameState} setGameState={setGameState} />
    </>
  )
}

export default App
