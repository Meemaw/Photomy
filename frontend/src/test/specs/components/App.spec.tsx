import { expect } from 'chai';
import { shallow } from 'enzyme';
import * as React from 'react';

import { App } from '../../../components/App';

jest.mock('react-ga');

describe('App', () => {
  it('renders', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find('.App')).to.have.length(1);
  });
});
