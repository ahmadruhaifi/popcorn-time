"use client"

import React, { useEffect, useState } from "react";
import Results from "../components/Results";
import Pagination from "../components/Pagination";
import Filter from "../components/Filter";
import { MovieData, HomeProps } from "../utils/interfaces"

const Home: React.FC<HomeProps> = ({ searchParams }) => {
  const [data, setData] = useState<MovieData | null>(null);
  const pageNumber = searchParams.page || 1;
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('');
  const [selectedRating, setSelectedRating] = useState(0);

  // Fetch the genres
  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const res = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.NEXT_PUBLIC_API_KEY}`);

        if (!res.ok) throw new Error("Unable to retrieve genres.");

        const result = await res.json();
        setGenres(result.genres);
      } catch (error) {
        console.error("Encountered an issue while retrieving genres: ", error);
      }
    };
  
    fetchGenres();
  }, []);

  // Fetch the movies
  useEffect(() => {
    const fetchData = async () => {
      try {
        let apiEndpoint = `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.NEXT_PUBLIC_API_KEY}&page=${pageNumber}`;

        if (selectedGenre) {
          apiEndpoint += `&with_genres=${selectedGenre}`;
        }
        if (selectedRating > 0) {
          apiEndpoint += `&vote_average.gte=${selectedRating}`;
        }

        const res = await fetch(apiEndpoint);

        if (!res.ok) throw new Error("Unable to retrieve movies.");

        const result: MovieData = await res.json();
        setData(result);
      } catch (error) {
        console.error("Encountered an issue while retrieving movies: ", error);
      }
    };

    fetchData();
  }, [pageNumber, selectedGenre, selectedRating]);

  return (
    <>
      {/* Genre Selector */}
      <Filter 
        genres={genres}
        selectedGenre={selectedGenre}
        setSelectedGenre={setSelectedGenre}
        selectedRating={selectedRating}
        setSelectedRating={setSelectedRating}
      />
      {/* Results and Pagination */}
      {data && <Results results={data.results} />}
      {data?.total_results && data?.total_pages && (
        <Pagination totalPages={data?.total_pages} />
      )}
    </>
  );
};

export default Home;
