import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [gridDimension, setGridDimension] = useState(16);
  const [mode, setMode] = useState("black");

  const gridArray = Array(gridDimension **2).fill(0);
  const dimensions = "1fr ".repeat(gridDimension);

  useEffect(() => {
    acitvateGrid();
  });

  useEffect(() => {}, [gridDimension]);

  const clearBoard = () => {
    const gridTiles = document.querySelectorAll(".tile");
    gridTiles.forEach((gridTiles)=> {
      gridTiles.className = "tile";
      gridTiles.style.backgroundColor = "";
    });
    setMode("black");
  };

  const checkNumber = (trigger) => {
    let newDimension;
    if (trigger) {
      newDimension= prompt("Input a number in 16-100 range")
    } else {
      newDimension = prompt();
    }
    let numNewDimension = Number(newDimension);
    if (
      numNewDimension > 15 && numNewDimension < 101 && Number.isInteger(numNewDimension)
    ) {
      setGridDimension(numNewDimension);
      clearBoard();
    } else {
      checkNumber(true)
    }
  };

  const resetBoard = () => {
    checkNumber();
  };

  const changeMode = (e) => {
    setMode(e.target.id);
  };

  const initiateTile = (e) => {
    switch (true) {
      case mode === "black":
        e.target.className = "tile black";
        e.target.style.backgroundColor = "";
        break;
      case mode === "random":
        e.target.style.backgroundColor = `rgb(${Math.random() * 255}, ${
          Math.random() * 255
        }, ${Math.random() * 255})`;
        break;
        default:
          return;
    }
  };

  const acitvateGrid = () => {
    const gridTiles = document.querySelectorAll(".tile");
    gridTiles.forEach((gridTile) => {
      gridTile.addEventListener("mouseover", initiateTile)
    });
  };

  return (
    <div className="container">
      <div className='game-window'>
        <div className='header'>
          <h1>Etch-A-Sketch</h1>
          <div className='header-buttons'>
            <button onClick={resetBoard} id="reset" className='header-button'>Reset Board</button>
            <button onClick={changeMode} id="black" className='header-button'>Black </button>
            <button onClick={changeMode} id="random" className='header-button'> Random Color</button>
            <button onClick={clearBoard} id="clear" className='header-button'>Clear Board</button>
          </div>
        </div>
        <div
        className='grid'
        style= {{gridTemplateColumns: dimensions,
        gridTemplateRows: dimensions}}>
          {gridArray.map((item, index) => (<div key={index} className="tile"></div>))}
        </div>
      </div>
    </div>
  );
}

export default App;
