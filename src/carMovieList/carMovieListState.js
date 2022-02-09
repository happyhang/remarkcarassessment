import * as React from 'react';
import {
  action, computed, makeObservable, observable, runInAction,
} from 'mobx';
import ApiService from 'common/utils/apiService';

class CarMovieListState {
  movieList = []

  page = 0

  totalPage = 1

  loading = false

  error = ''

  get isTheEnd() {
    return this.page >= this.totalPage;
  }

  constructor() {
    makeObservable(this, {
      movieList: observable,
      page: observable,
      totalPage: observable,
      loading: observable,
      error: observable,
      loadMovies: action,
      resetMovies: action,
      isTheEnd: computed,
    });
  }

  async loadMovies() {
    this.loading = true;
    this.error = '';

    try {
      const result = await ApiService.get(`s=car&type=movie&r=json&page=${this.page + 1}`);

      const mapped = result.data.Search.map((s) => ({
        posterUrl: s.Poster,
        title: s.Title,
        year: s.Year,
      }));

      runInAction(() => {
        this.movieList.push(...mapped);
        this.page += 1;
        this.totalPage = Math.ceil(result.data.totalResults / 10);
      });
    } catch (e) {
      runInAction(() => {
        this.error = 'Something wrong has happened :(';
      });
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  }

  resetMovies() {
    this.movieList = [];
    this.page = 0;
    this.totalPage = 1;
    this.loading = true;
    this.error = '';
  }
}

const CarMovieListInstance = new CarMovieListState();

const CarMovieListContext = React.createContext(CarMovieListInstance);

export { CarMovieListState, CarMovieListInstance, CarMovieListContext };
