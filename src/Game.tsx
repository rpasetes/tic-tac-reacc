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

  const cell = gameState.board[cellIndex]
  const isX = cell === 'X'
  const isO = cell === 'O'

  return (
    <td
      onClick={handleClick}
      className={`
        cursor-pointer select-none transition-colors duration-200
        ${!cell ? 'hover:bg-gray-50' : ''}
        ${isX ? 'text-blue-600' : ''}
        ${isO ? 'text-red-600' : ''}
        ${!gameState.winner && !cell ? 'active:bg-gray-100' : ''}
      `}
    >
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
  setGameId: React.Dispatch<React.SetStateAction<string | undefined>>
}

export function Game({ gameId, setGameId }: GameProps) {
  const [gameState, setGameState] = useState<GameState | undefined>(undefined)

  useEffect(() => {
    async function fetchGame() {
      const response = await fetch(`/game/${gameId}`)
      const game = await response.json()
      setGameState(game)
    }
    fetchGame()
  }, [gameId])

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

  if (!gameState) return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
      <div className="text-gray-600 font-medium">Loading...</div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex flex-col items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full">
        <div className="text-center mb-8">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">Game ID</h2>
          <p className="text-2xl font-bold text-gray-800">{gameId}</p>
        </div>

        <div className="flex justify-center mb-8">
          <Board makeMove={makeMove} gameState={gameState} />
        </div>

        <div className="text-center mb-8">
          {gameState.winner ? (
            <div className="space-y-2">
              <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Game Over</p>
              <h1 className={`text-4xl font-bold ${
                gameState.winner === 'X' ? 'text-blue-600' : 'text-red-600'
              }`}>
                {gameState.winner} Wins!
              </h1>
            </div>
          ) : (
            <div className="space-y-2">
              <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Current Player</p>
              <p className={`text-3xl font-bold ${
                gameState.nowPlaying === 'X' ? 'text-blue-600' : 'text-red-600'
              }`}>
                {gameState.nowPlaying}
              </p>
            </div>
          )}
        </div>

        <button
          onClick={() => setGameId(undefined)}
          className="w-full py-3 px-4 rounded-lg font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors duration-200"
        >
          Return to Lobby
        </button>
      </div>
    </div>
  )
}