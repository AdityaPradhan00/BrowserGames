import React from 'react'
import MiniTicTacToe from './MiniTicTacToe';

function Tile({ ind, className, first, resetTrigger, setFirst, lastMiniTile, gameState, setGameState, setLastMiniTile, setTiles, value, onClick, playerTurn, onMiniGameWin, setPlayerTurn, tiles }) {

  let hoverClass = null;

 
  return (
    <>
    <div onClick={onClick} className={`tile ${className} ${hoverClass}`}>
    {value === null ? (
        <MiniTicTacToe 
          ind={ind}
          setPlayerTurn={setPlayerTurn} 
          playerTurn={playerTurn} 
          onMiniGameWin={onMiniGameWin} 
          setTiles={setTiles} 
          tiles={tiles}
          setGameState={setGameState}
          gameState={gameState}
          setLastMiniTile={setLastMiniTile}
          lastMiniTile={lastMiniTile}
          value={value}
          first={first} 
          setFirst={setFirst}
          resetTrigger={resetTrigger}
        />
      ) : (
        value
    )}
      </div>
    </>
  )
}

export default Tile