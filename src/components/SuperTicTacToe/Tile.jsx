import React from 'react'
import MiniTicTacToe from './MiniTicTacToe';

function Tile({ className, gameState, nullMove, setGameState, setLastMiniTile, setTiles, value, onClick, playerTurn, onMiniGameWin, setPlayerTurn, tiles }) {

  let hoverClass = null;

 
  return (
    <>
    <div onClick={onClick} className={`tile ${className} ${hoverClass} ${nullMove}`}>
    {value === null ? (
        <MiniTicTacToe 
          setPlayerTurn={setPlayerTurn} 
          playerTurn={playerTurn} 
          onMiniGameWin={onMiniGameWin} 
          setTiles={setTiles} 
          tiles={tiles}
          setGameState={setGameState}
          gameState={gameState}
          setLastMiniTile={setLastMiniTile}
        />
      ) : (
        value
    )}
      </div>
    </>
  )
}

export default Tile