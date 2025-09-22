type Player = 'X' | 'O'

// (1553) temp setting nowPlaying to larger type set
export type GameState = {
  nowPlaying: string,
  winner: Player | undefined
  board: string[][],
}

// (1455) we can move this to gamestate
// (1509) ah screw it just make the app
export const initGameState = {
  nowPlaying: 'X',
  winner: undefined,
  board: [['', '', ''], ['', '', ''], ['', '', '']]
}

export const makeMove = (gamestate: GameState, row: number, col: number): GameState => {
  // (1520) make the move
  const boardCopy = gamestate.board
  boardCopy[row][col] = gamestate.nowPlaying
  console.log('updating board to:', boardCopy)

  // (1522) switch the player
  // (1537) abstracting player to new fn
  const newPlayer = gamestate.nowPlaying === 'X' ? 'O' : 'X'
  console.log('setting player to', newPlayer)
  
  // (1537) creating separate object
  const newGameState = {
    nowPlaying: newPlayer,
    winner: gamestate.winner,
    board: boardCopy
  }

  // (1538) to then be returned
  // (1541) now we have a nowPlaying type error
  return newGameState
}

