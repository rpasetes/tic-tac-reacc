// (1753) okay got a nice async function
export async function getGame(id: number) {
  try {
    const response = await fetch(`/game/${id}`)
    if (!response.ok) throw new Error('cannot get game')
    return await response.json
  } catch (error) {
    console.error(error)
    throw error
  }
}

export async function getAllGames() {
  try {
    const response = await fetch(`/games`)
    if (!response.ok) throw new Error('games not loaded')
    return await response.json
  } catch (error) {
    console.error(error)
    throw error
  }
}

// async function makeMove(row: number, col: number, gamestate: gamestate) {
//   try {
    
//   }
// }

