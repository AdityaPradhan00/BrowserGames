import React from 'react'


function MiniTile({ className, value, onClick, playerTurn }) {

  let hoverClass = null;

  if (value == null && playerTurn != null){
    hoverClass = `${playerTurn.toLowerCase()}-hovermini`
  }

  return (
    <>
    <div onClick={onClick} className={`mini-tile ${className} ${hoverClass}`}>{value}</div>
    </>
  )
}

export default MiniTile