import { makeMove, type GameState } from "./tictactoe"

type GameType = {
  gameState: GameState,
  setGameState: React.Dispatch<React.SetStateAction<GameState>>
}

export function Game({ gameState, setGameState }: GameType) {
  const board = gameState.board
  const winner = gameState.winner

  return (
    <div>
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