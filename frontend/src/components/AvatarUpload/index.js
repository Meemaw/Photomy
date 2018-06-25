import * as React from 'react';
import Dropzone from '../common/Dropzone';
import GalleryImage from '../Gallery/GalleryImage';
import ActionButton from '../common/ActionButton';
import { setAuthUser } from '../../actions';
import { connect } from 'react-redux';
import { ImagesApi } from '../../services';

class AvatarUpload extends React.Component {
  state = { uploading: false };

  handleAcceptedFiles = async (accepted: Array<File>) => {
    const { setAuthUser, authUser } = this.props;
    const file = accepted[0];
    this.setState({ uploading: true });

    const resp = await ImagesApi.upload_image_file({ file, avatar: true }, true);
    setAuthUser({ ...authUser, avatar: resp.image_url });
    this.setState({ uploading: false });
  };

  renderDropzone = () => {
    const { uploading } = this.state;
    return <ActionButton icon="upload" content="Upload new avatar" loading={uploading} />;
  };

  render() {
    const {
      authUser: { avatar },
    } = this.props;
    const { uploading } = this.state;

    return (
      <React.Fragment>
        {!uploading && <GalleryImage src={avatar} style={{ marginBottom: '10px' }} />}

        <Dropzone
          multiple={false}
          handleAcceptedFiles={this.handleAcceptedFiles}
          renderDropzone={this.renderDropzone}
        />
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = {
  setAuthUser,
};

export default connect(
  null,
  mapDispatchToProps,
)(AvatarUpload);
