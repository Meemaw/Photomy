import { mount, shallow } from 'enzyme';
import * as React from 'react';

import BaseModal from '../../../components/common/BaseModal';

describe('BaseModal', () => {
  it('renders closed', () => {
    const wrapper = shallow(<BaseModal />);
    expect(wrapper.state().open).to.equal(false);
  });

  it('Opens on trigger click', () => {
    const wrapper = mount(<BaseModal />);

    wrapper
      .children()
      .first()
      .simulate('click');

    expect(wrapper.state().open).to.equal(true);
  });
});
