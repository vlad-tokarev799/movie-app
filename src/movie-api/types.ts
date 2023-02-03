export type MoviesResponse = {
  page: number;
  results: MovieResponseObject[];
  total_pages: number;
  total_results: number;
};

export type MovieResponseObject = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

export type MovieObject = {
  id: number;
  title: string;
  posterPath: string;
  genres: GenreObject[];
  releaseDate: ReleaseDate;
  overview: string;
};

export type GenreObject = {
  id: number;
  name: string;
};

export type ReleaseDate = Date | number;
