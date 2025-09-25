import express from "express"
import ViteExpress from "vite-express"
import { checkWinner, initGameState } from "./tictactoe"

const app = express()
app.use(express.json())

// (1048) we're handling this in memory, make it mutable
// (1122) oh looks like we changed it back to const, haha
const gamestate = initGameState

// (1050) okay since it's in memory, we can be responsible
// for mutability here, the client don't care
const makeMove = (row: number, col: number): void => {
  if (gamestate.winner) { return }
  const boardCopy = gamestate.board
  const cell = 3 * row + col

  if (boardCopy[cell] != '') { return }
  boardCopy[cell] = gamestate.nowPlaying

  gamestate.nowPlaying = gamestate.nowPlaying === 'X' ? 'O' : 'X'
  // (1124) technically we'll always have a winner, so
  // we no longer need this check, this'll also make sure
  // our winner state keeps updating with every move
  // if (winner) { gamestate.winner = winner }
  gamestate.winner = checkWinner(boardCopy)
}

// (1017) we got an endpoint running.
// app.get("/", (_, res) => res.send("Hafa from Express-Vite!"))
app.get("/message", (_, res) => res.send("Hello worlde!"))

app.get("/data", (req, res) => {
  console.log(req)
  res.json({user: "data"})
})


// (1037) gosh add devdeps thru bun later, serve data first
// (1044) eh nice, got to it, just an add + -d flag
// (1112) oh wait i can just hit this endpoint to check if
// my game state is updated in-memory
// (1130) ohh haha how interesting, undefined doesn't show
// up in a json field, BUT null does. good to know...
app.get("/game", (_, res) => res.json(gamestate))

// (1039) we'll need to get the json body here, let's port
// our makeMove function then use the json middleware to
// handle this change.
// (1058) haha only three lines, nice, let's see if it works
// (1103) ehh curl not giving me enough info, let's just run
// in the browser and surface our initgamestate and changes
// (1108) ohh okay now that we bundled this together, 
// (1115) phew gotta remember how to format vscode reqs rq,
// (1121) nice we got our data to update in memory hell yea
// (1131) and now we made a null change to our data, we have
// our response surfacing our winner field, heck yea COMMIT
app.post("/move", (req, res) => {
  const { row, col } = req.body
  makeMove(row, col)
  res.json(gamestate)
})

// (1019) hmm so there's a wildcard set up here??
// (1030) ahh it wasn't showing up cuz my root endpoint
// was overwritten by what is now '/message' haha
// thanks jahnik for uncomplecting me, crossing wires
// not meant to be woven together...
ViteExpress.listen(app, 3000, () => console.log("Server is listening...", gamestate))