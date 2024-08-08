import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Games from './components/Games/Games';
import SuperTicTacToe from './components/SuperTicTacToe/SuperTicTacToe';
import TicTacToe from './components/TicTacToe/TicTacToe';
import TicTacToeMultiplayer from './components/TicTacToeMultiplayer/TicTacToeMultiplayer';
import { useState } from 'react';
import SuperTicTacToeMultiplayer from './components/SuperTicTacToeMultiplayer/SuperTicTacToeMultiplayer';

function App() {
  const [socket, setSocket] = useState('')

  return (
    <Router >
    <Routes>
      <Route path="/" element={<Games socket={socket} setSocket={setSocket}/>} />
      <Route path="/super-tic-tac-toe" element={<SuperTicTacToe />} />  
      <Route path="/tic-tac-toe" element={<TicTacToe />} />  
      <Route path="/tic-tac-toe-multiplayer/:roomID" element={<TicTacToeMultiplayer socket={socket} />} />  
      <Route path="/super-tic-tac-toe-multiplayer/:roomID" element={<SuperTicTacToeMultiplayer socket={socket} />} />  
    </Routes>
    </Router>
  );
}

export default App;
