// @flow
import * as React from 'react';
import Gallery from '../../Gallery';
import ClickableSpan from '../../common/ClickableSpan';
import type { Image } from '../../../meta/types/Image';
import { peoplePath } from '../../../lib/paths';

type Props = {
  push: string => void,
  images: Array<Image>,
  count: number,
  updatedAt: ?Date,
  withDivider: boolean,
};

type State = {};

class People extends React.Component<Props, State> {
  static defaultProps = {
    withDivider: true,
    images: [],
  };

  handleImageClick = (image: Image) => this.props.push(`${peoplePath}/${image.identity_group_id}`);

  renderImage = (image: Image) => {
    return (
      <React.Fragment>
        <Gallery.Image
          image={image}
          onClick={() => this.handleImageClick(image)}
          height="100%"
          width="100%"
          style={{ objectFit: 'cover' }}
        />
        {image.image_identity && (
          <ClickableSpan
            onClick={() => this.handleImageClick(image)}
            style={{
              position: 'absolute',
              fontSize: '0.8rem',
              bottom: '0px',
              color: 'white',
              padding: '4px',
              zIndex: 100,
              background: 'linear-gradient(rgba(0, 0, 0, .2), rgba(0,0,0,2))',
            }}
          >
            {image.image_identity}
          </ClickableSpan>
        )}
      </React.Fragment>
    );
  };

  render() {
    const { count, images, updatedAt, withDivider } = this.props;

    return (
      <React.Fragment>
        <Gallery.Section
          sectionHeader="People"
          withDivider={withDivider}
          images={images}
          isSticky={false}
          renderImage={this.renderImage}
        />

        <Gallery.FooterInfo count={count} updatedAt={updatedAt} ofWhat="People" />
      </React.Fragment>
    );
  }
}

export default People;
