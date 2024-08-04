import React from 'react'
import { useNavigate } from 'react-router-dom';
import SuperTicTacToe from '../SuperTicTacToe/SuperTicTacToe';

function Games() {
    const navigate = useNavigate();
  return (
    <div className='game-btn-div'>
      <h1>Games</h1>
        <button  className='game-btn' onClick={() => navigate('/tic-tac-toe')}>
            TicTacToe
        </button>
        <button className='game-btn' onClick={() => navigate('/super-tic-tac-toe')}>
            Super TicTacToe
        </button>
    </div>
  )
}

export default Games;