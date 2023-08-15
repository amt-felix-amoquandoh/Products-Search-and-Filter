import React, { useState } from "react";
import "./productsFilter.css";
import AccomodationCards from '../Cards/AccomdationCards';


const ProductsFilter: React.FC = () => {
  const [checkboxes, setCheckboxes] = useState([
    { name: "Checkbox 1", number: 1, checked: false },
    { name: "Checkbox 2", number: 2, checked: false },
    { name: "Checkbox 3", number: 3, checked: false },
    { name: "Checkbox 4", number: 4, checked: false },
  ]);

  const handleCheckboxChange = (index: number) => {
    const updatedCheckboxes = [...checkboxes];
    updatedCheckboxes[index].checked = !updatedCheckboxes[index].checked;
    setCheckboxes(updatedCheckboxes);
  };
  return (
    <>
    <div className='filterContainer'>
     <div className='filters'>
      <div className='filtercontent'>
      <p>Filter by:</p>
      </div>
      <div className='filtercontent'>
        <h5>Popular filters</h5>
        <div>
      {checkboxes.map((checkbox, index) => (
        <div className="checkInputs" key={index}>
          <div>
          <label>
            <input
            className="checkInput"
              type="checkbox"
              checked={checkbox.checked}
              onChange={() => handleCheckboxChange(index)}
            />
            <span className="filterName">{checkbox.name}</span> 
          </label>
          </div>
          <span className="itemsnumber">{checkbox.number}</span>
        </div>
      ))}
    </div>
      </div>
     </div>
     <div className='products'>
      <AccomodationCards />
     </div>
    </div>
    </>
  );
};

export default ProductsFilter;

  
export {}; 