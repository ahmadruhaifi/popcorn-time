"use client"

import React, { useEffect, useState } from "react";
import Results from "../components/Results";
import Pagination from "../components/Pagination";
import Filter from "../components/Filter";
import Sort from "../components/Sort";
import { MovieData, HomeProps } from "../utils/interfaces"

const Home: React.FC<HomeProps> = ({ searchParams }) => {
  const [data, setData] = useState<MovieData | null>(null);
  const pageNumber = searchParams.page || 1;
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('');
  const [selectedRating, setSelectedRating] = useState(0);
  const [sortCriteria, setSortCriteria] = useState('');

  // Fetch the genres
  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/genre/movie/list?api_key=${process.env.NEXT_PUBLIC_API_KEY}`);

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
        let apiEndpoint = `${process.env.NEXT_PUBLIC_API_URL}/discover/movie?api_key=${process.env.NEXT_PUBLIC_API_KEY}&page=${pageNumber}&release_date.gte=2023-11-01`;

        if (selectedGenre) {
          apiEndpoint += `&with_genres=${selectedGenre}`;
        }
        if (selectedRating > 0) {
          apiEndpoint += `&vote_average.gte=${selectedRating}`;
        }

        // Mapping of UI criteria to API parameters
        const sortCriteriaMap: any = {
          title: 'original_title.asc',
          release_date: 'release_date.desc',
          popularity: 'popularity.desc',
          rating: 'vote_average.desc',
        };

        if (sortCriteria) {
          apiEndpoint += `&sort_by=${sortCriteriaMap[sortCriteria]}`;
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
  }, [pageNumber, selectedGenre, selectedRating, sortCriteria]);

  return (
    <>
      <div className="bg-cyan-200 text-center text-lg font-semibold flex justify-center p-2">
        <div className="flex flex-wrap justify-between max-w-6xl mx-auto items-stretch w-full">
          {/* Filtering */}
          <div className="flex items-center">
            <Filter 
              genres={genres}
              selectedGenre={selectedGenre}
              setSelectedGenre={setSelectedGenre}
              selectedRating={selectedRating}
              setSelectedRating={setSelectedRating}
            />
          </div>

          {/* Sorting */}
          <div className="flex items-center">
            <Sort 
              sortCriteria={sortCriteria}
              setSortCriteria={setSortCriteria}
            />
          </div>
        </div>
      </div>

      {/* Results and Pagination */}
      {data && <Results results={data.results} />}
      {data?.total_results && data?.total_pages && (
        <Pagination totalPages={data?.total_pages} />
      )}
    </>
  );
};

export default Home;
