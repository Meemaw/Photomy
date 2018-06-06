// @flow
import * as React from 'react';
import BaseModal from '../common/BaseModal';
import ClickableSpan from '../common/ClickableSpan';
import ImageReview from '../ImageReview';
import type { Image } from '../../meta/types/Image';
import { Divider, Modal, Button } from 'semantic-ui-react';
import { IdentityMatchApi } from '../../services';

type Props = {
  unreviewedImages: Array<Image>,
  addConfirmations: (Array<Image>) => void,
  identity: Object,
};
type State = { imageReviews: Array<Image>, loading: boolean };

class ImageReviewModal extends React.PureComponent<Props, State> {
  state = {
    imageReviews: this.props.unreviewedImages.map(image => ({
      ...image,
      confirmed: true,
    })),
    loading: false,
  };

  static getDerivedStateFromProps(nextProps: Props, prevState: State) {
    if (nextProps.unreviewedImages.length !== prevState.imageReviews.length) {
      const newImages = nextProps.unreviewedImages.map(image => ({
        ...image,
        confirmed: true,
      }));
      return { imageReviews: newImages };
    }
    return null;
  }

  setImageReviews = (imageReviews: Array<Image>) => this.setState({ imageReviews });

  renderTrigger = (handleOpen: void => void) => {
    return (
      <div style={{ textAlign: 'center' }}>
        <ClickableSpan onClick={handleOpen} fontWeight={500}>
          Confirm additional photos
        </ClickableSpan>
        <Divider />
      </div>
    );
  };

  reviewImages = async (imageReviews: Array<Image>, handleClose: void => void) => {
    const confirmed = imageReviews.filter(image => image.confirmed);

    const rejected = imageReviews.filter(image => !image.confirmed);
    this.setState({ loading: true });

    await Promise.all(
      confirmed.map(async confirmedImage => IdentityMatchApi.patch(confirmedImage)),
    );

    this.setState({ loading: false });

    await Promise.all(
      rejected.map(async rejectedImage =>
        IdentityMatchApi.reject({ identity_match_id: rejectedImage.identity_match_id }),
      ),
    );

    this.props.addConfirmations(confirmed);
  };

  render() {
    const { identity } = this.props;
    const { imageReviews, loading } = this.state;

    const modalHeader = identity.identity
      ? `Is this ${identity.identity} on the photos?`
      : 'Confirm photos';

    return (
      <BaseModal size="large" trigger={this.renderTrigger}>
        {handleClose => (
          <React.Fragment>
            <Modal.Header style={{ fontSize: '0.9rem' }}>{modalHeader}</Modal.Header>
            <Modal.Content>
              <ImageReview imageReviews={imageReviews} setImageReviews={this.setImageReviews} />
            </Modal.Content>
            <Modal.Actions>
              <Button
                loading={loading}
                content="Confirm"
                icon="checkmark"
                color="green"
                onClick={() => this.reviewImages(imageReviews, handleClose)}
              />
            </Modal.Actions>
          </React.Fragment>
        )}
      </BaseModal>
    );
  }
}

export default ImageReviewModal;
