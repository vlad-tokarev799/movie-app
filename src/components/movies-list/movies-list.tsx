import React from 'react';

import MovieCard from '../movie-card';

import './movies-list.scss';
import { MovieObject } from '../../services/movie-db-service';

const MoviesList = (props: { movies: MovieObject[] }) => {
  const MovieCards = props.movies.map((movie: MovieObject) => {
    return <MovieCard key={`movie_${movie.id}`} {...movie} />;
  });

  return <div className="movie-list">{MovieCards}</div>;
};

export default MoviesList;
