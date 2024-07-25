// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import './TicTacToe.css';
import axios from 'axios';
import o_icon from '../Assets/o_icon.png'
import x_icon from '../Assets/x_icon.png'


const TicTacToe = () => {
  const [size, setSize] = useState(3);
  const [board, setBoard] = useState(Array(size).fill().map(() => Array(size).fill('')));
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [winner, setWinner] = useState(null);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    if (winner) {
      alert(`${winner} wins!`);
      saveGame();
    } else if (board.flat().every(cell => cell !== '')) {
      alert('It\'s a draw!');
      saveGame();
    }
  }, [winner, board]);

  useEffect(() => {
    setBoard(Array(size).fill().map(() => Array(size).fill('')));
    setWinner(null);
    setCurrentPlayer('X');
  }, [size]);

  useEffect(() => {
    fetchHistory();
  }, []);

//Action when click
  const handleCellClick = (row, col) => {
    if (board[row][col] === '' && !winner) {
      const newBoard = board.map(row => row.slice());
      newBoard[row][col] = currentPlayer;
      setBoard(newBoard);
      setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
      if (checkWin(newBoard, currentPlayer)) {
        setWinner(currentPlayer);
      }
    }
  };

  //Game reset function
  const resetBoard = () => {
    setBoard(Array(size).fill().map(() => Array(size).fill('')));
    setCurrentPlayer('X');
    setWinner(null);
  };

  //Board size change function
  const handleSizeChange = (e) => {
    const newSize = parseInt(e.target.value);
    setSize(newSize);
    setBoard(Array(newSize).fill().map(() => Array(newSize).fill('')));
    setCurrentPlayer('X');
    setWinner(null);
  };

  // checkWin function 
  const checkWin = (board, player) => {
    const size = board.length;

    // Check rows
    for (let row = 0; row < size; row++) {
      if (board[row].every(cell => cell === player)) {
        return true;
      }
    }

    // Check columns
    for (let col = 0; col < size; col++) {
      if (board.every(row => row[col] === player)) {
        return true;
      }
    }

    // Check main diagonal
    if (board.every((row, index) => row[index] === player)) {
      return true;
    }

    // Check anti-diagonal
    if (board.every((row, index) => row[size - 1 - index] === player)) {
      return true;
    }

    return false;
  };

  //Game save function
  const saveGame = async () => {
    const gameData = {
      board,
      currentPlayer,
      winner,
    };

    try {
      await axios.post('http://localhost:3001/api/save', gameData); // send game data to DB
    } catch (error) {
      console.error('Error saving game:', error); // Error when cant save or not found the DB
    }
  };

  const fetchHistory = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/history'); // Pull the data from DB to show history board
      setHistory(response.data);
    } catch (error) {
      console.error('Error fetching history:', error);
    }
  };

  return (
    <div className='container'>
      <h1 className='title'>Game <span>Tic Tac Toe</span></h1>
      <label>
        Board Size: 
        <input className='input' type="number" value={size} onChange={handleSizeChange} min="3" max="10" />
      </label>
      <div className='board'>
        {board.map((row, rowIndex) => (
          <div key={rowIndex} className='row'>
            {row.map((cell, colIndex) => (
              <div
                key={colIndex}
                className='boxes'
                onClick={() => handleCellClick(rowIndex, colIndex)}
              >
                {cell === 'X' && <img src={x_icon} alt='X' className='icon' />}
                {cell === 'O' && <img src={o_icon} alt='O' className='icon' />}
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className='reset-container'>
        <button className='reset' onClick={resetBoard}>Reset</button>
      </div>
      <div className='history'>
        <h2>Game History</h2>
        {history.length === 0 ? (
          <p>No games history</p>
        ) : (
          history.map((game, index) => (
            <div key={index} className='history-item'>
              <p>Game {index + 1}:</p>
              <p>Date: {new Date(game.date).toLocaleString()}</p>
              <p>Winner: {game.winner}</p>
              <p>Board:</p>
              <div className='board'>
                {game.board.map((row, rowIndex) => (
                  <div key={rowIndex} className='row'>
                    {row.map((cell, colIndex) => (
                      <div key={colIndex} className='boxes'>
                        {cell === 'X' && <img src={x_icon} alt='X' className='icon' />}
                        {cell === 'O' && <img src={o_icon} alt='O' className='icon' />}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TicTacToe;
