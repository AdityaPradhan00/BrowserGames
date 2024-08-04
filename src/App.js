import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Games from './components/Games/Games';
import SuperTicTacToe from './components/SuperTicTacToe/SuperTicTacToe';
import TicTacToe from './components/TicTacToe/TicTacToe';

function App() {
  return (
    <Router >
    <Routes>
      <Route path="/" element={<Games />} />
      <Route path="/super-tic-tac-toe" element={<SuperTicTacToe />} />  
      <Route path="/tic-tac-toe" element={<TicTacToe />} />  
    </Routes>
    </Router>
  );
}

export default App;
