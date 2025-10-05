import React from "react";
import './MovieList.css';
import Movie from "./Movie";

const MovieList = React.memo(({ movies }) => {
  // создаём независимую копию массива (на всякий случай)
  const safeMovies = [...movies];

  return (
    <div className="movies">
      {safeMovies.map((movie) => (
        <Movie key={`${movie.imdbID}-${movie.Title}`} {...movie} />
      ))}
    </div>
  );
});

export default MovieList;