import * as React from 'react';
import { connect } from 'react-redux';

import { TextAreaProps } from '../../../node_modules/semantic-ui-react';
import { updateImage } from '../../actions';
import { toUploadFormat } from '../../lib/date';
import { Image } from '../../meta/types/Image';
import { ImagesApi } from '../../services';
import ImageHighlightDetails from './ImageHighlightDetails';

type Props = {
  setRenderInformation: any;
  image: Image;
  updateImage: any;
};

type State = {
  location?: string;
  description: string;
  saving: boolean;
  taken_on: string;
};

class ImageHighlightDetailsContainer extends React.PureComponent<Props, State> {
  state = {
    location: this.props.image.location,
    description: this.props.image.description || '',
    taken_on: toUploadFormat(this.props.image.taken_on!),
    saving: false,
  };

  setLocation = (location: string) => this.setState({ location });
  handleDescriptionChange = (e: React.FormEvent<HTMLTextAreaElement>, { value }: TextAreaProps) => {
    this.setState({ description: value as string });
  };

  handleDateSelection = (taken_on: Date) => this.setState({ taken_on: toUploadFormat(taken_on) });

  saveDetails = async (recognizeFaces: boolean) => {
    this.setState({ saving: true });

    const payload = !recognizeFaces
      ? {
          ...this.state,
          image_id: this.props.image.image_id,
        }
      : { processing_status: 'INITIAL', image_id: this.props.image.image_id };

    const resp = await ImagesApi.update(payload);
    this.setState({ saving: false });

    this.props.updateImage(resp);
  };

  render() {
    const { setRenderInformation, image } = this.props;
    const { saving, description } = this.state;

    const canTriggerFaceIdentifier = image.processing_status === 'USER_DISABLED';
    return (
      <ImageHighlightDetails
        image={image}
        setRenderInformation={setRenderInformation}
        setLocation={this.setLocation}
        saving={saving}
        saveDetails={this.saveDetails}
        description={description}
        handleDescriptionChange={this.handleDescriptionChange}
        canTriggerFaceIdentifier={canTriggerFaceIdentifier}
        handleDateSelection={this.handleDateSelection}
      />
    );
  }
}

const mapDispatchToProps = {
  updateImage,
};

export default connect(
  null,
  mapDispatchToProps,
)(ImageHighlightDetailsContainer);
