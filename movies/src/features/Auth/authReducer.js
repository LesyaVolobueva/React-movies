import {
  LOGIN,
  SIGNUP,
  LOGOUT,
} from './types';

const initialState = {
  user: {},
};

export default function loginReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN:

      localStorage.setItem(
        'active',
        action.payload.name
      );
      return {
        ...state,
        user: action.payload,
      };

    case SIGNUP:
      localStorage.setItem(
        'active',
        action.payload.name
      );
      return {
        ...state,
        user: action.payload,
      };

    case LOGOUT:
      localStorage.removeItem('active');
      return {
        ...state,
        user: {},
      };

    default:
      return state;
  }
}
