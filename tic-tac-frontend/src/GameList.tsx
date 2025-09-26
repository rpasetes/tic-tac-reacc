import { useQuery } from "@tanstack/react-query"
import type { GameState } from "./tictactoe"

type GameEntry = [id: string, game: GameState]

export function GameList() {
  const { data, error, isPending } = useQuery({
    queryKey: ['game'],
    queryFn: async () => {
      const response = await fetch('/games')
      return await response.json()
    }
  })

  // (2041) okay made a proper map function iterator!
  // const ids = data.entries() as [string, GameState]
  // (2050) and moving data validation and type checking
  // helps with linting as well! now to do Array.from...
  // (2109) bruh wait i just realized it's already being
  // sent as a json, lemme actually type my data accordingly.
  // (2127) oh my god WE GOT MULTIPLE GAMES FROM THE SERVER!
  // learning so much about types and data structs rn haha
  if (error) return <div>{error.message}</div>
  if (isPending) return <div>Loading...</div>
  if (data) {
    const gameList = data as GameEntry[]

    return (
      <div>
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