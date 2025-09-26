export function CreateGameButton() {
  
  const handleClick = () => {
    console.log('making a new game')
  }
  
  return (
    <button onClick={handleClick}>
      Create New Game
    </button>
  )
}