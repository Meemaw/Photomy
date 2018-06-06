// @flow
import React from 'react';
import Gallery from '../Gallery';
import { Checkbox } from 'semantic-ui-react';
import type { Image } from '../../meta/types/Image';

type Props = { imageReviews: Array<Image>, setImageReviews: (Array<Image>) => void };
type State = {};

class ImageReview extends React.Component<Props, State> {
  renderImage = (image: Image) => {
    const { imageReviews, setImageReviews } = this.props;
    return (
      <div>
        <Gallery.Image src={image.preview_url} />
        <Checkbox
          onClick={() => {
            setImageReviews(
              imageReviews.map(
                im =>
                  im.identity_match_id === image.identity_match_id
                    ? { ...im, confirmed: !im.confirmed }
                    : im,
              ),
            );
          }}
          checked={image.confirmed}
          style={{
            position: 'absolute',
            top: '0px',
            marginTop: '14px',
            zIndex: 100,
          }}
        />
      </div>
    );
  };

  render() {
    const { imageReviews } = this.props;
    return (
      <Gallery.Section images={imageReviews} withDivider={false} renderImage={this.renderImage} />
    );
  }
}

export default ImageReview;
