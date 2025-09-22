export type GameState = {
  nowPlaying: string,
  winner: string | undefined
  board: string[],
}

export const initGameState = {
  nowPlaying: 'X',
  winner: undefined,
  board: ['', '', '', '', '', '', '', '', '']
}

// (1710) seems straightforward: start with win detect (done @ 1713)
// then, cell occupy detect (DONE @ 1715)
export const makeMove = (gamestate: GameState, row: number, col: number): GameState => {
  if (gamestate.winner) { return gamestate }
  const boardCopy = gamestate.board
  const cell = 3 * row + col

  if (boardCopy[cell] != '') { return gamestate }
  boardCopy[cell] = gamestate.nowPlaying

  const newPlayer = gamestate.nowPlaying === 'X' ? 'O' : 'X'

  const winner = checkWinner(boardCopy)
  
  const newGameState = {
    nowPlaying: newPlayer,
    winner: winner,
    board: boardCopy
  }

  return newGameState
}

export const checkWinner = (currentBoard: string[]): string | undefined => {
  const winStates = [
    [0, 1, 2], 
    [3, 4, 5], 
    [6, 7, 8], 
    [0, 3, 6], 
    [1, 4, 7], 
    [2, 5, 8], 
    [0, 4, 8], 
    [2, 4, 6]
  ]

  for (let i = 0; i < winStates.length; i++) {
    const win = winStates[i]
    if (currentBoard[win[0]] || currentBoard[win[1]] || currentBoard[win[2]]) {
      if (currentBoard[win[0]] === currentBoard[win[1]]) {
        if (currentBoard[win[1]] === currentBoard[win[2]]) {
          return currentBoard[win[0]]
        }
      }
    }
  }

  return undefined
}