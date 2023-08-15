import React from 'react';
import "./productsFilter.css";


const ProductsFilter: React.FC = () => {
  return (
    <>
    <div className='filterContainer'>
     <div className='filters'>
      <p>Filter by:</p>
     </div>
     <div className='products'></div>
    </div>
    </>
  );
};

export default ProductsFilter;

  
export {}; 