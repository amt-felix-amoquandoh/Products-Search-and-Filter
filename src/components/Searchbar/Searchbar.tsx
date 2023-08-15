import React from 'react';
import "./searchbar.css";
import { Search } from 'react-feather';

const Searchbar: React.FC = () => {
  // Your component logic here
  return (
    <div className='searchbar'>
      <input className='searchbarInput' type="text" placeholder="where to ?" />
      <Search className="searchIcon" size={20} />
    </div>
  );
};

export default Searchbar;

  
  export {}; 