// @flow
import * as React from 'react';
import ProgressiveImage from '../../common/ProgressiveImage';
import styled from 'styled-components';
import type { Image } from '../../../meta/types/Image';
import { Image as SemanticImage } from 'semantic-ui-react';
import { onlyUpdateForKeys } from 'recompose';
const PLACEHOLDER = require('../../../images/gallery_placeholder.png');

type Props = {
  image: Image,
  withPlaceholder: boolean,
  children: (string, boolean) => Node,
  rest: any,
};

const GalleryImage = ({ image, withPlaceholder, children, ...rest }: Props) => {
  return (
    <ProgressiveImage
      src={image.image_url}
      placeholder={PLACEHOLDER}
      withPlaceholder={withPlaceholder}
    >
      {(src, loading) => (
        <StyledImage {...rest} src={src} rounded style={{ objectFit: 'contain', ...rest.style }} />
      )}
    </ProgressiveImage>
  );
};

const StyledImage = styled(SemanticImage)`
  width: ${props => props.width || '220px'};
  height: ${props => props.height || '220px'};

  :hover {
    cursor: ${props => (props.onClick ? 'pointer' : '')};
  }
`;

export default onlyUpdateForKeys(['image'])(GalleryImage);
