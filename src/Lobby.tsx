import { useEffect, useState } from "react"

type LobbyProps = {
  setGameId: React.Dispatch<React.SetStateAction<string | undefined>>
}

export function Lobby({ setGameId }: LobbyProps) {
  const [gameList, setGameList] = useState<string[] | undefined>(undefined)
  const [isPending, setIsPending] = useState(false)
  const [error, setError] = useState(null)
  // const { invalidateQueries } = useQueryClient()

  // const createGame = useMutation({
  //   mutationFn: async () => {
  //     const response = await fetch('/create')
  //     return await response.json()
  //   },
  //   onSuccess: () => {
  //     invalidateQueries({ queryKey })
  //   }
  // })

  // const { data: gameList, error, isPending } = useQuery({
  //   queryKey,
  //   queryFn: async (): Promise<string[]> => {
  //     const response = await fetch('/games')
  //     return await response.json()
  //   }
  // })

  useEffect(() => {
    async function getGameList() {
      setIsPending(true)
      try {
        const response = await fetch('/games')
        const games = await response.json()
        setGameList(games)
        setIsPending(false)
      } catch (e) {
        console.error(e)
        setError(e)
      }
    }
    getGameList()
  }, [])

  const createNewGame = async () => {
    setIsPending(true)
    try {
      const response = await fetch('/create')
      const games = await response.json()
      setGameList(games)
      setIsPending(false)
    } catch (e) {
      console.error(e)
      setError(e)
    }
  }

  const handleClick = () => {
    createNewGame()
  }

  if (error) return <div>{error.message}</div>
  if (isPending) return <div>Loading...</div>
  // (1916) wow. its all just state and effects
  return (
    <div>
      <h1>SERVER LOBBY</h1>
      <button onClick={handleClick}>
        Create New Game
      </button>
      {/* {gameList && gameList.map((gameId) => (
        <div key={gameId}>
          <button onClick={() => setGameId(gameId)}>Join {gameId}</button>
        </div>
      ))} */}
    </div>
  )
}
