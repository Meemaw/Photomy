import * as React from 'react';

import { peoplePath } from '../../../constants/paths';
import { ImageIdentityMatch } from '../../../meta/types/ImageIdentityMatch';
import ClickableSpan from '../../common/ClickableSpan';
import Gallery from '../../Gallery';

type Props = {
  push: any;
  images: ImageIdentityMatch[];
  count: number;
  updatedAt?: Date;
  withDivider?: boolean;
};

class People extends React.Component<Props, object> {
  static defaultProps = {
    withDivider: true,
    images: [],
  };

  handleImageClick = (image: ImageIdentityMatch) =>
    this.props.push(`${peoplePath}/${image.identity_group_id}`);

  renderImage = (image: ImageIdentityMatch) => {
    return (
      <div style={{ position: 'relative', width: '100%' }}>
        <Gallery.Image
          src={image.preview_url}
          onClick={() => this.handleImageClick(image)}
          height="auto"
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
      </div>
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
