import React from 'react'


function MiniTile({ className, value,  onClick, onTouchStart , playerTurn }) {

  let hoverClass = null;

  if (value == null && playerTurn != null){
    hoverClass = `${playerTurn.toLowerCase()}-hovermini`
  }

  return (
    <>
    <div onClick={onClick} onTouchStart={onTouchStart} className={`mini-tile ${className} ${hoverClass}`}>{value}</div>
    </>
  )
}

export default MiniTile