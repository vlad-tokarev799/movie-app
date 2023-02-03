import React from 'react';
import { format } from 'date-fns';
import { ReleaseDate } from '../../../movie-api/types';

const MovieReleaseDate: React.FC<{ releaseDate: ReleaseDate }> = (props) => {
  const hasReleaseDate = props.releaseDate !== 0;
  const releaseDateFormat = hasReleaseDate ? format(props.releaseDate, 'PP') : 'unknown';

  return <p>{releaseDateFormat}</p>;
};

export default MovieReleaseDate;
