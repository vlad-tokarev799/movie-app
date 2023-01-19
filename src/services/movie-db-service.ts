// import { debounce } from './debounce';

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

export default class MovieDbService {
  __baseUrl = 'https://api.themoviedb.org/3';
  __apiKey = '699893830461e47a3e90b4dda7e28356';
  __genres = [];

  debounce(fn: (path: string, params: object) => Promise<any>, debounceTime: number, cb: ([key]: any) => void) {
    let timerId: ReturnType<typeof setTimeout>;

    return (path: string, params: object): void => {
      clearTimeout(timerId);

      timerId = setTimeout(() => {
        const res = fn.apply(this, [path, params]);
        cb(res);
      }, debounceTime);
    };
  }

  _getRequestURL(path: string, params: object): URL {
    const url = new URL(this.__baseUrl + path);

    Object.entries(params).forEach((param) => {
      url.searchParams.set(param[0], param[1]);
    });
    url.searchParams.set('api_key', this.__apiKey);

    return url;
  }

  async getResource(path: string, params: object) {
    const url = this._getRequestURL(path, params);
    const response = await fetch(url);

    if (response.ok) {
      return await response.json();
    } else {
      throw new Error('request error');
    }
  }

  async getGenres() {
    if (!this.__genres.length) {
      const genres = await this.getResource('/genre/movie/list', {
        language: 'en-US',
      });

      this.__genres = genres.genres;
    }

    return this.__genres || [];
  }

  async _transformMovies(movies: MovieResponseObject[]): Promise<MovieObject[]> {
    const allGenres = await this.getGenres();

    return movies.map((movie) => {
      const genres = allGenres.filter((genre: GenreObject) => {
        return movie.genre_ids.includes(genre.id);
      });

      const result: MovieObject = {
        id: movie.id,
        title: movie.title,
        posterPath: movie.poster_path,
        genres,
        releaseDate: movie.release_date ? new Date(movie.release_date) : 0,
        overview: movie.overview,
      };

      return result || [];
    });
  }

  async getMovies(query: string, page = 1) {
    const fetchMovies = new Promise((resolve) => {
      const debouncedGetResource = this.debounce(this.getResource, 500, resolve);
      debouncedGetResource('/search/movi', {
        query,
        page,
      });
    });
    const body = (await fetchMovies) as MoviesResponse;

    return this._transformMovies(body.results);
  }

  checkUserNetwork() {
    return navigator.onLine;
  }
}
