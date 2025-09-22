// type Player = 'X' | 'O'

// (1617) changing board to be single array for winner logic
// (1650) for simplicity sake, let's just not use type Player
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

// (1618) changing board means updating write logic
// (1656) cool, now my move logic seems funky
// (1659) the board's not updating...
// (1700) LMAO changing board means updating frontend indexing
export const makeMove = (gamestate: GameState, row: number, col: number): GameState => {
  const boardCopy = gamestate.board
  const cell = 3 * row + col
  console.log('now clicking cell', cell)
  boardCopy[cell] = gamestate.nowPlaying
  console.log('making new board:', boardCopy)

  const newPlayer = gamestate.nowPlaying === 'X' ? 'O' : 'X'

  const winner = checkWinner(boardCopy)
  
  const newGameState = {
    nowPlaying: newPlayer,
    winner: winner,
    board: boardCopy
  }

  return newGameState
}

// (1622) let's be dumb and make a list of 3x3 win states
// (1635) lmao set the function you're exporting with '='
// (1640) took a breather to block out game logic / graphics
// time to add console logs for debugging
// (1653) oh i have to check that our grids are filled with a winner
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

  // console.log('now checking for wins on board:', currentBoard)
  for (let i = 0; i < winStates.length; i++) {
    const win = winStates[i]
    // console.log('now checking win:', win)
    if (currentBoard[win[0]] || currentBoard[win[1]] || currentBoard[win[2]]) {
      if (currentBoard[win[0]] === currentBoard[win[1]]) {
        if (currentBoard[win[1]] === currentBoard[win[2]]) {
          console.log('detecting a win!')
          return currentBoard[win[0]]
        }
      }
    }
  }

  console.log('no wins, keep playing...')
  return undefined
}