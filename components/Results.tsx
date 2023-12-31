import React from "react";
import ResultItems from "./ResultItems";
import { ResultsProps } from "../utils/interfaces"

const Results: React.FC<ResultsProps> = ({ results }) => {
  return (
    <div className="sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 max-w-6xl mx-auto mt-4 items-stretch">
      {results?.map((result) => {
        return <ResultItems key={result.id} results={result} />;
      })}
    </div>
  );
};

export default Results;
