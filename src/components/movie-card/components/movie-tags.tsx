import React from 'react';
import { Tag } from 'antd';
import { GenreObject } from '../../../movie-api/types';

const MovieTags: React.FC<{ genres: GenreObject[] }> = (props: { genres: GenreObject[] }) => {
  const genreElements = props.genres.map((genre: GenreObject) => <Tag key={genre.id}>{genre.name}</Tag>);

  return <div className="movie-card__tags">{genreElements}</div>;
};

export default MovieTags;
