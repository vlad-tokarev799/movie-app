import React, { Component } from 'react';
import MovieDbService, { MovieObject } from '../../services/movie-db-service';
import { ErrorProps } from '../alert-error/alert-error';

import MoviesList from '../movies-list';
import Loader from '../loader';
import AlertError from '../alert-error';

import './app.scss';

type AppState = {
  searchQuery: string;
  isLoading: boolean;
  movies: MovieObject[];
  error: ErrorProps;
};

export default class App extends Component {
  movieDbService = new MovieDbService();
  state: AppState = {
    searchQuery: 'return',
    isLoading: true,
    movies: [],
    error: {
      text: '',
      description: '',
      active: false,
    },
  };

  componentDidMount() {
    this._setMoviesData(this.state.searchQuery);

    setInterval(() => {
      if (!this.movieDbService.checkUserNetwork()) {
        this._setError({
          text: 'Network Error',
          description: 'Something went wrong',
          active: true,
        });
      } else {
        this._removeError();
      }
    }, 100);
  }

  _setError(error: ErrorProps) {
    if (!this.state.error.active) {
      this.setState({
        error,
      });
    }
  }

  _removeError() {
    if (this.state.error.active) {
      this.setState({
        error: {
          text: '',
          description: '',
          active: false,
        },
      });
    }
  }

  onGetMovie = (movies: MovieObject[]) => {
    this.setState({
      movies,
      isLoading: false,
    });
  };

  onRequestError = (error: Error) => {
    console.error(error);

    this._setError({
      text: 'Request Error',
      description: 'Something went wrong',
      active: true,
    });

    this._setMoviesData(this.state.searchQuery);
  };

  _setMoviesData(query = ''): void {
    this.movieDbService.getMovies(query).then(this.onGetMovie).catch(this.onRequestError);
  }

  render() {
    const { movies, isLoading, error } = this.state;
    const loading = isLoading && !error.active;

    return (
      <div className="app">
        <Loader loading={loading} />
        <MoviesList movies={movies} />

        <AlertError {...error} />
      </div>
    );
  }
}
