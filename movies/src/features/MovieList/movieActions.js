import {
  INCLIKE,
  DECLIKE,
  RECEIVE_MOVIES,
  SET_RATING,
  RECEIVE_ACTORS,
  DELETE_MOVIE,
  SAVE_MOVIE,
  SET_LOGGED_IN,
} from './types';

export const receiveMovies = (movies) => ({
  type: RECEIVE_MOVIES,
  payload: movies,
});

export const fetchMovies = () => {
  return (dispatch, state, api) => {
    return api('movies')
      .then(response => {
        dispatch(receiveMovies(response.data));
      });
  };
};

export const receiveActors = (actors) => ({
  type: RECEIVE_ACTORS,
  payload: actors,
});

export const fetchActors = () => {
  return (dispatch, state, api) => {
    return api('actors')
      .then(response => {
        dispatch(receiveActors(response.data));
      });
  };
};

export const incLike = (id) => ({
  type: INCLIKE,
  payload: id,
});

export const fetchIncLike = (id) => {
  return (dispatch, state, api) => {
    const movie = state().movies.movies.find(movie => movie.id === id);
    return api(`movies/${id}`, 'patch', { ...movie, likes: movie.likes + 1 })
      .then(response => {
        dispatch(incLike(response.data.id));
      });
  };
};

export const decLike = (id) => ({
  type: DECLIKE,
  payload: id,
});

export const fetchDecLike = (id) => {
  return (dispatch, state, api) => {
    const movie = state().movies.movies.find(movie => movie.id === id);
    return api(`movies/${id}`, 'patch', { ...movie, likes: movie.likes - 1 })
      .then(response => {
        dispatch(decLike(response.data.id));
      });
  };
};

export const setRating = (id, stars) => ({
  type: SET_RATING,
  payload: { id, stars },
});

export const fetchSetRating = (id, stars) => {
  return (dispatch, state, api) => {
    const movie = state().movies.movies.find(movie => movie.id === id);
    return api(`movies/${id}`, 'patch', { ...movie, stars })
      .then(() => {
        dispatch(setRating(id, stars));
      });
  };
};

export const deleteMovie = (id) => ({
  type: DELETE_MOVIE,
  payload: id,
});

export const fetchDeleteMovie = (id) => {
  return (dispatch, state, api) => {
    return api(`movies/${id}`, 'delete')
      .then(() => {
        dispatch(deleteMovie(id));
      });
  };
};

export const saveMovie = (movie) => ({
  type: SAVE_MOVIE,
  payload: movie,
});

export const fetchSaveMovie = (movie) => {
  return (dispatch, state, api) => {
    return api(`movies/${movie.id}`, 'patch', { ...movie })
      .then(() => {
        dispatch(saveMovie(movie));
      });
  };
};

