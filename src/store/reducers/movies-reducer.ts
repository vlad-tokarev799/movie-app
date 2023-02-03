import { MovieObject } from '../../movie-api/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

type MoviesState = {
  query: string;
  movies: MovieObject[];
  page: number;
  totalPages: number;
};

const initialState: MoviesState = {
  query: '',
  movies: [],
  page: 1,
  totalPages: 1,
};

export const movieSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    setMovies: (state, action: PayloadAction<MoviesState>) => {
      const { movies, totalPages, page, query } = action.payload;

      state.movies = movies;
      state.totalPages = totalPages;
      state.page = page;
      state.query = query;
    },
    changePage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
  },
});

export const { setMovies, changePage } = movieSlice.actions;

export const selectMovies = (state: RootState) => state.movies.movies;
export const selectTotalPages = (state: RootState) => state.movies.totalPages;
export const selectPage = (state: RootState) => state.movies.page;
export const selectQuery = (state: RootState) => state.movies.query;

export default movieSlice.reducer;
