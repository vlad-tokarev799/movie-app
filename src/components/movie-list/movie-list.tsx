import React, { useEffect, useState } from 'react';
import { RootState } from '../../store/store';
import { useAppSelector } from '../../store/hooks';
import { MovieObject } from '../../movie-api/types';

import './movie-list.scss';

import MovieCard from '../movie-card/movie-card';
import { Spin } from 'antd';

const MovieList: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const movies = useAppSelector((state: RootState) => state.movies.movies);

  useEffect(() => {
    if (movies.length) {
      setLoading(false);
    }
  });

  const movieCards = movies.length ? (
    movies.map((movie: MovieObject) => {
      return <MovieCard {...movie} key={movie.id} />;
    })
  ) : (
    <p className={'movie-list__not-found'}>Movies not found</p>
  );

  if (loading) {
    return (
      <div className="movie-list_loading">
        <Spin size={'large'} tip="Loading" />
      </div>
    );
  }

  return <div className="movie-list">{movieCards}</div>;
};

export default MovieList;
