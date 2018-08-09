import * as React from 'react';
import { Grid, Icon, SemanticWIDTHSNUMBER } from 'semantic-ui-react';
import withWidth from '../../../hocs/WithWidth';
import ClickableIcon from '../../common/ClickableIcon';
import LoadingIcon from '../../common/LoadingIcon';
import GalleryImage from '../../Gallery/GalleryImage';

interface IProps {
  uploadedStatuses: boolean[];
  acceptedImages: object[];
  children: React.ReactNode;
  isUploading: boolean;
  width?: number;
  removeFile: (fileIx: number) => void;
}

class AcceptedImagesContainner extends React.PureComponent<IProps, object> {
  renderIcon = (fileIx: number) => {
    const { uploadedStatuses, isUploading } = this.props;

    return uploadedStatuses[fileIx] ? (
      <Icon style={iconStyle} color="green" name="checkmark" size="large" />
    ) : isUploading ? (
      <LoadingIcon style={iconStyle} color="yellow" size="large" />
    ) : null;
  };

  renderRemove = (fileIx: number) => {
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
    let numItemsPerRow = Math.floor(width! / 220);
    if (numItemsPerRow < 1) {
      numItemsPerRow = 1;
    }
    const numRows = Math.ceil((acceptedImages.length + 1) / numItemsPerRow) as SemanticWIDTHSNUMBER;

    const columnWidth = width! / numItemsPerRow;

    return (
      <Grid columns={numRows} doubling={true} stackable={true} className="AcceptedImages">
        {acceptedImages.map((file: any, fileIx: number) => (
          <div key={file.preview} className="AcceptedImageContainer">
            <GalleryImage className="AcceptedImage" src={file.preview} width={columnWidth} />
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
