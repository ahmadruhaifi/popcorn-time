"use client"

import React, { useEffect, useState } from "react";
import Results from "../components/Results";
import Pagination from "../components/Pagination";
import { MovieData, HomeProps } from "../utils/interfaces"

const Home: React.FC<HomeProps> = ({ searchParams }) => {
  const [data, setData] = useState<MovieData | null>(null);
  const pageNumber = searchParams.page || 1;

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch the records
        const res = await fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-Us&page=${pageNumber}`);

        if (!res.ok) throw new Error("Unable to retrieve data.");

        const result: MovieData = await res.json();
        setData(result);
      } catch (error) {
        console.error("Encountered an issue while retrieving data: ", error);
      }
    };

    fetchData();
  }, [pageNumber]);

  return (
    <>
      {data && <Results results={data.results} />}
      {data?.total_results && data?.total_pages && (
        <Pagination totalPages={data?.total_pages} />
      )}
    </>
  );
};

export default Home;
