import React from 'react';
import IdentityTabContainer from '../../../components/IdentityTab';
import SavableTab from '../../../components/common/SavableTab';
import configureStore from '../../../stores';
import LoadingIcon from '../../../components/common/LoadingIcon';
import SavableInput from '../../../components/common/SavableInput';
import { mount, shallow } from 'enzyme';

const IDENTITY = { identity: 'Matej' };

describe('IdentityTab', () => {
  it('Renders set a name when no identityName', () => {
    const wrapper = shallow(<SavableTab loading={false} />);
    expect(wrapper.children().text()).to.equal('Set a name');
  });

  it('Renders loading icon when no identity', () => {
    const wrapper = mount(<IdentityTabContainer store={configureStore()} />);
    expect(wrapper.find(LoadingIcon)).to.have.length(1);
  });

  it('Renders SavableInput on identity click', () => {
    const wrapper = mount(<IdentityTabContainer store={configureStore()} identity={IDENTITY} />);

    const clickableSpan = wrapper.find('ClickableSpan');
    expect(clickableSpan).to.have.length(1);
    expect(clickableSpan.children().text()).to.equal(IDENTITY.identity);

    clickableSpan.simulate('click');
    expect(wrapper.find('ClickableSpan')).to.have.length(0);
    expect(wrapper.find(SavableInput)).to.have.length(1);
  });
});
