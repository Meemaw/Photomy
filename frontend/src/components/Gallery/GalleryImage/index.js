// @flow
import * as React from 'react';
import ProgressiveImage from '../../common/ProgressiveImage';
import styled from 'styled-components';
import { Image as SemanticImage } from 'semantic-ui-react';
import { onlyUpdateForKeys } from 'recompose';

const PLACEHOLDER = require('../../../images/gallery_placeholder.png');

type Props = {
  src: string,
  withPlaceholder: boolean,
  children: (string, boolean) => Node,
  rest: any,
};

const GalleryImage = ({ src, withPlaceholder, children, ...rest }: Props) => {
  return (
    <ProgressiveImage src={src} placeholder={PLACEHOLDER} withPlaceholder={withPlaceholder}>
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

export default onlyUpdateForKeys(['src'])(GalleryImage);
