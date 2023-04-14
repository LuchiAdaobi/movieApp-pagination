import React, { useState, useEffect } from "react";
import Pagination from "./components/Pagination";
import { config } from "dotenv";
// config();
 
if (typeof process !== "undefined") {
  config();
}

function MovieList() {
  const apiKey = import.meta.env.VITE_REACT_APP_API_KEY ; // Set default value for API key
  console.log(apiKey)

  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalMovies, setTotalMovies] = useState(0);

  useEffect(() => {
    const fetchMovies = async () => {
      const response = await fetch(`${apiKey}&s=batman&page=${currentPage}`);
      console.log(response); // Log the response object
      const data = await response.json();
      if (data.Search) {
        setMovies(data.Search);
        setTotalMovies(parseInt(data.totalResults));
      }
    };

    fetchMovies();
  }, [currentPage, apiKey]);

  const totalPages = Math.ceil(totalMovies / 10);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <h1 className="heading">MovieRama</h1>
      {movies.length > 0 ? (
        <ul className="movie">
          {movies.map((movie) => (
            <li key={movie.imdbID}>
              <img src={movie.Poster} alt={movie.Title} />
              <p>{movie.Title}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="loading">Loading...</p>
      )}
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

export default MovieList;
