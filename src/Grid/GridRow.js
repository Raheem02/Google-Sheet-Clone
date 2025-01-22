import React from "react";
import "./GridRow.css";
import GridCell from "./GridCell";
import { alphabet } from "../utilities";

/**
 * This component generates cells for a row.
 * The first row contains column headers (A, B, C, etc.).
 * Other rows contain editable cells.
 */
function generateRow(rowNum, rowState, dispatch, currentSheet, setSelectedCells) {
  // Add the first cell for row numbers or dummy space.
  const row = [
    <span className={rowNum > 0 ? "grid-numbers" : "grid-dummy"} key="row-header">
      {rowNum > 0 ? rowNum : ""}
    </span>,
  ];

  // Generate columns dynamically based on the alphabet and rowState.
  const numCols = rowState ? Object.keys(rowState).length : alphabet.length;
  for (let j = 0; j < numCols; j++) {
    const col = alphabet[j];
    if (rowNum > 0) {
      // Editable cell for rows > 0
      row.push(
        <GridCell
          key={`${col}${rowNum}`}
          cellState={rowState[col]}
          dispatch={dispatch}
          currentSheet={currentSheet}
          setSelectedCells={setSelectedCells}
        />
      );
    } else {
      // Column header for row 0
      row.push(
        <span className="grid-column" key={col}>
          {col}
        </span>
      );
    }
  }

  return row;
}

/**
 * This component renders a row in the grid.
 * Uses the `generateRow` function to create the row.
 */
function GridRow({ rowNum, rowState, dispatch, currentSheet, setSelectedCells }) {
  return (
    <div className="grid-row">
      {generateRow(rowNum, rowState, dispatch, currentSheet, setSelectedCells)}
    </div>
  );
}

export default React.memo(GridRow);
