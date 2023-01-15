export default class MovieDbService {
  __url = 'https://api.themoviedb.org/3';
  __apiKey = '699893830461e47a3e90b4dda7e28356';

  async getResource(url: string) {
    const response = await fetch(`${this.__url}/${url}?&api_key=${this.__apiKey}`);
    const body: object = await response.json();

    return body;
  }

  async getMovies(query: string, page = 1) {
    const body: any = await this.getResource(`search/movie?query=${query}&page=${page}`);

    return body.results;
  }
}
