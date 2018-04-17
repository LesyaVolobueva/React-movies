import {
  SEARCH_BY_NAME,
  SORT_BY_LIKES,
  SORT_BY_RATING,
} from './types';

export const searchByName = (value) => ({
  type: SEARCH_BY_NAME,
  payload: value,
});

export const sortByLikes = () => ({
  type: SORT_BY_LIKES,
});

export const sortByRating = () => ({
  type: SORT_BY_RATING,
});
