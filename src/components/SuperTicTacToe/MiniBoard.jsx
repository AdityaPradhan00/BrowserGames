import React from 'react'
import MiniTile from './MiniTile'

function MiniBoard({miniTiles, onTileClick, playerTurn,}) {
  
  const handleTileInteraction = (index) => (event) => {
    event.preventDefault(); // Prevent default touch behavior
    onTileClick(index); // Call the click handler with the tile index
  };

  return (
    <div className='mini-board'>
        <MiniTile playerTurn={playerTurn} onClick={handleTileInteraction(0)} onTouchStart={handleTileInteraction(0)} value={miniTiles[0]} className={'mini-right-border mini-bottom-border'}/>
        <MiniTile playerTurn={playerTurn} onClick={handleTileInteraction(1)} onTouchStart={handleTileInteraction(1)} value={miniTiles[1]} className={'mini-right-border mini-bottom-border'}/>
        <MiniTile playerTurn={playerTurn} onClick={handleTileInteraction(2)} onTouchStart={handleTileInteraction(2)} value={miniTiles[2]} className={'mini-bottom-border'}/>
        <MiniTile playerTurn={playerTurn} onClick={handleTileInteraction(3)} onTouchStart={handleTileInteraction(3)} value={miniTiles[3]} className={'mini-right-border mini-bottom-border'}/>
        <MiniTile playerTurn={playerTurn} onClick={handleTileInteraction(4)} onTouchStart={handleTileInteraction(4)} value={miniTiles[4]} className={'mini-right-border mini-bottom-border'}/>
        <MiniTile playerTurn={playerTurn} onClick={handleTileInteraction(5)} onTouchStart={handleTileInteraction(5)} value={miniTiles[5]} className={'mini-bottom-border'}/>
        <MiniTile playerTurn={playerTurn} onClick={handleTileInteraction(6)} onTouchStart={handleTileInteraction(6)} value={miniTiles[6]} className={'mini-right-border'}/>
        <MiniTile playerTurn={playerTurn} onClick={handleTileInteraction(7)} onTouchStart={handleTileInteraction(7)} value={miniTiles[7]} className={'mini-right-border'}/>
        <MiniTile playerTurn={playerTurn} onClick={handleTileInteraction(8)} onTouchStart={handleTileInteraction(8)} value={miniTiles[8]} />
    </div>
  )
}

export default MiniBoard;