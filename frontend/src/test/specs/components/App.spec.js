import React from 'react';
import App from '../../../components/App';
import { shallow } from 'enzyme';

jest.mock('react-ga');

describe('App', () => {
  it('renders', () => {
    shallow(<App />);
  });
});
