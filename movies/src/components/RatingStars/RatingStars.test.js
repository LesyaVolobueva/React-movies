import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';

import RatingStars from './RatingStars';

Enzyme.configure({ adapter: new Adapter() });

describe('-- RatingStars --', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <MemoryRouter>
          <RatingStars setRating={() => {}}/>
        </MemoryRouter>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('setRating function is called on submit', () => {
    const mockedFunc = jest.fn();

    const wrapper = mount(
      <MemoryRouter>
        <RatingStars setRating={mockedFunc}/>
      </MemoryRouter>
    );

    expect(mockedFunc.mock.calls.length).toBe(0);

    wrapper.find('label').first().simulate('click');

    expect(mockedFunc.mock.calls.length).toBe(1);
  });
});
