import { mount, shallow } from 'enzyme';
import * as React from 'react';
import { Icon } from 'semantic-ui-react';

import Dropzone from '../../../components/common/Dropzone';
import { assertWithTimeout, sandbox } from '../../utils';

const IMAGES = [
  {
    name: 'cats.gif',
    size: 1234,
    type: 'image/gif',
  },
  {
    name: 'dogs.jpg',
    size: 2345,
    type: 'image/jpeg',
  },
];

const ERROR_FILES = [
  {
    name: 'cats.txt',
    size: 1234,
    type: 'txt',
  },
];

describe('Dropzone', () => {
  it('renders with correct props', () => {
    const wrapper = shallow(<Dropzone />);
    expect(wrapper.find(Icon)).to.have.length(1);
    expect(wrapper.props().multiple).to.equal(true);
    expect(wrapper.props().accept).to.equal('image/jpeg, image/png, image/jpg');
  });

  it('renders custom dropzone', () => {
    const wrapper = shallow(
      <Dropzone renderDropzone={() => <div className="CustomDropzone">Hola</div>} />,
    );
    expect(wrapper.find('.CustomDropzone')).to.have.length(1);
  });

  it('calls handleAcceptedFiles onDrop', done => {
    const handleAcceptedFiles = sandbox.spy();
    const wrapper = mount(<Dropzone handleAcceptedFiles={handleAcceptedFiles} multiple={false} />);

    wrapper.simulate('drop', { dataTransfer: { files: IMAGES } });

    assertWithTimeout(() => expect(handleAcceptedFiles).to.have.been.calledOnce(), done);
  });

  it('Displays error on invalid type', done => {
    const handleAcceptedFiles = sandbox.spy();
    const wrapper = mount(<Dropzone handleAcceptedFiles={handleAcceptedFiles} />);

    wrapper.simulate('drop', { dataTransfer: { files: ERROR_FILES } });

    assertWithTimeout(() => expect(handleAcceptedFiles).to.have.been.callCount(0), done);
  });
});
