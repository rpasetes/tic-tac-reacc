// import { useState } from 'react'
import './App.css'
// import { makeMove } from './tictactoe'
// import { type GameState, initGameState } from './tictactoe'
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query'
import axios from 'axios'

// (1149) GOAL: fetch premade server state with useQuery
// (1153) SIDEQUEST: make readable react components
// (1203) something shifting, going to lunch...
// (1424) lmao i can just use axios, we here baby, thx anansi
// (1427) and thx for the checkin paris, progress is progress.
// (1503) ahh we still need to set a QueryClient Provider!
// this is why we always keep the console open, no matter wut
// (1522) remember to keep old code around while making new
// replacements on the side. now to unblock myself sidequesting,

// type CellType = {
//   row: number
//   col: number
//   board: string[]
// }

// (1534) okay omg so i have a new cell adapted from my old
// cell logic, but now instead of replacing each row of my
// old board with my cell component, just keep building up
// until it's replaced, rather than meeting in the middle and
// getting confused...
// function Cell({ row, col, board }: CellType) {
//   const cell = 3 * row + col
  
//   // (1532) will eventually add mutation.mutate() here
//   const handleClick = () => {
//     console.log(`cell ${cell} clicked`)
//   }
  
//   return (
//     <td onClick={handleClick}>{board[cell]}</td>
//   )
// }

// (1540) oh gosh now i have to think about mapping over
// the indices... i'm writing too much dang code and not
// actually solving my problem, which is getting my server
// board to display... okay, i'mma just replace all the
// onClicks, or even just comment them out
// function Row({ row, col, board }: CellType) {
//   return (
//     <tr>
      
//     </tr>
//   )
// }

// (1837) getting this from an old commit, pass the board in
function OldBoard({ board, winner }) {
  return (
    <div>
      <table className='grid'>
        <tbody>
          <tr>
            <td>{board[0]}</td>
            <td>{board[1]}</td>
            <td>{board[2]}</td>
          </tr>
          <tr>
            <td>{board[3]}</td>
            <td>{board[4]}</td>
            <td>{board[5]}</td>
          </tr>
          <tr>
            <td>{board[6]}</td>
            <td>{board[7]}</td>
            <td>{board[8]}</td>
          </tr>
        </tbody>
      </table>
      {winner 
      ? <h1>{winner} WINS!</h1>
      : <></>}
    </div>
  )
}

// (1546) okay i got my server state to render but commenting
// out my useState hook got me to ... (1552) get a typeError
// and having my state show up as undefined.
function Game() {
  // const [gameState, setGameState] = useState<GameState>(initGameState)
  
  const gameStateQuery = useQuery({ 
    queryKey: ['game'],
    queryFn: async () => {
      const response = await axios.get('http://localhost:3000/game')
      return response.data
    }
  })

  // (1521) good gosh finally dissected server state from useQuery,
  // (1644) okay console.logs are working, stepping back and getting
  // small is doing okay,
  // console.log(gameStateQuery.data)

  // (1827) okay the server board is showing up,
  // now to pass it as a prop.
  return (
    <>
      <OldBoard 
        board={gameStateQuery.data?.board}
        winner={gameStateQuery.data?.winner}
      />
      {/* <table className='grid'>
        <tbody>
          <tr>
            <td>{board[0]}</td>
            <td>{board[1]}</td>
            <td>{board[2]}</td>
          </tr>
          <tr>
            <td>{board[3]}</td>
            <td>{board[4]}</td>
            <td>{board[5]}</td>
          </tr>
          <tr>
            <td>{board[6]}</td>
            <td>{board[7]}</td>
            <td>{board[8]}</td>
          </tr>
        </tbody>
      </table> */}
      {/* {gameState.winner 
      ? <h1>{gameState.winner} WINS!</h1>
      : <></>} */}
    </>
  )
}

// (1508) aight wish me luck tanstack quick start
const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Game />
    </QueryClientProvider>
  )
}

export default App
