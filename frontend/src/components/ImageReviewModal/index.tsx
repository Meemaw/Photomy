import * as React from 'react';
import { Button, Divider, Modal } from 'semantic-ui-react';

import { SpanClick } from '../../meta/types/Function';
import { Identity } from '../../meta/types/Identity';
import { ImageIdentityMatch } from '../../meta/types/ImageIdentityMatch';
import { IdentityMatchApi } from '../../services';
import BaseModal from '../common/BaseModal';
import ClickableSpan from '../common/ClickableSpan';
import ImageReview from '../ImageReview';

type Props = {
  unreviewedImages: ImageIdentityMatch[];
  addConfirmations: (imageMatches: ImageIdentityMatch[]) => void;
  identity: Identity;
};

type State = { imageReviews: ImageIdentityMatch[]; loading: boolean };

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

  setImageReviews = (imageReviews: ImageIdentityMatch[]) => this.setState({ imageReviews });

  renderTrigger = (handleOpen: SpanClick) => {
    return (
      <div style={{ textAlign: 'center' }}>
        <ClickableSpan onClick={handleOpen} fontWeight={500}>
          Confirm additional photos
        </ClickableSpan>
        <Divider />
      </div>
    );
  };

  reviewImages = async (imageReviews: ImageIdentityMatch[], _: any) => {
    const confirmed = imageReviews.filter(image => image.confirmed);

    const rejected = imageReviews.filter(image => !image.confirmed);
    this.setState({ loading: true });

    await Promise.all(
      confirmed.map(async confirmedImage => IdentityMatchApi.patch(confirmedImage)),
    );

    this.setState({ loading: false });

    await Promise.all(
      rejected.map(async rejectedImage =>
        IdentityMatchApi.reject({
          identity_match_id: rejectedImage.identity_match_id,
        }),
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
