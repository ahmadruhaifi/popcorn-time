import React from 'react';
import { SortProps } from "../utils/interfaces"

const Sort: React.FC<SortProps> = ({ sortCriteria, setSortCriteria }) => {
  return (
    <>
      {/* Sort Selector */}
      <select 
        value={sortCriteria} 
        onChange={e => setSortCriteria(e.target.value)}
        className="border rounded px-3 py-2 mr-2 mt-2 md:mt-0 text-gray-500"
      >
        <option value="">Sort by:</option>
        <option value="title">Title</option>
        <option value="release_date">Release Date</option>
        <option value="popularity">Popularity</option>
        <option value="rating">Rating</option>
      </select>
    </>
  );
};

export default Sort;
