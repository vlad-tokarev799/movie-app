import React from 'react';
import { Tag } from 'antd';
import { GenreObject } from '../../../services/movie-db-service';

const MovieTags = (props: { genres: GenreObject[] }) => {
  const genreElements = props.genres.map((genre: GenreObject) => <Tag key={genre.id}>{genre.name}</Tag>);

  return <div className="movie-card__tags">{genreElements}</div>;
};

export default MovieTags;
