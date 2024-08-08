import React,{ useState, useEffect } from 'react'
import GameOver from './GameOver';
import GameState from './GameState';
import Reset from './Reset';
import gameOverSoundAsset from '../../sounds/gameOver.wav';
import clickSoundAsset from '../../sounds/click.wav';
import MiniBoard from './MiniBoard';
import { useParams, useNavigate } from 'react-router-dom';
const gameOverSound = new Audio(gameOverSoundAsset);
gameOverSound.volume = 0.2;
const clickSound = new Audio(clickSoundAsset);
clickSound.volume = 0.5;

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




function MiniTicTacToe({ socket, playerTurn, first, resetTrigger, setFirst, ind, setPlayerTurn, tiles, setLastMiniTile, lastMiniTile, setGameState, onMiniGameWin, gameState }) {
  const [miniTiles, setMiniTiles] = useState(Array(9).fill(null));
  const [strikeClass, setStrikeClass] = useState();
  const [subGameState, setSubGameState] = useState(GameState.inProgress)
  const { roomID } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (resetTrigger) {
      setMiniTiles(Array(9).fill(null));
    }
  }, [resetTrigger])
  
  useEffect(() => {
    if(socket)
      {
        socket.on('SupermadeMove', (index, newTiles, playerTurn, newInd ) => {
          
          if(ind === newInd)
            {setLastMiniTile(index)    
          setMiniTiles(newTiles);
          console.log(index, newTiles, newInd)
          setPlayerTurn(playerTurn);}
    });
   } else {
    navigate('/');
   }
    
  }, [socket]);


  useEffect(() => {
    checkWinner(miniTiles, setStrikeClass, setGameState, tiles, onMiniGameWin);
  }, [miniTiles]);

  // useEffect(() => {
  //    if (miniTiles.some((tile) => tile !== null)){
  //      clickSound.play();
  //    }
  //  }, [miniTiles]); 
  // useEffect(() => {
  //   if (gameState !== GameState.inProgress){
  //       gameOverSound.play();
  //     }
  //   }, [gameState]);
  function checkWinner() {
    for (const { combo, strikeClass } of winningCombinations) {
      const tileValue1 = miniTiles[combo[0]];
      const tileValue2 = miniTiles[combo[1]];
      const tileValue3 = miniTiles[combo[2]];
      
      if (tileValue1 !== null && tileValue1 === tileValue2 && tileValue1 === tileValue3) {
        setStrikeClass(strikeClass);
        
        if (tileValue1 === PLAYER_X) {
          setSubGameState(GameState.playerXWins);          
          onMiniGameWin(PLAYER_X);
        } else {
          setSubGameState(GameState.playerOWins);
          onMiniGameWin(PLAYER_O);
        }
        return;
      }
    }
  
    const areAllTilesFilledIn = miniTiles.every((miniTile) => miniTile !== null);
    if (areAllTilesFilledIn) {
      setSubGameState(GameState.draw);
      onMiniGameWin('Draw');
    }
  }


  const handleTileClick = async (index) => {

    if (gameState !== GameState.inProgress) return;
    if (miniTiles[index] !== null) {
      return;
    }
    if (!first) {
      setFirst(true);
      Move();
      return;
    }
    const hasX = tiles.includes('X');
    const hasO = tiles.includes('O');
    const hasDraw = tiles.includes('Draw');
    if (hasX || hasO || hasDraw) {
      const completedMiniGameIndices = tiles
      .map((tile, idx) => (tile === 'X' || tile === 'O' || tile === 'Draw') ? idx : null)
      .filter(index => index !== null);
      completedMiniGameIndices.forEach((completed) => {
        if (completed === lastMiniTile) {Move()}
      }); 
    }
    if (ind !== lastMiniTile){
       return;
    }
    


    async function Move() {
      const newTiles = [...miniTiles];
      newTiles[index] = playerTurn;
      const turnID = socket.id;
      const newInd = ind;
      await socket.emit('SupermakeMove', ({roomID, index, newTiles, playerTurn, turnID, newInd}));
  }
  Move()     

}


  return (<>
  <MiniBoard miniTiles={miniTiles} strikeClass={strikeClass} playerTurn={playerTurn} onTileClick={handleTileClick} />
  </>
  )
}

export default MiniTicTacToe;