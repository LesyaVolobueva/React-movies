import {
  INCLIKE,
  DECLIKE,
  RECEIVE_MOVIES,
  SET_RATING,
  RECEIVE_ACTORS,
  DELETE_MOVIE,
  SAVE_MOVIE,
  // SET_LOGGED_IN,
} from './types';

export const initialState = {
  movies: [],
  actors: [],
};

export default function movieReducer(state = initialState, action) {
  switch (action.type) {
    case RECEIVE_MOVIES:

      return {
        ...state,
        movies: action.payload,
      };

    case RECEIVE_ACTORS:
      return {
        ...state,
        actors: action.payload,
      };


    case INCLIKE:
      return {
        ...state,
        movies: state.movies.map(movie => movie.id === action.payload
          ? { ...movie, likes: movie.likes + 1 }
          : movie
        ),
      };

    case DECLIKE:
      return {
        ...state,
        movies: state.movies.map(movie => movie.id === action.payload
          ? { ...movie, likes: movie.likes - 1 }
          : movie
        ),
      };

    case SET_RATING:
      return {
        ...state,
        movies: state.movies.map(movie => movie.id === action.payload.id
          ? { ...movie, stars: action.payload.stars }
          : movie
        ),
      };

    case DELETE_MOVIE:
      return {
        ...state,
        movies: [...state.movies].filter(movie => movie.id !== action.payload),
      };

    case SAVE_MOVIE:
      return {
        ...state,
        movies: [...state.movies].map(movie => {
          if (movie.id === action.payload.id) {
            return action.payload;
          }
          return movie;
        }),
      };

    // case SET_LOGGED_IN:
    //   return {
    //     ...state,
    //     isLoggedIn: action.payload,
    //   };


    default:
      return state;
  }
}
