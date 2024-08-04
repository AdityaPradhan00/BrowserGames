import React,{ useState, useEffect } from 'react'
import GameOver from './GameOver';
import GameState from './GameState';
import Reset from './Reset';
import gameOverSoundAsset from '../../sounds/gameOver.wav';
import clickSoundAsset from '../../sounds/click.wav';
import MiniBoard from './MiniBoard';

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




function MiniTicTacToe({playerTurn, setPlayerTurn, tiles, setGameState, onMiniGameWin, gameState, setLastMiniTile }) {
  const [miniTiles, setMiniTiles] = useState(Array(9).fill(null));
  const [strikeClass, setStrikeClass] = useState();
  const [subGameState, setSubGameState] = useState(GameState.inProgress)

  useEffect(() => {
    checkWinner(miniTiles, setStrikeClass, setGameState, tiles, onMiniGameWin);
  }, [miniTiles]);

  // useEffect(() => {
  //   if (tiles.some((tile) => tile !== null)){
  //     clickSound.play();
  //   }
  // }, [tiles]); 
  function checkWinner() {
    for (const { combo, strikeClass } of winningCombinations) {
      const tileValue1 = miniTiles[combo[0]];
      const tileValue2 = miniTiles[combo[1]];
      const tileValue3 = miniTiles[combo[2]];
      
      if (tileValue1 !== null && tileValue1 === tileValue2 && tileValue1 === tileValue3) {
        setStrikeClass(strikeClass);
        
        if (tileValue1 === PLAYER_X) {
          setSubGameState(GameState.playerXWins);          
          onMiniGameWin(PLAYER_X);  // Notify the parent about the win
        } else {
          setSubGameState(GameState.playerOWins);
          onMiniGameWin(PLAYER_O);  // Notify the parent about the win
        }
        return;
      }
    }
  
    const areAllTilesFilledIn = miniTiles.every((miniTile) => miniTile !== null);
    if (areAllTilesFilledIn) {
      setGameState(GameState.draw);
      onMiniGameWin(null); // Notify the parent about the draw
    }
  }
  
  
  useEffect(() => {
   if (gameState !== GameState.inProgress){
       gameOverSound.play();
     }
   }, [gameState]);

  const handleTileClick = (index) => {
    if (gameState !== GameState.inProgress) return;

    if (miniTiles[index] !== null) {
      return;
    }
    
    const newTiles = [...miniTiles];
    newTiles[index] = playerTurn;
    setLastMiniTile(index)
    setMiniTiles(newTiles);
    if (playerTurn === PLAYER_X) {
      setPlayerTurn(PLAYER_O);
    } else {
      setPlayerTurn(PLAYER_X);
    }
  }

  return (
        <MiniBoard miniTiles={miniTiles} strikeClass={strikeClass} playerTurn={playerTurn} onTileClick={handleTileClick} />
  )
}

export default MiniTicTacToe;