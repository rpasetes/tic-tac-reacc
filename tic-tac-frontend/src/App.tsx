import './App.css'
import { useState } from 'react'
import { Game } from './Game'
import { Lobby } from './Lobby'
import { initGameState, type GameState } from './tictactoe'

// TODO: learn the difference between server state and client state
// to understand how they connect.
function App() {
  const [gameState, setGameState] = useState<GameState>(initGameState)

  return (
    <>
      <h1>TIC-TAC-REACC</h1>
      <Game gameState={gameState} setGameState={setGameState} />
      <h1>SERVER LOBBY</h1>
      <Lobby />
    </>
  )
}

export default App
