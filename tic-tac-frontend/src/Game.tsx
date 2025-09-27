import { useEffect, useState } from "react"
import { type GameState } from "./tictactoe"

type CellProps = {
  cellIndex: number
  gameState: GameState
  makeMove: (cellIndex: number) => Promise<void>
}

function Cell({ cellIndex, gameState, makeMove }: CellProps) {
  const handleClick = () => {
    makeMove(cellIndex)
  }

  return (
    <td onClick={handleClick}>
      {gameState.board[cellIndex]}
    </td>
  )
}

type BoardProps = {
  gameState: GameState,
  makeMove: (cellIndex: number) => Promise<void>
}

function Board({ gameState, makeMove }: BoardProps) {
  return (
    <table className='grid'>
      <tbody>
        <tr>
          <Cell cellIndex={0} gameState={gameState} makeMove={makeMove} />
          <Cell cellIndex={1} gameState={gameState} makeMove={makeMove} />
          <Cell cellIndex={2} gameState={gameState} makeMove={makeMove} />
        </tr>
        <tr>
          <Cell cellIndex={3} gameState={gameState} makeMove={makeMove} />
          <Cell cellIndex={4} gameState={gameState} makeMove={makeMove} />
          <Cell cellIndex={5} gameState={gameState} makeMove={makeMove} />
        </tr>
        <tr>
          <Cell cellIndex={6} gameState={gameState} makeMove={makeMove} />
          <Cell cellIndex={7} gameState={gameState} makeMove={makeMove} />
          <Cell cellIndex={8} gameState={gameState} makeMove={makeMove} />
        </tr>
      </tbody>
    </table>
  )
}

type GameProps = {
  gameId: string
}

// (1833) OMG... is that it?
export function Game({ gameId }: GameProps) {
  const [gameState, setGameState] = useState<GameState | undefined>(undefined)

  // 1. loadGame
  // --> setGameState, useEffect
  // `/game/${gameId}`
  useEffect(() => {
    async function fetchGame() {
      const response = await fetch(`/game/${gameId}`)
      const game = await response.json()
      setGameState(game)
    }
    fetchGame()
  }, [gameId])

  // 2. makeMove
  // --> setGameState
  // function makeMove(){
  //   setGameState
  // }
  const makeMove = async (cellIndex: number) => {
    const response = await fetch(`/move/${gameId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ cellIndex })
    })
    const game = await response.json()
    setGameState(game)
  }

  if (!gameState) return <div>Loading...</div>
  return (
    <div>
      <Board makeMove={makeMove} gameState={gameState} />
      {gameState.winner && <h1>{gameState.winner} WINS!</h1>}
    </div>
  )
}