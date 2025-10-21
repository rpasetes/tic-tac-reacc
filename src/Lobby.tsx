import { useFetch } from "./useFetch"

type LobbyProps = {
  setGameId: React.Dispatch<React.SetStateAction<string | undefined>>
}

export function Lobby({ setGameId }: LobbyProps) {
  const { data, loading, error } = useFetch('/games')
  const gameList = data as string[]

  const createNewGame = async () => {
    try {
      const response = await fetch('/create', {
        method: 'POST'
      })
      const newGame = await response.json()
      console.log(response)
      setGameId(newGame)
    } catch (e) {
      console.error(e)
    }
  }

  const handleClick = () => {
    createNewGame()
  }

  if (error) return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full">
        <p className="text-red-600 font-medium text-center">{error}</p>
      </div>
    </div>
  )

  if (loading) return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
      <div className="text-gray-600 font-medium">Loading...</div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex flex-col items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Tic Tac Toe</h1>
          <p className="text-gray-500 text-sm">Welcome to the lobby</p>
        </div>

        <button
          onClick={handleClick}
          className="w-full py-3 px-4 mb-8 rounded-lg font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200"
        >
          Create New Game
        </button>

        <div>
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-4">Active Games</p>
          {gameList && gameList.length > 0 ? (
            <div className="space-y-2">
              {gameList.map((gameId) => (
                <button
                  key={gameId}
                  onClick={() => setGameId(gameId)}
                  className="w-full py-3 px-4 rounded-lg font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors duration-200 text-left flex items-center justify-between"
                >
                  <span>Game #{gameId}</span>
                  <span className="text-xs text-gray-500">→</span>
                </button>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-sm text-center py-4">No active games</p>
          )}
        </div>
      </div>
    </div>
  )
}
