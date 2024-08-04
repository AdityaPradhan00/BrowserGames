import React from 'react'
import Tile from './Tile'
import Strike from './Strike'

function SuperBoard({ nullMove, setGameState, setLastMiniTile, strikeClass, playerTurn, setPlayerTurn, gameState, tiles, setTiles, onMiniGameWin  }) {
  return (
    <div className='super-board'>
        <Tile playerTurn={playerTurn} nullMove={nullMove} setLastMiniTile={setLastMiniTile} setGameState={setGameState} setTiles={setTiles} gameState={gameState} setPlayerTurn={setPlayerTurn} tiles={tiles} onMiniGameWin={(winner) => onMiniGameWin(0, winner)} value={tiles[0]} className={'right-border bottom-border'}/>
        <Tile playerTurn={playerTurn} nullMove={nullMove} setLastMiniTile={setLastMiniTile} setGameState={setGameState} setTiles={setTiles} gameState={gameState} setPlayerTurn={setPlayerTurn} tiles={tiles} onMiniGameWin={(winner) => onMiniGameWin(1, winner)} value={tiles[1]} className={'right-border bottom-border'}/>
        <Tile playerTurn={playerTurn} nullMove={nullMove} setLastMiniTile={setLastMiniTile} setGameState={setGameState} setTiles={setTiles} gameState={gameState} setPlayerTurn={setPlayerTurn} tiles={tiles} onMiniGameWin={(winner) => onMiniGameWin(2, winner)} value={tiles[2]} className={'bottom-border'}/>
        <Tile playerTurn={playerTurn} nullMove={nullMove} setLastMiniTile={setLastMiniTile} setGameState={setGameState} setTiles={setTiles} gameState={gameState} setPlayerTurn={setPlayerTurn} tiles={tiles} onMiniGameWin={(winner) => onMiniGameWin(3, winner)} value={tiles[3]} className={'right-border bottom-border'}/>
        <Tile playerTurn={playerTurn} nullMove={nullMove} setLastMiniTile={setLastMiniTile} setGameState={setGameState} setTiles={setTiles} gameState={gameState} setPlayerTurn={setPlayerTurn} tiles={tiles} onMiniGameWin={(winner) => onMiniGameWin(4, winner)} value={tiles[4]} className={'right-border bottom-border'}/>
        <Tile playerTurn={playerTurn} nullMove={nullMove} setLastMiniTile={setLastMiniTile} setGameState={setGameState} setTiles={setTiles} gameState={gameState} setPlayerTurn={setPlayerTurn} tiles={tiles} onMiniGameWin={(winner) => onMiniGameWin(5, winner)} value={tiles[5]} className={'bottom-border'}/>
        <Tile playerTurn={playerTurn} nullMove={nullMove} setLastMiniTile={setLastMiniTile} setGameState={setGameState} setTiles={setTiles} gameState={gameState} setPlayerTurn={setPlayerTurn} tiles={tiles} onMiniGameWin={(winner) => onMiniGameWin(6, winner)} value={tiles[6]} className={'right-border'}/>
        <Tile playerTurn={playerTurn} nullMove={nullMove} setLastMiniTile={setLastMiniTile} setGameState={setGameState} setTiles={setTiles} gameState={gameState} setPlayerTurn={setPlayerTurn} tiles={tiles} onMiniGameWin={(winner) => onMiniGameWin(7, winner)} value={tiles[7]} className={'right-border'}/>
        <Tile playerTurn={playerTurn} nullMove={nullMove} setLastMiniTile={setLastMiniTile} setGameState={setGameState} setTiles={setTiles} gameState={gameState} setPlayerTurn={setPlayerTurn} tiles={tiles} onMiniGameWin={(winner) => onMiniGameWin(8, winner)} value={tiles[8]} />
        <Strike strikeClass={strikeClass}/>
    </div>
  )
}

export default SuperBoard;