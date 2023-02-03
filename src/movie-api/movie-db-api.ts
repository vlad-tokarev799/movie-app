import { GenreObject, MovieObject, MovieResponseObject } from './types';

const BASE_URL = 'https://api.themoviedb.org/3';
const TOKEN = '699893830461e47a3e90b4dda7e28356';
let genres: GenreObject[] = [];

async function getResource(query: string, params: { [key: string]: string }) {
  const url = createURL(query, params);
  const response = await fetch(url);

  if (response.ok) {
    return await response.json();
  } else {
    throw new Error('Error with MovieDB API');
  }
}

function createURL(path: string, params: { [key: string]: string }) {
  const url = new URL(BASE_URL + path);

  Object.entries(params).forEach((param) => {
    url.searchParams.set(param[0], param[1]);
  });
  url.searchParams.set('api_key', TOKEN);

  return url;
}

async function getGenres() {
  if (!genres.length) {
    const body = await getResource('/genre/movie/list', {
      language: 'en-US',
    });

    genres = body.genres;
  }

  return genres;
}

function transformMovie(movie: MovieResponseObject, genres: GenreObject[]): MovieObject {
  return {
    id: movie.id,
    title: movie.title,
    posterPath: movie.poster_path,
    genres,
    releaseDate: movie.release_date ? new Date(movie.release_date) : 0,
    overview: movie.overview,
  };
}

async function transformMovies(movies: MovieResponseObject[]) {
  const allGenres = await getGenres();

  return (
    movies.map((movie) => {
      const genres = allGenres.filter((genre: GenreObject) => {
        return movie.genre_ids.includes(genre.id);
      });

      return transformMovie(movie, genres);
    }) || []
  );
}

export async function getMovies(query: string, targetPage = 1) {
  if (!query) {
    query = 'return';
  }
  const { page, total_pages, results } = await getResource('/search/movie', {
    query: query,
    page: String(targetPage),
  });

  return {
    query,
    page,
    totalPages: total_pages,
    movies: await transformMovies(results),
  };
}
