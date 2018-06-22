import React from 'react';
import ActionableSpan from '../../../components/common/ActionableSpan';
import ClickableSpan from '../../../components/common/ClickableSpan';
import LoadingIcon from '../../../components/common/LoadingIcon';
import { shallow } from 'enzyme';

describe('ActionableSpan', () => {
  it('renders', () => {
    const wrapper = shallow(<ActionableSpan />);
    expect(wrapper.find(ClickableSpan)).to.have.length(1);
  });

  it('renders loading icon', () => {
    const wrapper = shallow(<ActionableSpan actionLoading={true} />);
    expect(wrapper.find(LoadingIcon)).to.have.length(1);
  });
});
