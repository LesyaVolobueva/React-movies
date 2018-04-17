import { combineReducers } from 'redux';
import movies from './features/MovieList/movieReducer';
import filter from './features/Filter/filterReducer';
import auth from './features/Auth/authReducer';
import { reducer as form } from 'redux-form';
import lang from './features/Nav/SwitchLanguage/langReducer';


export default combineReducers({
  lang,
  filter,
  auth,
  movies,
  form,
});
