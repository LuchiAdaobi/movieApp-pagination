import React, { useState, useEffect } from "react";
import Pagination from "./components/Pagination";

function MovieList() {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalMovies, setTotalMovies] = useState(0);

  useEffect(() => {
    const fetchMovies = async () => {
      const response = await fetch(
        `http://www.omdbapi.com/?i=tt3896198&apikey=9a85a143&s=batman&page=${currentPage}`
      );
      const data = await response.json();
      if (data.Search) {
        setMovies(data.Search);
        setTotalMovies(parseInt(data.totalResults));
      }
    };

    fetchMovies();
  }, [currentPage]);

  const totalPages = Math.ceil(totalMovies / 10);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div >
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
        <p>Loading...</p>
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
