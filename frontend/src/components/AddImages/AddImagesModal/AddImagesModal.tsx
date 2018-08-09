import * as React from 'react';
import { Button } from 'semantic-ui-react';

import { UploadImages } from '../../../actions/gallery';
import { RoutePusher, WidthMeasured } from '../../../meta/types/Interfaces';
import BaseModal from '../../common/BaseModal';
import AddImages from '../AddImages';

export interface Props extends RoutePusher {
  uploadImages: UploadImages;
}

interface IProps extends Props, WidthMeasured {
  userId: string;
}

class AddImagesModal extends React.PureComponent<IProps, object> {
  renderTrigger = (handleOpen: (e: React.SyntheticEvent<any>) => void) => {
    return (
      <div style={docsButtonStyle}>
        <Button
          color="green"
          content={this.props.width > 450 ? 'Add Photo' : null}
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
          <AddImages
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
  position: 'fixed' as 'fixed',
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
