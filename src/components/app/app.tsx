import React, { useEffect } from 'react';
import { useMovies } from '../../movie-api/hooks';

import './app.scss';

import ErrorMessage from '../error-message/error-message';
import Search from '../search/search';

const App = () => {
  const getMovies = useMovies();

  useEffect(() => {
    getMovies('return');
  }, []);

  return (
    <div className="app">
      <ErrorMessage />
      <Search />
    </div>
  );
};

export default App;
