import React, { ReactElement } from 'react';
import { format } from 'date-fns';
import { ReleaseDate } from '../../../types/core';

type MovieReleaseDateType = (props: { releaseDate: ReleaseDate }) => ReactElement;

function isValidDate(d: any) {
  return d instanceof Date && !isNaN(d as unknown as number);
}

const MovieReleaseDate: MovieReleaseDateType = (props) => {
  const releaseDate = new Date(props.releaseDate);

  return <p>{isValidDate(releaseDate) ? format(releaseDate, 'PP') : 'unknown'}</p>;
};

export default MovieReleaseDate;
