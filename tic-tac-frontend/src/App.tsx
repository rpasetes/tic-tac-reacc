import './App.css'
import { useState } from 'react'
import { Game } from './Game'
import { GameList } from './GameList'
import { initGameState, type GameState } from './tictactoe'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { CreateGameButton } from './CreateGameButton'

const queryClient = new QueryClient()

// TODO: learn the difference between server state and client state
// to understand how they connect.
function App() {
  const [gameState, setGameState] = useState<GameState>(initGameState)

  return (
    <>
      <h1>TIC-TAC-REACC</h1>
      <h1>SERVER LIST</h1>
      <QueryClientProvider client={queryClient}>
        <Game gameState={gameState} setGameState={setGameState} />
        <CreateGameButton />
        <GameList />
      </QueryClientProvider>
    </>
  )
}

export default App
