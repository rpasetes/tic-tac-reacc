import './App.css'
import { useState } from 'react'
import { Game } from './Game'
import { Lobby } from './Lobby'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

function App() {
  // const [gameState, setGameState] = useState<GameState>(initGameState)
  const [gameId, setGameId] = useState<string | undefined>(undefined)

  return (
    <QueryClientProvider client={queryClient}>
      {/* <Game gameState={gameState} setGameState={setGameState} /> */}
      {/* <Lobby /> */}
      {gameId ? <Game gameId={gameId} /> : <Lobby setGameId={setGameId} />}
    </QueryClientProvider>
  )
}

export default App
