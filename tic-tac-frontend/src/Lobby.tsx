import { QueryClient, QueryClientProvider, useMutation, useQuery } from "@tanstack/react-query"
import type { GameState } from "./tictactoe"

type GameEntry = [id: string, game: GameState]

const queryClient = new QueryClient()
const queryKey = ['games']

 function GameList() {
  const createGame = useMutation({
    mutationFn: async () => {
      const response = await fetch('/create')
      return await response.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey })
    }
  })

  const { data, error, isPending } = useQuery({
    queryKey,
    queryFn: async () => {
      const response = await fetch('/games')
      return await response.json()
    }
  })

  if (error) return <div>{error.message}</div>
  if (isPending) return <div>Loading...</div>
  if (data) {
    const gameList = data as GameEntry[]

    return (
      <div>
        <button onClick={() => createGame.mutate()}>
          Create New Game
        </button>
        {gameList.map((game) => (
          <div key={game[0]}>
            <div>Game {game[0]} has {game[1].nowPlaying} playing</div>
          </div>
        ))}
      </div>
    )
  }

  return <></>
}

export function Lobby() {
  return (
    <QueryClientProvider client={queryClient}>
      <GameList />
    </QueryClientProvider>
  )
}