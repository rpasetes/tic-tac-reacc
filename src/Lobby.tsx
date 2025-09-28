import { useFetch } from "./useFetch"

type LobbyProps = {
  setGameId: React.Dispatch<React.SetStateAction<string | undefined>>
}

export function Lobby({ setGameId }: LobbyProps) {
  // HERE LIES REACT QUERY, REST IN PEACE
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

  // HERE WAS REACT STATE AND EFFECTS, GLAD TO HAVE YA
  // const [gameList, setGameList] = useState<string[] | undefined>(undefined)
  // const [isPending, setIsPending] = useState(false)
  // const [error, setError] = useState(null)
  // useEffect(() => {
  //   async function getGameList() {
  //     setIsPending(true)
  //     try {
  //       const response = await fetch('/games')
  //       const games = await response.json()
  //       setGameList(games)
  //       setIsPending(false)
  //     } catch (e) {
  //       console.error(e)
  //       setError(e)
  //     }
  //   }
  //   getGameList()
  // }, [])

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
  // (1916) wow. its all just state and effects
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
