import React from 'react';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';
import configureMockStore from 'redux-mock-store';
import MovieList from './MovieList';
import callApi from '../../utils/callApi';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import thunk from 'redux-thunk';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import {
  RECEIVE_ACTORS,
  RECEIVE_MOVIES,
  INCLIKE,
  DECLIKE,
  DELETE_MOVIE,
  SET_RATING,
  SAVE_MOVIE,
} from './types';

import {
  incLike,
  receiveActors,
  receiveMovies,
  decLike,
  deleteMovie,
  saveMovie,
  fetchActors,
  fetchDecLike,
  fetchDeleteMovie,
  fetchIncLike,
  fetchMovies,
  fetchSaveMovie,
  fetchSetRating,
  setRating
} from './movieActions';

import { getFilteredMovies} from './selectors';

import movieReducer, { initialState } from './movieReducer';

const mockStore = configureMockStore([thunk.withExtraArgument(callApi)]);

const lang = {
  edit: 'Edit',
  delete: 'Delete',
  save: 'Save',
  back: 'Go Back',
  signUp: 'Sign Up',
  login: 'Log In',
  movies: 'Movies',
  logOut: 'Log Out',
  imgUrl: 'Img Url',
  title: 'Title',
  director: 'Director',
  genres: 'Genres',
  description: 'Description',
  likes: 'Likes',
  actors: 'Actors',
  searchPlaceholder: 'Enter the name',
  byLikes: 'By likes',
  byRate: 'By rate',
  pleaseLogin: 'Please log in',
  userLogin: 'Your login',
  userPassword: 'Your password',
  passwordIncorrect: 'Password is incorrect!',
  userDoNotExist: 'User doesn\'t exist',
  dontHaveAcc: 'Don\'t have an account?',
  pleaseSignUp: 'Please sign up',
  suchUserExists: 'User with such login exists!',
  alreadyHaveAcc: 'Already have the account?',
};

const actors = [
  {
    "id": 1,
    "name": "Morgan Freeman",
    "imgUrl": "https://images-na.ssl-images-amazon.com/images/M/MV5BMTc0MDMyMzI2OF5BMl5BanBnXkFtZTcwMzM2OTk1MQ@@._V1_UX214_CR0,0,214,317_AL_.jpg",
    "biography": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
  },
  {
    "id": 2,
    "name": "Bob Gunton",
    "imgUrl": "https://i.pinimg.com/736x/9a/69/1e/9a691e7471b7cff69a86262bbcbb2e4b--bob-gunton-epic-film.jpg",
    "biography": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
  },
];

const movies = [
  {
    "id": 1,
    "title": "The Shawshank Redemptoin",
    "posterUrl": "https://images-na.ssl-images-amazon.com/images/M/MV5BODU4MjU4NjIwNl5BMl5BanBnXkFtZTgwMDU2MjEyMDE@._V1_SY500_CR0,0,336,500_AL_.jpg",
    "stars": 5,
    "likes": 22,
    "genres": [
      "Crime",
      "Drama"
    ],
    "actorsIds": [
      0,
      1,
      2
    ],
    "director": "Frank Darabont",
    "description": "Chronicles the experiences of a formerly successful banker as a prisoner in the gloomy jailhouse of Shawshank after being found guilty of a crime he did not commit. The film portrays the man's unique way of dealing with his new, torturous life; along the way he befriends a number of fellow prisoners, most notably a wise long-term inmate named Red.",
    "rating": 3
  },
  {
    "id": 4,
    "title": "The Dark Knight",
    "posterUrl": "https://images-na.ssl-images-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_SY500_CR0,0,337,500_AL_.jpg",
    "stars": 2,
    "likes": 15,
    "genres": [
      "Crime",
      "Drama",
      "Action"
    ],
    "actorsIds": [
      8,
      9,
      10
    ],
    "director": "Nolan",
    "description": "Despite his tarnished reputation after the events of The Dark Knight, in which he took the rap for Dent's crimes, Batman feels compelled to intervene to assist the city and its police force which is struggling to cope with Bane's plans to destroy the city",
    "rating": 5
  },
];

const newMovie = {
  "id": 1,
  "title": "The Shawshank Redemptoin123456",
  "posterUrl": "https://images-na.ssl-images-amazon.com/images/M/MV5BODU4MjU4NjIwNl5BMl5BanBnXkFtZTgwMDU2MjEyMDE@._V1_SY500_CR0,0,336,500_AL_.jpg",
  "stars": 5,
  "likes": 23,
  "genres": [
    "Crime",
    "Drama"
  ],
  "actorsIds": [
    0,
    1,
    2
  ],
  "director": "Frank Darabont",
  "description": "Chronicles the experiences of a formerly successful banker as a prisoner in the gloomy jailhouse of Shawshank after being found guilty of a crime he did not commit. The film portrays the man's unique way of dealing with his new, torturous life; along the way he befriends a number of fellow prisoners, most notably a wise long-term inmate named Red.",
  "rating": 4
};

describe('-- MovieList --', () => {
  describe('VIEW', () => {
    it('renders correctly', () => {
      const store = {
        lang: {
          lang: 'en',
        },
        movies: {
          movies,
        },
        filter: {
          isSortedByLikes: false,
          isSortedByRating: false,
          searchValue: '',
        },
      };

      const props = {
        lang,
        fetchMovies: () => {},
        fetchActors: () => {},
        incLike: () => {},
        decLike: () => {},
        setRating: () => {},
        getFilteredMovies: () => {},
        movies,
        actors,
      };

      const tree = renderer
        .create(
          <MemoryRouter>
            <Provider store={mockStore(store)}>
              <MovieList {...props} />
            </Provider>
          </MemoryRouter>
        );

      expect(tree).toMatchSnapshot();
    });
  });

  describe('ACTIONS', () => {
    let action;

    it('should create receiveActors action', () => {
      action = receiveActors(actors);

      expect(action.type).toBe(RECEIVE_ACTORS);
      expect(action.payload).toBe(actors);
    });

    it('should create receiveMovies action', () => {
      action = receiveMovies(movies);

      expect(action.type).toBe(RECEIVE_MOVIES);
      expect(action.payload).toBe(movies);
    });

    it('should create incLike action', () => {
      action = incLike(movies[0].id);

      expect(action.type).toBe(INCLIKE);
      expect(action.payload).toBe(movies[0].id);
    });

    it('should create decLike action', () => {
      action = decLike(movies[0].id);

      expect(action.type).toBe(DECLIKE);
      expect(action.payload).toBe(movies[0].id);
    });

    it('should create setRating action', () => {
      const stars = 5;
      action = setRating(movies[0].id, stars);

      expect(action.type).toEqual(SET_RATING);
      expect(action.payload).toEqual({
        id: movies[0].id,
        stars,
      });
    });

    it('should create saveMovie action', () => {
      action = saveMovie(newMovie);

      expect(action.type).toEqual(SAVE_MOVIE);
      expect(action.payload).toEqual(newMovie);
    });

    it('should create deleteMovie action', () => {
      action = deleteMovie(movies[0].id);

      expect(action.type).toBe(DELETE_MOVIE);
      expect(action.payload).toBe(movies[0].id);
    });
  });

  describe('ACYNC ACTIONS', () => {
    const mock = new MockAdapter(axios);
    const incLikeMovie = {
      ...movies[0],
      likes: movies[0].likes + 1,
    };
    const decLikeMovie = {
      ...movies[0],
      likes: movies[0].likes - 1,
    };

    mock
      .onGet('http://localhost:3001/movies').reply(200, movies)
      .onGet('http://localhost:3001/actors').reply(200, actors)
      .onDelete('http://localhost:3001/movies/4').reply(200)
      .onPatch('http://localhost:3001/movies/1').reply(200, newMovie)
      .onPatch('http://localhost:3001/movies/1').reply(200, incLikeMovie)
      .onPatch('http://localhost:3001/movies/1').reply(200, decLikeMovie);

    let store;

    beforeEach(() => {
      const data = {
        movies: {
          movies,
          actors,
        },
      };

      store = mockStore(data);
    });

    it('should create fetchActors action', (done) => {
      return store.dispatch(fetchActors())
        .then(() => {
          expect(store.getActions()).toEqual([
            receiveActors(actors)
          ]);
          done();
        });
    });

    it('should create fetchMovies action', (done) => {
      return store.dispatch(fetchMovies())
        .then(() => {
          expect(store.getActions()).toEqual([
            receiveMovies(movies)
          ]);
          done();
        });
    });

    it('should create fetchIncLike action', (done) => {
      return store.dispatch(fetchIncLike(incLikeMovie.id))
        .then(() => {
          expect(store.getActions()).toEqual([
            incLike(incLikeMovie.id)
          ]);
          done();
        });
    });

    it('should create fetchDecLike action', (done) => {
      return store.dispatch(fetchDecLike(decLikeMovie.id))
        .then(() => {
          expect(store.getActions()).toEqual([
            decLike(decLikeMovie.id)
          ]);
          done();
        });
    });

    it('should create fetchSetRating action', (done) => {
      return store.dispatch(fetchSetRating(movies[0].id, 2))
        .then(() => {
          expect(store.getActions()).toEqual([
            setRating(movies[0].id, 2)
          ]);
          done();
        });
    });

    it('should create fetchDeleteMovie action', (done) => {
      return store.dispatch(fetchDeleteMovie(movies[1].id))
        .then(() => {
          expect(store.getActions()).toEqual([
            deleteMovie(movies[1].id)
          ]);
          done();
        });
    });

    it('should create fetchSaveMovie action', (done) => {
      return store.dispatch(fetchSaveMovie(newMovie))
        .then(() => {
          expect(store.getActions()).toEqual([
            saveMovie(newMovie)
          ]);
          done();
        });
    });
  });

  describe('REDUCER', () => {
    it('should handle initial state', () => {
      expect(movieReducer(undefined, {})).toEqual(initialState);
    });

    it('should handle RECEIVE_ACTORS', () => {
      const resultStore = {
        ...initialState,
        actors,
      };

      expect(
        movieReducer(initialState, receiveActors(actors))
      ).toEqual(resultStore);
    });

    it('should handle RECEIVE_MOVIES', () => {
      const resultStore = {
        ...initialState,
        movies,
      };

      expect(
        movieReducer(initialState, receiveMovies(movies))
      ).toEqual(resultStore);
    });

    it('should handle INCLIKE', () => {
      const resultStore = {
        ...initialState,
        movies: [{
          ...movies[0],
          likes: movies[0].likes + 1,
        }, movies[1]],
        actors,
      };

      expect(
        movieReducer({ ...initialState, movies, actors }, incLike(movies[0].id))
      ).toEqual(resultStore);
    });

    it('should handle DECLIKE', () => {
      const resultStore = {
        ...initialState,
        movies: [{
          ...movies[0],
          likes: movies[0].likes - 1,
        }, movies[1]],
        actors,
      };

      expect(
        movieReducer({ ...initialState, movies, actors }, decLike(movies[0].id))
      ).toEqual(resultStore);
    });

    it('should handle SET_RATING', () => {
      const resultStore = {
        ...initialState,
        movies: [{
          ...movies[0],
          stars: 3,
        }, movies[1]],
        actors,
      };

      expect(
        movieReducer({ ...initialState, movies, actors }, setRating(movies[0].id, 3))
      ).toEqual(resultStore);
    });

    it('should handle DELETE_MOVIE', () => {
      const resultStore = {
        ...initialState,
        movies: [movies[1]],
        actors,
      };

      expect(
        movieReducer({ ...initialState, movies, actors }, deleteMovie(movies[0].id))
      ).toEqual(resultStore);
    });

    it('should handle SAVE_MOVIE', () => {
      const resultStore = {
        ...initialState,
        movies: [newMovie, movies[1]],
        actors,
      };

      expect(
        movieReducer({ ...initialState, movies, actors }, saveMovie(newMovie))
      ).toEqual(resultStore);
    });
  })
});
