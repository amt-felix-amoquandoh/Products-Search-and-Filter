import React from "react";
import "./productsFilter.css";

interface FilterInputsProps {
  onCheckboxChange: (checked: boolean) => void;
  checked: boolean; // Remove the default value for checked
  filterName?: string;
  itemsNumber?: number;
}

const FilterInput: React.FC<FilterInputsProps> = ({
  onCheckboxChange,
  checked,
  filterName = "Default Filter",
  itemsNumber = 0,
}) => {
  return (
    <div>
      <div className="checkInputs">
        <div>
          <label>
            <input
              className="checkInput"
              type="checkbox"
              checked={false} // Use the passed prop value for checked
              onChange={(e) => onCheckboxChange(e.target.checked)}
            />
            <span className="filterName">{filterName}</span>
          </label>
        </div>
        <span className="itemsnumber">{itemsNumber}</span>
      </div>
    </div>
  );
};

export default FilterInput;
