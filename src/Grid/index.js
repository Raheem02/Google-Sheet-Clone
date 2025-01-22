import "./Grid.css";
import GridRow from "./GridRow";
import { useState, useEffect } from "react";

const contextMenuItems = [
  "Cut",
  "Copy",
  "Paste",
  "Insert 1 row above",
  "Insert 1 column left",
  "Insert cells",
  "Delete row",
  "Delete column",
  "Delete cells",
];

const handleContextMenu = (e, setContextMenu) => {
  e.preventDefault();
  setContextMenu({
    visible: true,
    x: e.clientX,
    y: e.clientY,
  });
};

const handleClickOutside = (setContextMenu) => {
  const menus = document.querySelectorAll('.context-menu');
  menus.forEach(menu => menu.remove());
  setContextMenu({ visible: false, x: 0, y: 0 });
};

useEffect(() => {
  const handleClick = () => handleClickOutside(setContextMenu);
  document.addEventListener('click', handleClick);
  return () => {
    document.removeEventListener('click', handleClick);
  };
}, []);

const handleContextMenuAction = (action, dispatch, currentSheet) => {
  switch (action) {
    case "Cut":
      // Implement cut functionality
      const cutData = selectedCells.map(cell => cell.value);
      clipboard.setData(cutData);
      selectedCells.forEach(cell => cell.value = '');
      break;
    case "Copy":
      // Implement copy functionality
      const copyData = selectedCells.map(cell => cell.value);
      clipboard.setData(copyData);
      break;
    case "Paste":
      // Implement paste functionality
      const pasteData = clipboard.getData();
      selectedCells.forEach((cell, index) => {
        cell.value = pasteData[index] || '';
      });
      break;
    case "Insert 1 row above":
      // Implement insert row functionality
      const rowIndex = selectedCells[0].rowIndex;
      grid.insertRow(rowIndex);
      break;
    case "Insert 1 column left":
      // Implement insert column functionality
      const colIndex = selectedCells[0].colIndex;
      grid.insertColumn(colIndex);
      break;
    case "Insert cells":
      // Implement insert cells functionality
      selectedCells.forEach(cell => {
        grid.insertCell(cell.rowIndex, cell.colIndex);
      });
      break;
    case "Delete row":
      // Implement delete row functionality
      const deleteRowIndex = selectedCells[0].rowIndex;
      grid.deleteRow(deleteRowIndex);
      break;
    case "Delete column":
      // Implement delete column functionality
      const deleteColIndex = selectedCells[0].colIndex;
      grid.deleteColumn(deleteColIndex);
      break;
    case "Delete cells":
      // Implement delete cells functionality
      selectedCells.forEach(cell => {
        grid.deleteCell(cell.rowIndex, cell.colIndex);
      });
      break;
    default:
      break;
  }
};

/**
 * Generates rows - row by row.
 * Call the GridRow component by passing state for each row and dispatch function to
 * create handler to update each cell of row.
 *
 */
const GenerateRows = (numRows, rowsState, dispatch, currentSheet) => {
  const r = [];
  for (let i = 0; i <= numRows; i++)
    r.push(
      <GridRow
        rowNum={i}
        key={i}
        rowState={rowsState[i]}
        dispatch={dispatch}
        currentSheet={currentSheet}
      />
    );

  return r;
};

/**
 * This component is used to create the complete grid row by row.
 * It used the Generate Rows function to generate rows.
 * It passed down the necessary state parameters so that we can link each cell property.
 *
 */
export default function Grid({ state, dispatch, currentSheet }) {
  const [contextMenu, setContextMenu] = useState({ visible: false, x: 0, y: 0 });
  const numRows = state ? state.numRows : -1;

  return (
    <div className="grid-container" onContextMenu={(e) => handleContextMenu(e, setContextMenu)}>
      {GenerateRows(
        numRows,
        state !== null ? state : {},
        dispatch,
        currentSheet
      )}
      {contextMenu.visible && (
        <div className="context-menu" style={{ top: contextMenu.y, left: contextMenu.x }}>
          {contextMenuItems.map((item, index) => (
            <div
              key={index}
              className="context-menu-item"
              onClick={() => handleContextMenuAction(item, dispatch, currentSheet)}
            >
              {item}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
