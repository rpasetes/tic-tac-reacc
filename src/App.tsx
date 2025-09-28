import './App.css'
import { useState } from 'react'
import { Game } from './Game'
import { Lobby } from './Lobby'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

function App() {
  const [gameId, setGameId] = useState<string | undefined>(undefined)

  return (
    <QueryClientProvider client={queryClient}>
      {
        gameId
          ? <Game gameId={gameId} setGameId={setGameId} />
          : <Lobby setGameId={setGameId} />
      }
    </QueryClientProvider>
  )
}

export default App
