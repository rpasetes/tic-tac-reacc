import express from "express"
import ViteExpress from "vite-express"
import { checkWinner, createGameState, type GameState } from "./tictactoe"

const app = express()
app.use(express.json())

const gamestate_map: Map<string, GameState> = new Map<string, GameState>();

const makeMove = (row: number, col: number, gamestate: GameState): GameState => {
  if (gamestate.winner) { return gamestate }
  const boardCopy = gamestate.board
  const cell = 3 * row + col

  if (boardCopy[cell] != '') { return gamestate }
  boardCopy[cell] = gamestate.nowPlaying

  return {
    board: boardCopy,
    nowPlaying: gamestate.nowPlaying === 'X' ? 'O' : 'X',
    winner: checkWinner(boardCopy)
  }
}

const generateId = (): string => {
  const id_number = Math.floor(Math.random() * 2048) 
  console.log(id_number)
  return id_number.toString()
}

app.get("/games", (_, res) => {
  console.log(gamestate_map)
  res.json(Object.fromEntries(gamestate_map))
})

// (1504) oh lmao every created board refs initGameState
// (1515) okay cool we got a gamestate blueprint
app.post("/create", (_, res) => {
  const gamestate = createGameState()
  const id = generateId()

  gamestate_map.set(id, gamestate)

  console.log(gamestate_map)
  console.log(gamestate_map.get(id))

  res.json(gamestate_map.get(id))
})

app.get("/message", (_, res) => res.send("Hello Worl!"))

// (1429) GOAL: get game endpoint to return idx'd json game
// (1432) option: use req.params to get idx
// (1446) extra: got invalid id check
app.get("/game/:id", (req, res) => {
  const id = req.params.id
  
  const game = gamestate_map.get(id)
  if (!game) {
    return res.status(404).json({ error: 'id not found' })
  }
  res.json(game)
})

// (1449) GOAL: change makeMove to update idx'd board
// (1453) wait, smell for mutations in makeMove
// (1504) okay: why is every board the same?
// (1517) and now we have multiple board states, SHIP
app.post("/move/:id", (req, res) => {
  const id = req.params.id

  const gamestate = gamestate_map.get(id)
  if (!gamestate) {
    return res.status(404).json({ error: 'id not found' })
  }

  const { row, col } = req.body
  const newGamestate = makeMove(row, col, gamestate)
  
  gamestate_map.set(id, newGamestate)
  res.json(newGamestate)
})

ViteExpress.listen(app, 3000, () => console.log("Server is listening..."))