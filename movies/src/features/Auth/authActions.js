import {
  LOGIN,
  SIGNUP,
  LOGOUT,
} from './types';

export const login = (state) => ({
  type: LOGIN,
  payload: state,
});

export const getUser = (userName) => {
  return (dispatch, state, api) => {
    return api(`users?name=${userName}`)
      .then(response => {
        response.data[0]
          ? dispatch(login(response.data[0]))
          : dispatch(login({}));
      });
  };
};

export const signUp = (state) => ({
  type: SIGNUP,
  payload: state,
});

export const createUser = (user) => {
  return (dispatch, state, api) => {
    return api('users', 'post', { name: user.name, password: user.password })
      .then(response => {
        dispatch(signUp(response.data));
      });
  };
};

export const logout = (state) => ({
  type: LOGOUT,
  payload: state,
});
