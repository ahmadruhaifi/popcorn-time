import React from "react";
import { FilterProps } from "../utils/interfaces"

const Filter: React.FC<FilterProps> = ({
  genres,
  selectedGenre,
  setSelectedGenre,
  selectedRating,
  setSelectedRating,
}) => {
  return (
    <>
      {/* Genre Selector */}
      <select 
        value={selectedGenre} 
        onChange={e => setSelectedGenre(e.target.value)}
        className="border rounded px-3 py-2 mr-2 text-gray-500"
      >
        <option value="">All Genres</option>
        {genres.map(genre => (
          <option key={genre.id} value={genre.id}>{genre.name}</option>
        ))}
      </select>

      {/* Rating Selector */}
      <div className="flex items-center text-gray-500">
        <label htmlFor="rating" className="mr-2">Rating:</label>
        <input 
          id="rating"
          type="range" 
          min="0" 
          max="10" 
          value={selectedRating} 
          onChange={e => setSelectedRating(Number(e.target.value))} 
          className="mr-2"
        />
        <span>{selectedRating}</span>
      </div>
    </>
  );
};

export default Filter;