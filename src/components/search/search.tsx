import React from 'react';
import { Input, Pagination } from 'antd';
import MovieList from '../movie-list/movie-list';
import { debounce } from 'lodash';
import { useMovies } from '../../movie-api/hooks';
import { useAppSelector } from '../../store/hooks';
import { selectPage, selectQuery, selectTotalPages } from '../../store/reducers/movies-reducer';

const Search = () => {
  const getMovies = useMovies();
  const totalPages = useAppSelector(selectTotalPages);
  const searchQuery = useAppSelector(selectQuery);
  const currentPage = useAppSelector(selectPage);

  const onSearchInput = debounce((e: React.BaseSyntheticEvent) => {
    const targetInput: HTMLInputElement = e.target;
    getMovies(targetInput.value);
  }, 500);

  const paginationHandler = (page: number) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    getMovies(searchQuery, page);
  };

  return (
    <div>
      <Input placeholder="Type to search" size="large" onChange={onSearchInput} />
      <MovieList />
      <Pagination
        showSizeChanger={false}
        showQuickJumper
        onChange={paginationHandler}
        current={currentPage}
        total={totalPages}
        hideOnSinglePage
        defaultPageSize={1}
      />
    </div>
  );
};

export default Search;
