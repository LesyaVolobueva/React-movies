import React from 'react';
import { shallow } from 'enzyme';

import Button from './Button';

describe('-- Button --', () => {
  it('renderes correctly', () => {
    const wrapper = shallow(
      <Button/>
    );

    expect(wrapper).toMatchSnapshot();
  })
});
