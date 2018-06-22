import React from 'react';
import ActionButton from '../../../components/common/ActionButton';
import { shallow } from 'enzyme';
import { sandbox } from '../../utils';

describe('ActionButton', () => {
  it('renders', () => {
    const wrapper = shallow(<ActionButton />);
    expect(wrapper.props().type).to.equal('submit');
    expect(wrapper.props().role).to.equal('button');
  });

  it('passes onClick when not loading or disabled', () => {
    const onClick = sandbox.spy();
    const wrapper = shallow(<ActionButton onClick={onClick} />);
    wrapper.simulate('click');
    expect(onClick).to.have.been.calledOnce();
  });

  it('prevents onClick when loading', () => {
    const onClick = sandbox.spy();
    const wrapper = shallow(<ActionButton onClick={onClick} loading={true} />);
    wrapper.simulate('click');
    expect(wrapper.props().onClick).to.equal(null);
    expect(onClick).to.have.been.callCount(0);
  });

  it('prevents onClick when disabled', () => {
    const onClick = sandbox.spy();
    const wrapper = shallow(<ActionButton onClick={onClick} disabled={true} />);
    wrapper.simulate('click');
    expect(wrapper.props().onClick).to.equal(null);
    expect(onClick).to.have.been.callCount(0);
  });
});
