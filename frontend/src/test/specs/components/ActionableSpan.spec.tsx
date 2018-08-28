import { expect } from 'chai';
import { shallow } from 'enzyme';
import * as React from 'react';

import ActionableSpan from '../../../components/common/ActionableSpan';
import ClickableSpan from '../../../components/common/ClickableSpan';
import LoadingIcon from '../../../components/common/LoadingIcon';

const baseProps = {
  handleClick: () => undefined,
  content: '',
  actionLoading: false,
};

describe('ActionableSpan', () => {
  it('renders', () => {
    const wrapper = shallow(<ActionableSpan {...baseProps} />);
    expect(wrapper.find(ClickableSpan)).to.have.length(1);
  });

  it('renders loading icon', () => {
    const wrapper = shallow(<ActionableSpan {...baseProps} actionLoading={true} />);
    expect(wrapper.find(LoadingIcon)).to.have.length(1);
  });
});
