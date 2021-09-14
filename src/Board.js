import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board({ nrows=5, ncols=5, chanceLightStartsOn=0.5 }) {
  const [board, setBoard] = useState(createBoard());

  function createTile(prob) {
    const randNum = Math.random();
    return (randNum < prob) ? true : false;
  }

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    // TODO: create array-of-arrays of true/false values
    let initialBoard = [];
    for (let i=0; i<nrows; i++) {
      let row = [];
      for (let j=0; j<ncols; j++) {
        row.push(createTile(chanceLightStartsOn));
      }
      initialBoard.push(row);
    }

    return initialBoard;
  }

  function hasWon() {
    // TODO: check the board in state to determine whether the player has won.
    const boardArr = board.flat();
    return (boardArr.every( tile => tile === boardArr[0]));
  }

  function flipCellsAround(coord) {
    setBoard(oldBoard => {
      const [y, x] = coord.split("-").map(Number);

      const flipCell = (y, x, boardCopy) => {
        // if this coord is actually on board, flip it

        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
      };

      // TODO: Make a (deep) copy of the oldBoard

      let newBoard = [...oldBoard];

      // TODO: in the copy, flip this cell and the cells around it
      let coordUpdate = [
        {"y":y, "x": x},
        {"y":y+1, "x":x},
        {"y":y-1, "x":x},
        {"y":y, "x":x+1},
        {"y":y, "x":x-1}
      ]
      coordUpdate.forEach( ({y, x})=> {
        flipCell(y,x,newBoard);
      });

      // TODO: return the copy
      setBoard(newBoard);
    });
  }

  // if the game is won, just show a winning msg & render nothing else

  // TODO
  if (hasWon()) {
    return (
      <div>
        <h1>Congratulations, you have won!</h1>
      </div>
    )
  } else {
    return (
      <div>
        { board.forEach( (row) =>{
          return (
          <tr> 
            {
              row.forEach( (tile)=>{
                <td>
                  <Cell flipCellsAroundMe={flipCellsAround} isLit={tile} />
                </td>;
              })
            }
          </tr>
          )
        })}
      </div>
    )
  }

  // TODO
}

export default Board;
