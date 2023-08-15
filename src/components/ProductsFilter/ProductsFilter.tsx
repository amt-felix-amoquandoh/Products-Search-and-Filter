import React, { useState } from "react";
import "./productsFilter.css";
import AccomodationCards from '../Cards/AccomdationCards';
import FilterInput from "./CheckBox";


const ProductsFilter: React.FC = () => {

  return (
    <>
    <div className='filterContainer'>
     <div className='filters'>
      <div className='filtercontent'>
      Filter by:
      </div>
      {/*  */}
      <div className="filtercontent">
      Popular filters
      <div>
        <FilterInput
        filterName="Hotels"
        onCheckboxChange={(checked) => console.log(checked)}
        itemsNumber={14}
        checked
        /> 
        <FilterInput
        filterName="Resorts"
        onCheckboxChange={(checked) => console.log(checked)}
        itemsNumber={9}
        checked
        /> 
        <FilterInput
        filterName="Swimming pool"
        onCheckboxChange={(checked) => console.log(checked)}
        itemsNumber={4}
        checked
        />    
        <FilterInput
        filterName="Center of Accra"
        onCheckboxChange={(checked) => console.log(checked)}
        itemsNumber={5}
        checked
        /> 
      </div>
     </div>
      {/*  */}
      <div className="filtercontent">
            Fun things to do
            <div>
            <FilterInput
        filterName="Beach"
        onCheckboxChange={(checked) => console.log(checked)}
        itemsNumber={5}
        checked
        /> 
         <FilterInput
        filterName="Happy Hour"
        onCheckboxChange={(checked) => console.log(checked)}
        itemsNumber={5}
        checked
        /> 
         <FilterInput
        filterName="Walking Hours"
        onCheckboxChange={(checked) => console.log(checked)}
        itemsNumber={5}
        checked
        /> 
            </div>
       </div>
      {/*  */}
      <div className="filtercontent">
            Property type
            <div>
            <FilterInput
        filterName="Hotels"
        onCheckboxChange={(checked) => console.log(checked)}
        itemsNumber={14}
        checked
        /> 
         <FilterInput
        filterName="Apartments"
        onCheckboxChange={(checked) => console.log(checked)}
        itemsNumber={5}
        checked
        /> 
         <FilterInput
        filterName="Resort"
        onCheckboxChange={(checked) => console.log(checked)}
        itemsNumber={4}
        checked
        /> 
         <FilterInput
        filterName="Bed and Breakfast"
        onCheckboxChange={(checked) => console.log(checked)}
        itemsNumber={2}
        checked
        /> 
            </div>
       </div>
       <div className="filtercontent">
            Facilities
            <div>
            <FilterInput
        filterName="Hotels"
        onCheckboxChange={(checked) => console.log(checked)}
        itemsNumber={14}
        checked
        /> 
          <FilterInput
        filterName="Hotels"
        onCheckboxChange={(checked) => console.log(checked)}
        itemsNumber={14}
        checked
        /> 
          <FilterInput
        filterName="Hotels"
        onCheckboxChange={(checked) => console.log(checked)}
        itemsNumber={14}
        checked
        /> 
          <FilterInput
        filterName="Hotels"
        onCheckboxChange={(checked) => console.log(checked)}
        itemsNumber={14}
        checked
        /> 
          <FilterInput
        filterName="Hotels"
        onCheckboxChange={(checked) => console.log(checked)}
        itemsNumber={14}
        checked
        /> 
          <FilterInput
        filterName="Hotels"
        onCheckboxChange={(checked) => console.log(checked)}
        itemsNumber={14}
        checked
        /> 
            </div>
       </div>
       <div className="filtercontent">
            Room Facilities
            <div>
            <FilterInput
        filterName="Hotels"
        onCheckboxChange={(checked) => console.log(checked)}
        itemsNumber={14}
        checked
        /> 
          <FilterInput
        filterName="Hotels"
        onCheckboxChange={(checked) => console.log(checked)}
        itemsNumber={14}
        checked
        /> 
          <FilterInput
        filterName="Hotels"
        onCheckboxChange={(checked) => console.log(checked)}
        itemsNumber={14}
        checked
        /> 
          <FilterInput
        filterName="Hotels"
        onCheckboxChange={(checked) => console.log(checked)}
        itemsNumber={14}
        checked
        /> 
          <FilterInput
        filterName="Hotels"
        onCheckboxChange={(checked) => console.log(checked)}
        itemsNumber={14}
        checked
        /> 
          <FilterInput
        filterName="Hotels"
        onCheckboxChange={(checked) => console.log(checked)}
        itemsNumber={14}
        checked
        /> 
          <FilterInput
        filterName="Hotels"
        onCheckboxChange={(checked) => console.log(checked)}
        itemsNumber={14}
        checked
        /> 
          <FilterInput
        filterName="Hotels"
        onCheckboxChange={(checked) => console.log(checked)}
        itemsNumber={14}
        checked
        /> 
          <FilterInput
        filterName="Hotels"
        onCheckboxChange={(checked) => console.log(checked)}
        itemsNumber={14}
        checked
        /> 
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