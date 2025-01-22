import "./Grid.css";
import GridRow from "./GridRow";
import { useState, useEffect } from "react";

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
  menus.forEach(menu => {
    if (menu && menu.parentNode) {
      menu.parentNode.removeChild(menu);
    }
  });
  setContextMenu({ visible: false, x: 0, y: 0 });
};

const GenerateRows = (numRows, rowsState, dispatch, currentSheet, setSelectedCells) => {
  const r = [];
  for (let i = 0; i <= numRows; i++)
    r.push(
      <GridRow
        rowNum={i}
        key={i}
        rowState={rowsState[i]}
        dispatch={dispatch}
        currentSheet={currentSheet}
        setSelectedCells={setSelectedCells}
      />
    );

  return r;
};

export default function Grid({ state, dispatch, currentSheet }) {
  const [contextMenu, setContextMenu] = useState({ visible: false, x: 0, y: 0 });

  useEffect(() => {
    const handleClick = (event) => {
      if (!event.target.closest('.context-menu')) {
        handleClickOutside(setContextMenu);
      }
    };
    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);

  return (
    <div className="grid-container" onContextMenu={(e) => handleContextMenu(e, setContextMenu)}>
      {GenerateRows(
        state ? state.numRows : -1,
        state || {},
        dispatch,
        currentSheet,
        () => {} // setSelectedCells is removed, so pass a no-op function
      )}
    </div>
  );
}
