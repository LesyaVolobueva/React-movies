import {
  SEARCH_BY_NAME,
  SORT_BY_LIKES,
  SORT_BY_RATING,
} from './types';

const initialState = {
  searchValue: '',
  isSortedByLikes: false,
  isSortedByRating: false,
};

export default function filterReducer(state = initialState, action) {
  switch (action.type) {
    case SEARCH_BY_NAME:
      return {
        ...state,
        searchValue: action.payload,
      };

    case SORT_BY_LIKES:
      return {
        ...state,
        isSortedByLikes: true,
        isSortedByRating: false,
      };

    case SORT_BY_RATING:
      return {
        ...state,
        isSortedByLikes: false,
        isSortedByRating: true,
      };

    default:
      return state;
  }
}
