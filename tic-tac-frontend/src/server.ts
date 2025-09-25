import express from "express"
import ViteExpress from "vite-express"
import { checkWinner, initGameState, type GameState } from "./tictactoe"

const app = express()
app.use(express.json())
 
const gamestate = initGameState

// (1113) making new map separate from single game
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

// (1202) we have multiple games with a better id algo!
const generateId = (): string => {
  const id_number = Math.floor(Math.random() * 2048) 
  console.log(id_number)
  return id_number.toString()
}

// (1120) hit the endpoint, we have an empty map!
// (1222) whoaaa you can convert Map to an object
app.get("/games", (_, res) => {
  console.log(gamestate_map)
  res.json(Object.fromEntries(gamestate_map))
})

// (1140) okay, single game returned locally!
// (1151) or at least to the console,
// (1158) removed return statement, console log back!
// (1207) new game get from gamestate_map!
// (1215) logs are printing and json is returning!
app.post("/create", (_, res) => {
  const gamestate = initGameState
  const id = generateId()

  gamestate_map.set(id, gamestate)

  console.log(gamestate_map)
  console.log(gamestate_map.get(id))

  res.json(gamestate_map.get(id))
})

app.get("/message", (_, res) => res.send("Hello Worl!"))

app.get("/game", (_, res) => res.json(gamestate))

app.post("/move", (req, res) => {
  const { row, col } = req.body
  makeMove(row, col)
  res.json(gamestate)
})

// (1119) nice, i can hot load my server!
ViteExpress.listen(app, 3000, () => console.log("Server is listening..."))