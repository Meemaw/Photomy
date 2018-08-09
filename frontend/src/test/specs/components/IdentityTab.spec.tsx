import { mount, shallow } from 'enzyme';
import * as React from 'react';

import LoadingIcon from '../../../components/common/LoadingIcon';
import SavableInput from '../../../components/common/SavableInput';
import SavableTab from '../../../components/common/SavableTab';
import IdentityTabContainer from '../../../components/IdentityTab';
import configureStore from '../../../store';
import { TEST_IDENTITY } from '../../data/identity';

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
    const wrapper = mount(
      <IdentityTabContainer store={configureStore()} identity={TEST_IDENTITY} />,
    );

    const clickableSpan = wrapper.find('ClickableSpan');
    expect(clickableSpan).to.have.length(1);
    expect(clickableSpan.children().text()).to.equal(TEST_IDENTITY.identity);

    clickableSpan.simulate('click');
    expect(wrapper.find('ClickableSpan')).to.have.length(0);
    expect(wrapper.find(SavableInput)).to.have.length(1);
  });
});
