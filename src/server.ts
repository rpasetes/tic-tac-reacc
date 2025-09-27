import express from "express"
import ViteExpress from "vite-express"
import { createGameState, makeMove, type GameState } from "./tictactoe"

const app = express()
app.use(express.json())

// TicTacToe Lobby / Data Store Logic:
const gamestate_map: Map<string, GameState> = new Map<string, GameState>();

// create game creates a new game, puts it in the data store, and returns its ID :)
function createGame(): string {
  const gamestate = createGameState()
  gamestate_map.set(gamestate.id, gamestate)
  return gamestate.id
}

// HTTP SERVER
app.get("/games", (_, res) => {
  console.log(gamestate_map)
  const idList = Array.from(gamestate_map.keys())
  console.log(idList)
  res.json(idList)
})

app.post("/create", (_, res) => {
  const id = createGame()

  console.log('updating map to', gamestate_map)
  console.log('with keys:', gamestate_map.keys())

  res.json([id])
})

app.get("/message", (_, res) => res.send("Hello World!"))

app.get("/game/:id", (req, res) => {
  const id = req.params.id

  const game = gamestate_map.get(id)
  if (!game) {
    return res.status(404).json({ error: 'id not found' })
  }
  res.json(game)
})

app.post("/move/:id", (req, res) => {
  const id = req.params.id

  const gamestate = gamestate_map.get(id)
  if (!gamestate) {
    return res.status(404).json({ error: 'id not found' })
  }

  const { cellIndex } = req.body
  const newGamestate = makeMove(cellIndex, gamestate)

  gamestate_map.set(id, newGamestate)
  res.json(newGamestate)
})

ViteExpress.listen(app, 3000, () => console.log("Server is listening..."))