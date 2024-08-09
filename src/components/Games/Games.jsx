import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import SuperTicTacToe from '../SuperTicTacToe/SuperTicTacToe';
import Room from '../Room/Room';
import io from 'socket.io-client';



function Games({socket, setSocket}) {
    const navigate = useNavigate();
    const [options, setOptions] = useState(false);
    const [options1, setOptions1] = useState(false);

    const handleMulti = async (currentMode) => {
      if (socket) {
          socket.disconnect();
          setSocket(null);
      }
  
      const newSocket = io('https://browsergamesserver.onrender.com/'); 
      setSocket(newSocket);
      if (currentMode === 'TicTacToe') {
          setOptions1(false);
      } else if (currentMode === 'SuperTicTacToe') {
          setOptions(false);
      }
  };
  return (
    <div className='game-btn-div'>
      <h1>Games</h1>
        <button  className='game-btn' onClick={() => navigate('/tic-tac-toe')}>
            TicTacToe
        </button>
        <button className='game-btn' onClick={() => navigate('/super-tic-tac-toe')}>
            Super TicTacToe
        </button>
        <button className='game-btn' onClick={() => {setOptions(!options); handleMulti('TicTacToe');}}>
            Multiplayer TicTacToe
        </button>
        {options && <Room socket={socket} game={'Tic'}/>}
        <button className='game-btn' onClick={() => {setOptions1(!options1); handleMulti('SuperTicTacToe');}}>
            Multiplayer Super TicTacToe
        </button>
        {options1 && <Room socket={socket} game={'Super'}/>}
    </div>
  )
}

export default Games;