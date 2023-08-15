import React from 'react';
import "./productsFilter.css";
import AccomodationCards from '../Cards/AccomdationCards';


const ProductsFilter: React.FC = () => {
  return (
    <>
    <div className='filterContainer'>
     <div className='filters'>
      <p>Filter by:</p>
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