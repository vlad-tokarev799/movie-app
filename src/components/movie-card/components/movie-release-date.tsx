import React from 'react';
import { format } from 'date-fns';
import { ReleaseDate } from '../../../services/movie-db-service';

const MovieReleaseDate = (props: { releaseDate: ReleaseDate }) => {
  const hasReleaseDate = props.releaseDate !== 0;
  const releaseDateFormat = hasReleaseDate ? format(props.releaseDate, 'PP') : 'unknown';

  return <p>{releaseDateFormat}</p>;
};

export default MovieReleaseDate;
