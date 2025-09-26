import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
const queryKey = ['games']

type LobbyProps = {
  setGameId: React.Dispatch<React.SetStateAction<string | undefined>>
}

export function Lobby({ setGameId }: LobbyProps) {
  const { invalidateQueries } = useQueryClient()

  const createGame = useMutation({
    mutationFn: async () => {
      const response = await fetch('/create')
      return await response.json()
    },
    onSuccess: () => {
      invalidateQueries({ queryKey })
    }
  })

  const { data: gameList, error, isPending } = useQuery({
    queryKey,
    queryFn: async (): Promise<string[]> => {
      const response = await fetch('/games')
      return await response.json()
    }
  })

  if (error) return <div>{error.message}</div>
  if (isPending) return <div>Loading...</div>
  if (gameList) {
    console.log(gameList)
    return (
      <div>
        <h1>SERVER LOBBY</h1>
        <button onClick={() => createGame.mutate()}>
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

  return <></>
}