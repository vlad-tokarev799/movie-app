import React from 'react';
import { Image } from 'antd';

const MoviePoster = (props: { path: string }) => {
  const posterSize = {
    w: 187,
    h: 278,
  };

  if (document.documentElement.clientWidth < 560) {
    posterSize.w = 80;
    posterSize.h = 120;
  }

  return (
    <div className={'movie-card__poster'}>
      <Image
        width={posterSize.w}
        height={posterSize.h}
        src={props.path}
        fallback={'https://critics.io/img/movies/poster-placeholder.png'}
      />
    </div>
  );
};

export default MoviePoster;
