import React, { useEffect, useState } from 'react'
import SuperBoard from './SuperBoard';
import './supertictactoe.css';
import GameState from './GameState';
import GameOver from './GameOver';
import Reset from './Reset';
import { useNavigate, useParams } from 'react-router-dom';

const PLAYER_X = 'X';
const PLAYER_O = 'O';

const winningCombinations = [

  //ROWS
  {combo: [0, 1, 2], strikeClass:'strike-row-1'},
  {combo: [3, 4, 5], strikeClass:'strike-row-2'},
  {combo: [6, 7, 8], strikeClass:'strike-row-3'},
  
  //COLUMNS
  {combo: [0, 3, 6], strikeClass:'strike-column-1'},
  {combo: [1, 4, 7], strikeClass:'strike-column-2'},
  {combo: [2, 5, 8], strikeClass:'strike-column-3'},
  
  //DIAGONOL
  {combo: [0, 4, 8], strikeClass:'strike-diagonal-1'},
  {combo: [2, 4, 6], strikeClass:'strike-diagonal-2'},

]


function checkWinner(tiles, setStrikeClass, setGameState) {
  for (const { combo, strikeClass } of winningCombinations){
    const tileValue1 = tiles[combo[0]];
    const tileValue2 = tiles[combo[1]];
    const tileValue3 = tiles[combo[2]];
   
    if ( tileValue1 !== null && tileValue1 === tileValue2 && tileValue1 === tileValue3) {
      if (tileValue1 === "Draw") {
        console.log("Draw")
        setGameState(GameState.draw);
        setStrikeClass(strikeClass);
        
      } else if (tileValue1 === PLAYER_X) {
        console.log("X")
        setGameState(GameState.playerXWins);
        setStrikeClass(strikeClass);
        
      } else if(tileValue1 === PLAYER_O){
        console.log("0")
        setGameState(GameState.playerOWins);
        setStrikeClass(strikeClass);
      }
      return;
    }
  }

  const areAllTilesFilledIn = tiles.every((tile) => tile != null);
  if (areAllTilesFilledIn) {
    console.log("Draw")

    setGameState(GameState.draw);
  }
}
function SuperTicTacToeMultiplayer({ socket }) {
  useEffect(() => {
    document.title = "Super TicTacToe";
  }, []);
  const [playerTurn, setPlayerTurn] = useState(PLAYER_X);
  const [tiles, setTiles] = useState(Array(9).fill(null));
  const [strikeClass, setStrikeClass] = useState();
  const [gameState, setGameState] = useState(GameState.inProgress);
  const [lastMiniTile, setLastMiniTile] = useState();
  const [first, setFirst] = useState(false);
  const [resetTrigger, setResetTrigger] = useState(false);
  const [player, setPlayer] = useState('');
  const [left, setLeft] = useState(false);

  const { roomID } = useParams();
  const navigate = useNavigate();
  const handleMiniGameWin = (miniIndex, winner) => {
    if (tiles[miniIndex] !== null || gameState !== GameState.inProgress) return;
    const newTiles = [...tiles];
    newTiles[miniIndex] = winner;
    setTiles(newTiles);
    checkWinner(newTiles, setStrikeClass, setGameState);
  };
  
  useEffect(() => {
    if(socket){
      socket.on('Superleft', () => {
        setLeft(true)
      })    
    } else {
      navigate('/');
    }

  })
  useEffect( () => {
    if(socket)
      {
        const turnID = socket.id;
        console.log('ss')
        socket.emit('playerAssignment', ({roomID, turnID}))
        socket.on('Player', (Player) => {
        setPlayer(Player)
        })
     } else {
      navigate('/');
     }
  }, [socket])

  const handleReset = async () => {
    setGameState(GameState.inProgress);
    setTiles(Array(9).fill(null));
    setStrikeClass(null);
    await  setResetTrigger(true);
    setFirst(false);    
    setResetTrigger(false);

  }


  return (
    <div>
      <h1>Super TicTacToe</h1>
      {player && (<h3>You are Player {player}</h3>)}
      <SuperBoard setPlayer={setPlayer} resetTrigger={resetTrigger} socket={socket} first={first} setFirst={setFirst} lastMiniTile={lastMiniTile} setLastMiniTile={setLastMiniTile} gameState={gameState} setGameState={setGameState} strikeClass={strikeClass} onMiniGameWin={handleMiniGameWin} tiles={tiles} setTiles={setTiles} setPlayerTurn={setPlayerTurn} playerTurn={playerTurn} />
      <GameOver gameState={gameState} />
      <Reset gameState={gameState} onReset={handleReset} />  
      {left && (<h3>Your Opponent has left the match!</h3>)}
    </div>
  )
}

export default SuperTicTacToeMultiplayer;