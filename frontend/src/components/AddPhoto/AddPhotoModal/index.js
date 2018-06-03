// @flow
import React from 'react';
import BaseModal from '../../common/BaseModal';
import AddPhoto from '../AddPhoto';
import { Button, Modal } from 'semantic-ui-react';
import { withWidth } from '../../../hocs';

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

type Props = { width: number };
type State = {};

class AddPhotoModal extends React.Component<Props, State> {
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
    return (
      <BaseModal size="large" trigger={this.renderTrigger} closeOnDimmerClick={false}>
        {handleClose => (
          <Modal.Content>
            <AddPhoto handleClose={handleClose} />
          </Modal.Content>
        )}
      </BaseModal>
    );
  }
}

export default withWidth(AddPhotoModal);
