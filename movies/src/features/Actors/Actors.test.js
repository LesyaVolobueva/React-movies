import React from 'react';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

import Actors from './Actors';

jest.mock('../Nav/Nav', () => 'Nav');
jest.mock('../Header/Header', () => 'Header');

const actor = {
  "id": 28,
  "name": "Meat Loaf",
  "imgUrl": "https://images-na.ssl-images-amazon.com/images/M/MV5BMTIzNTQ4MjYyOV5BMl5BanBnXkFtZTcwNzgwNTEzMg@@._V1_UY317_CR6,0,214,317_AL_.jpg",
  "biography": "Lorem"
};

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

const match = {
  params: {
    id: '28',
  },
};


describe('-- Actors --', () => {
  it('renders correctly', () => {

    const mockStore = configureStore();
    const store = {
      lang: {
        lang: 'en',
      },
      movies: {
        actors: [actor],
      },
    };

    const props = {
      match,
    };


    const tree = renderer
      .create(
        <MemoryRouter>
          <Provider store={mockStore(store)}>
            <Actors {...props}/>
          </Provider>
        </MemoryRouter>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
