import React from 'react';
import SavableInput from '../../../components/common/SavableInput';
import { Button, Input } from 'semantic-ui-react';
import { mount } from 'enzyme';
import { sandbox } from '../../utils';
import { simulateChange, simulateEnter, simulateClick } from '../../utils/simulate';

const NEW_IDENTITY = 'Test123';

const props = {
  initialValue: 'Matej',
};

describe('SetNameModel', () => {
  it('Calls handleEmpty on enter press', () => {
    const handleEmpty = sandbox.spy();
    const wrapper = mount(<SavableInput handleEmpty={handleEmpty} />);

    simulateEnter(wrapper.find('input'));
    expect(handleEmpty).to.have.been.calledOnce();
  });

  it('Renders error when empty value', () => {
    const wrapper = mount(<SavableInput />);

    expect(wrapper.find(Input).props().error).to.equal(false);

    simulateEnter(wrapper.find('input'));
    expect(wrapper.find(Input).props().error).to.equal(true);

    simulateChange(wrapper.find('input'), NEW_IDENTITY);
    expect(wrapper.find(Input).props().error).to.equal(false);
  });

  it('Calls saveIdentity with new identity on button click', () => {
    const saveIdentity = sandbox.spy(() => Promise.resolve());
    const wrapper = mount(<SavableInput {...props} saveValue={saveIdentity} />);
    expect(wrapper.find('input').props().value).to.equal(props.initialValue);

    simulateChange(wrapper.find('input'), NEW_IDENTITY);
    expect(wrapper.find('input').props().value).to.equal(NEW_IDENTITY);

    simulateClick(wrapper.find(Button));

    expect(saveIdentity).to.have.been.calledOnce();
    expect(saveIdentity).to.have.been.calledWith(NEW_IDENTITY);
  });
});
