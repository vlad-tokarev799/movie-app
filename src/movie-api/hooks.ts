import { useAppDispatch } from '../store/hooks';
import { setMovies } from '../store/reducers/movies-reducer';
import { setError } from '../store/reducers/error-reducer';
import { getMovies } from './movie-db-api';

export const useMovies = () => {
  const dispatch = useAppDispatch();

  return async (query: string, page = 1) => {
    try {
      const movies = await getMovies(query, page);

      dispatch(setMovies(movies));
    } catch (e) {
      dispatch(
        setError({
          text: 'Something went wrong',
          description: 'MovieDB Server Error',
          active: true,
        })
      );
    }
  };
};
