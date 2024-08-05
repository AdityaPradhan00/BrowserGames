import React from 'react'
import MiniTile from './MiniTile'

function MiniBoard({miniTiles, onTileClick, playerTurn}) {
  return (
    <div className='mini-board'>
        <MiniTile playerTurn={playerTurn} onClick={() => onTileClick(0)} value={miniTiles[0]} className={'mini-right-border mini-bottom-border'}/>
        <MiniTile playerTurn={playerTurn} onClick={() => onTileClick(1)} value={miniTiles[1]} className={'mini-right-border mini-bottom-border'}/>
        <MiniTile playerTurn={playerTurn} onClick={() => onTileClick(2)} value={miniTiles[2]} className={'mini-bottom-border'}/>
        <MiniTile playerTurn={playerTurn} onClick={() => onTileClick(3)} value={miniTiles[3]} className={'mini-right-border mini-bottom-border'}/>
        <MiniTile playerTurn={playerTurn} onClick={() => onTileClick(4)} value={miniTiles[4]} className={'mini-right-border mini-bottom-border'}/>
        <MiniTile playerTurn={playerTurn} onClick={() => onTileClick(5)} value={miniTiles[5]} className={'mini-bottom-border'}/>
        <MiniTile playerTurn={playerTurn} onClick={() => onTileClick(6)} value={miniTiles[6]} className={'mini-right-border'}/>
        <MiniTile playerTurn={playerTurn} onClick={() => onTileClick(7)} value={miniTiles[7]} className={'mini-right-border'}/>
        <MiniTile playerTurn={playerTurn} onClick={() => onTileClick(8)} value={miniTiles[8]} />
    </div>
  )
}

export default MiniBoard;