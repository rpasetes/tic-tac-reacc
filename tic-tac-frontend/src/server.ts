import express from "express"
import ViteExpress from "vite-express"
import { checkWinner, initGameState, type GameState } from "./tictactoe"

const app = express()
app.use(express.json())
 
const gamestate = initGameState

const gamestate_map: Map<string, GameState> = new Map<string, GameState>();

const makeMove = (row: number, col: number): void => {
  if (gamestate.winner) { return }
  const boardCopy = gamestate.board
  const cell = 3 * row + col

  if (boardCopy[cell] != '') { return }
  boardCopy[cell] = gamestate.nowPlaying

  gamestate.nowPlaying = gamestate.nowPlaying === 'X' ? 'O' : 'X'
  gamestate.winner = checkWinner(boardCopy)
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

app.post("/create", (_, res) => {
  const gamestate = initGameState
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

app.post("/move", (req, res) => {
  const { row, col } = req.body
  makeMove(row, col)
  res.json(gamestate)
})

// (1119) nice, i can hot load my server!
ViteExpress.listen(app, 3000, () => console.log("Server is listening..."))