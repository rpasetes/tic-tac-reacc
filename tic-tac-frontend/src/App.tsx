import './App.css'
import { useState } from 'react'
import { Game } from './Game'
import { GameList } from './GameList'
import { initGameState, type GameState } from './tictactoe'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

// TODO: learn the difference between server state and client state
// to understand how they connect.
function App() {
  const [gameState, setGameState] = useState<GameState>(initGameState)

  return (
    <>
      <h1>LOCAL TIC-TAC-REACC</h1>
      <Game gameState={gameState} setGameState={setGameState} />
      <h1>SERVER TIC-TAC-REACC</h1>
      <QueryClientProvider client={queryClient}>
        <GameList />
      </QueryClientProvider>
    </>
  )
}

export default App
