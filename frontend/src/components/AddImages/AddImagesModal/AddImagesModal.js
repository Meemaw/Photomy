// @flow
import * as React from 'react';
import BaseModal from '../../common/BaseModal';
import Loadable from '../../common/Loadable';

import { Button } from 'semantic-ui-react';

const AsyncAddImages = Loadable({
  loader: () => import('../AddImages'),
});

type Props = { uploadImages: Function, width: number, userId: string, push: Function };

type State = {};

class AddImagesModal extends React.PureComponent<Props, State> {
  renderTrigger = (handleOpen: void => void) => {
    const { width } = this.props;
    return (
      <div style={docsButtonStyle}>
        <Button
          color="green"
          content={width > 450 ? 'Add Photo' : null}
          icon="plus"
          onClick={handleOpen}
          style={buttonStyle}
        />
      </div>
    );
  };

  render() {
    const { uploadImages, userId, push } = this.props;
    return (
      <BaseModal size="fullscreen" trigger={this.renderTrigger} closeOnDimmerClick={false}>
        {handleClose => (
          <AsyncAddImages
            handleClose={handleClose}
            uploadImages={uploadImages}
            userId={userId}
            push={push}
          />
        )}
      </BaseModal>
    );
  }
}

const docsButtonStyle = {
  position: 'fixed',
  margin: '2em',
  bottom: 0,
  right: 0,
  zIndex: 6,
};

const buttonStyle = {
  boxShadow: '0px 8px 15px rgba(0, 0, 0, 0.1)',
  borderRadius: '16px',
};

export default AddImagesModal;
