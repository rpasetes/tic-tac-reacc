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

  if (error) return <div>{error}</div>
  if (loading) return <div>Loading...</div>
  return (
    <div>
      <h1>SERVER LOBBY</h1>
      <button onClick={handleClick}>
        Create New Game
      </button>
      {gameList && gameList.map((gameId) => (
        <div key={gameId}>
          <button onClick={() => setGameId(gameId)}>Join {gameId}</button>
        </div>
      ))}
    </div>
  )
}
