import React from 'react';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';
import { mount } from 'enzyme';
import configureStore from 'redux-mock-store';

import { Header } from './Header';

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

describe('-- Header --', () => {
  let mockStore;
  let store;

  beforeEach(() => {
    mockStore = configureStore();
    store = {
      lang: {
        lang: 'en',
      },
      movies: {
        actors: [],
        movies: [],
      },
      auth: {
        user: {},
        logout: jest.fn(),
      }
    };
  });


  it('renders correctly', () => {
    const tree = renderer
      .create(
        <MemoryRouter>
            <Header
              lang={lang}
            />
        </MemoryRouter>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('Logout function is called on button click', () => {
    const mockedFunc = jest.fn();
    const props = {
      logout: jest.fn(),
      lang,
      user: {},
    };

    const wrapper = mount(
      <MemoryRouter>
        <Header {...props}/>
      </MemoryRouter>
    );

    expect(props.logout.mock.calls.length).toBe(0);

    wrapper.find('button').simulate('click');

    expect(props.logout.mock.calls.length).toBe(1);
  });
});
