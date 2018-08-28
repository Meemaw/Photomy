import { expect } from 'chai';
import { shallow } from 'enzyme';
import * as React from 'react';

import ActionButton from '../../../components/common/ActionButton';
import { sandbox } from '../../utils';

const baseProps = {
  content: '',
};

describe('ActionButton', () => {
  it('renders', () => {
    const wrapper = shallow(<ActionButton {...baseProps} />);
    expect(wrapper.props().type).to.equal('submit');
    expect(wrapper.props().role).to.equal('button');
  });

  it('passes onClick when not loading or disabled', () => {
    const onClick = sandbox.spy();
    const wrapper = shallow(<ActionButton {...baseProps} onClick={onClick} />);
    wrapper.simulate('click');
    expect(onClick).to.have.been.calledOnce();
  });

  it('prevents onClick when loading', () => {
    const onClick = sandbox.spy();
    const wrapper = shallow(<ActionButton {...baseProps} onClick={onClick} loading={true} />);
    wrapper.simulate('click');
    expect(wrapper.props().onClick).to.equal(undefined);
    expect(onClick).to.have.been.callCount(0);
  });

  it('prevents onClick when disabled', () => {
    const onClick = sandbox.spy();
    const wrapper = shallow(<ActionButton {...baseProps} onClick={onClick} disabled={true} />);
    wrapper.simulate('click');
    expect(wrapper.props().onClick).to.equal(undefined);
    expect(onClick).to.have.been.callCount(0);
  });
});
