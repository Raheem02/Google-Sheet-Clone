import React from "react";
import "./GridCell.css";
import {
  ChangeActiveCell,
  ChangeActiveCellProperties,
  ReevaluateFormula,
  RemoveDependentCell,
} from "../reducer";
import { useDrag, useDrop } from "react-dnd";

const ItemTypes = {
  CELL: "cell",
};

function GridCell({ cellState, dispatch, currentSheet, setSelectedCells }) {
  const updateCell = (content) => {
    dispatch(
      ChangeActiveCellProperties(cellState.id, currentSheet, "content", content)
    );

    dispatch(RemoveDependentCell(cellState.id, currentSheet));

    dispatch(
      ChangeActiveCellProperties(cellState.id, currentSheet, "formula", "")
    );

    cellState.dependentCells.forEach((id) => {
      dispatch(ReevaluateFormula(id, currentSheet));
    });
  };

  const changeActiveCell = () => {
    dispatch(ChangeActiveCell(cellState.id, currentSheet));
  };

  const handleSelectCell = () => {
    setSelectedCells((prevSelectedCells) => [
      ...prevSelectedCells,
      { ...cellState, rowIndex: parseInt(cellState.id.slice(1)), colIndex: cellState.id[0] },
    ]);
  };

  const extraStyle = {
    textAlign: cellState.alignment,
    fontFamily: cellState.fontFamily,
    fontSize: cellState.fontSize + "px",
    fontWeight: cellState.bold === false ? "normal" : "bold",
    fontStyle: cellState.italic === false ? "normal" : "italic",
    textDecoration: cellState.underline === false ? "none" : "underline",
    color: cellState.color || "black",
    backgroundColor: cellState.backgroundColor || "white",
  };

  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.CELL,
    item: { id: cellState.id, content: cellState.content },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: ItemTypes.CELL,
    drop: (item) => {
      updateCell(item.content);
    },
  });

  return (
    <input
      ref={(node) => drag(drop(node))}
      id={currentSheet + "-" + cellState.id}
      className="grid-cell"
      name={cellState.id}
      value={cellState && cellState["content"]}
      onChange={(e) => {
        updateCell(e.target.value);
      }}
      onFocus={() => {
        changeActiveCell();
        handleSelectCell();
      }}
      style={{ ...extraStyle, opacity: isDragging ? 0.5 : 1 }}
    />
  );
}

export default React.memo(GridCell);