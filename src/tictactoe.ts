type Player = 'X' | 'O'

export type GameState = {
  id: string
  nowPlaying: Player,
  winner: string | null
  board: string[],
}

// export const initGameState: GameState = {
//   id: undefined,
//   nowPlaying: 'X' as Player,
//   winner: null,
//   board: ['', '', '', '', '', '', '', '', '']
// }

export function createGameState() {
  return {
    id: generateId(),
    nowPlaying: 'X' as Player,
    winner: null,
    board: ['', '', '', '', '', '', '', '', '']
  }
}

export const makeMove = (cellIndex: number, gamestate: GameState): GameState => {
  if (gamestate.winner) { return gamestate }
  const newGame = structuredClone(gamestate)
  const boardCopy = newGame.board

  if (boardCopy[cellIndex] != '') { return newGame }
  boardCopy[cellIndex] = newGame.nowPlaying

  return {
    ...newGame,
    board: boardCopy,
    nowPlaying: newGame.nowPlaying === 'X' ? 'O' : 'X',
    winner: checkWinner(boardCopy)
  }
}

const generateId = (): string => {
  const id_number = Math.floor(Math.random() * 2048)
  console.log(id_number)
  return id_number.toString()
}

export const checkWinner = (currentBoard: string[]): string | null => {
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

  return null
}