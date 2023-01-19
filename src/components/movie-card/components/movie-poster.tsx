import React from 'react';
import { Image } from 'antd';

const MoviePoster = (props: { path: string }) => {
  return (
    <>
      <Image
        width={185}
        height={278}
        src={props.path}
        fallback={'https://critics.io/img/movies/poster-placeholder.png'}
      />
    </>
  );
};

export default MoviePoster;