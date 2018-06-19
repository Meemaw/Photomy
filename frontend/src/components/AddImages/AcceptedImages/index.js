// @flow
import React from 'react';
import GalleryImage from '../../Gallery/GalleryImage';
import withWidth from '../../../hocs/WithWidth';
import LoadingIcon from '../../common/LoadingIcon';
import ClickableIcon from '../../common/ClickableIcon';
import { Grid, Icon } from 'semantic-ui-react';

type Props = {
  uploadedStatuses: Array<boolean>,
  acceptedImages: Array<Object>,
  children: any,
  isUploading: boolean,
  width: number,
  removeFile: Function,
};
type State = {};

class AcceptedImagesContainner extends React.PureComponent<Props, State> {
  renderIcon = (fileIx: number) => {
    const { uploadedStatuses, isUploading } = this.props;

    return uploadedStatuses[fileIx] ? (
      <Icon style={iconStyle} color="green" name="checkmark" size="large" />
    ) : isUploading ? (
      <LoadingIcon style={iconStyle} color="yellow" size="large" />
    ) : null;
  };

  renderRemove = fileIx => {
    const { removeFile, uploadedStatuses } = this.props;
    return (
      !uploadedStatuses[fileIx] && (
        <ClickableIcon
          name="remove"
          style={{ position: 'absolute', top: '5px', right: '5px' }}
          onClick={() => removeFile(fileIx)}
        />
      )
    );
  };

  render() {
    const { width, acceptedImages, children } = this.props;
    let num_items_per_row = Math.floor(width / 220);
    if (num_items_per_row < 1) {
      num_items_per_row = 1;
    }
    const num_rows = Math.ceil((acceptedImages.length + 1) / num_items_per_row);
    const columnWidth = width / num_items_per_row;

    return (
      <Grid columns={num_rows} doubling stackable style={{ width: '100%', margin: '0px' }}>
        {acceptedImages.map((file, fileIx) => (
          <div
            style={{
              position: 'relative',
              background: '#f6f7f9',
              margin: '5px',
              padding: '25px 0px 25px 0px',
            }}
            key={file.preview}
          >
            <GalleryImage src={file.preview} width={columnWidth} />
            {this.renderIcon(fileIx)}
            {this.renderRemove(fileIx)}
          </div>
        ))}
        {children}
      </Grid>
    );
  }
}

const iconStyle = {
  display: 'flex',
  zIndex: '10',
  width: '100%',
  height: '100%',
  position: 'absolute',
  justifyContent: 'center',
  alignItems: 'center',
  top: '0px',
};

export default withWidth(AcceptedImagesContainner);
