import React from 'react';
import { MovieObject } from '../../movie-api/types';

import MovieTags from './components/movie-tags';
import MovieReleaseDate from './components/movie-release-date';
import MoviePoster from './components/movie-poster';
import { Typography } from 'antd';

import './movie-card.scss';

const { Title, Paragraph } = Typography;

function truncate(str: string, length: number): string {
  const text = str.slice(0, length);
  const a = text.split(' ');
  a.splice(a.length - 1, 1);
  const res = a.join(' ');
  return `${res} ...`;
}

const MovieCard: React.FC<MovieObject> = (props) => {
  const { title, posterPath, releaseDate, genres, overview } = props;
  const overviewContent = truncate(overview, 110);
  const path = `https://image.tmdb.org/t/p/original${posterPath}`;

  return (
    <div className="movie-card">
      <MoviePoster path={path} />
      <div className="movie-card__content">
        <Title level={4}>{title}</Title>
        <MovieReleaseDate releaseDate={releaseDate} />
        <MovieTags genres={genres} />
        <Paragraph>{overviewContent}</Paragraph>
      </div>
    </div>
  );
};

export default MovieCard;
