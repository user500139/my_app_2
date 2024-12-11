import React, { useState, useEffect } from 'react';
import './App.css';

// 添加这些常量定义
const GRID_SIZE = 6;
const ITEM_TYPES = 5;

function App() {
  const [grid, setGrid] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [score, setScore] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      initializeGrid();
    } catch (err) {
      console.error('Error initializing grid:', err);
      setError('Failed to initialize game grid. Please refresh the page.');
    }
  }, []);

  const initializeGrid = () => {
    const newGrid = Array(GRID_SIZE).fill().map(() => 
      Array(GRID_SIZE).fill().map(() => Math.floor(Math.random() * ITEM_TYPES) + 1)
    );
    setGrid(newGrid);
  };

  const handleItemClick = (row, col) => {
    const newSelectedItems = [...selectedItems, { row, col }];
    setSelectedItems(newSelectedItems);

    if (newSelectedItems.length === 3) {
      if (checkMatch(newSelectedItems)) {
        removeItems(newSelectedItems);
        setScore(score + 30);
      }
      setSelectedItems([]);
    }
  };

  const checkMatch = (items) => {
    const [item1, item2, item3] = items;
    return grid[item1.row][item1.col] === grid[item2.row][item2.col] &&
           grid[item2.row][item2.col] === grid[item3.row][item3.col];
  };

  const removeItems = (items) => {
    const newGrid = [...grid];
    items.forEach(item => {
      newGrid[item.row][item.col] = Math.floor(Math.random() * ITEM_TYPES) + 1;
    });
    setGrid(newGrid);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>三消游戏</h1>
        {error ? (
          <p className="error-message">{error}</p>
        ) : (
          <>
            <p>得分: {score}</p>
            <div className="game-grid">
              {grid.map((row, rowIndex) => (
                <div key={rowIndex} className="grid-row">
                  {row.map((item, colIndex) => (
                    <img
                      key={`${rowIndex}-${colIndex}`}
                      src={`/${item}.png`}
                      alt={`Item ${item}`}
                      className={`grid-item ${selectedItems.some(i => i.row === rowIndex && i.col === colIndex) ? 'selected' : ''}`}
                      onClick={() => handleItemClick(rowIndex, colIndex)}
                    />
                  ))}
                </div>
              ))}
            </div>
            <div className="controls">
              <button onClick={initializeGrid}>重新开始</button>
            </div>
          </>
        )}
      </header>
    </div>
  );
}

export default App;
