import { makeMove, type GameState } from "./tictactoe"

type GameType = {
  gameState: GameState,
  setGameState: React.Dispatch<React.SetStateAction<GameState>>
}

type CellProps = {
  row: number
  col: number
  gameState: GameState
}

// (2155) you know what screw it i'm gonna simplify
// and break down components this time around.
// (2232) with this broken down, we can call our
// move/:id endpoint.
// TODO: write mutation query hook here for makeMove
// and how it connects to "server state" vs "client state" 
function Cell({ row, col, gameState }: CellProps) {

  const handleClick = () => {
    makeMove(gameState, row, col)
  }

  return (
    <td onClick={handleClick}>
      {gameState.board[3 * row + col]}
    </td>
  )
}

function Board({ gameState }: {gameState: GameState}) {
  return (
    <table className='grid'>
      <tbody>
        <tr>
          <Cell row={0} col={0} gameState={gameState} />
          <Cell row={0} col={1} gameState={gameState} />
          <Cell row={0} col={2} gameState={gameState} />
        </tr>
        <tr>
          <Cell row={1} col={0} gameState={gameState} />
          <Cell row={1} col={1} gameState={gameState} />
          <Cell row={1} col={2} gameState={gameState} />
        </tr>
        <tr>
          <Cell row={2} col={0} gameState={gameState} />
          <Cell row={2} col={1} gameState={gameState} />
          <Cell row={2} col={2} gameState={gameState} />
        </tr>
      </tbody>
    </table>
  )
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