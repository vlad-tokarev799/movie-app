import React, { Component } from 'react';
import TextFormatService from '../../services/text-format-service';
import { MovieObject } from '../../services/movie-db-service';

import MovieTags from './components/movie-tags';
import MovieReleaseDate from './components/movie-release-date';
import MoviePoster from './components/movie-poster';
import { Typography } from 'antd';

import './movie-card.scss';

const { Title, Paragraph } = Typography;

export default class MovieCard extends Component {
  state = {
    isLoading: true,
  };
  props: MovieObject;

  textFormatService = new TextFormatService();

  render() {
    const { title, posterPath, releaseDate, genres, overview } = this.props;
    const overviewContent = this.textFormatService.truncate(overview, 110);
    const path = `https://image.tmdb.org/t/p/original${posterPath}`;

    return (
      <div className="movie-card">
        <MoviePoster path={path} />
        <div className="movie-card__content">
          <Title level={4}>{title}</Title>
          <MovieReleaseDate releaseDate={releaseDate} />
          <MovieTags genres={genres} />
          <Paragraph>{overviewContent}</Paragraph>
        </div>
      </div>
    );
  }
}
