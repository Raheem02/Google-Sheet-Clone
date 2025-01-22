import { useState, useEffect, useRef } from "react";
import "./PageActions.css";

export default function PageActions() {
  const [showInsertDropdown, setShowInsertDropdown] = useState(false);
  const dropdownRef = useRef(null);

  // Example action handlers (if no props are passed)
  const onAddRow = () => {
    console.log("Row Added");
  };

  const onDeleteRow = () => {
    console.log("Row Deleted");
  };

  const onAddColumn = () => {
    console.log("Column Added");
  };

  const onDeleteColumn = () => {
    console.log("Column Deleted");
  };

  const handleInsertClick = () => {
    setShowInsertDropdown((prev) => !prev);
  };

  const handleClickOption = (action) => {
    if (typeof action === "function") {
      action();
      setShowInsertDropdown(false);
    } else {
      console.error("Provided action is not a function:", action);
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowInsertDropdown(false);
      }
    };
    window.addEventListener("click", handleOutsideClick);
    return () => {
      window.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  return (
    <div className="page-actions-container">
      <div className="page-actions">Home</div>
      <div className="page-actions page-actions-active">File</div>
      <div className="dropdown" ref={dropdownRef}>
        <div className="page-actions" onClick={handleInsertClick}>
          Insert
        </div>
        <div className={`dropdown-content ${showInsertDropdown ? "show" : ""}`}>
          <div className="dropdown-item" onClick={() => handleClickOption(onAddRow)}>
            Add Row
          </div>
          <div className="dropdown-item" onClick={() => handleClickOption(onDeleteRow)}>
            Delete Row
          </div>
          <div className="dropdown-item" onClick={() => handleClickOption(onAddColumn)}>
            Add Column
          </div>
          <div className="dropdown-item" onClick={() => handleClickOption(onDeleteColumn)}>
            Delete Column
          </div>
        </div>
      </div>
      <div className="page-actions">Layout</div>
      <div className="page-actions">Help</div>
    </div>
  );
}
