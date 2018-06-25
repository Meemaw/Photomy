// @flow
import * as React from 'react';
import ProgressiveImage from '../../common/ProgressiveImage';
import styled from 'styled-components';
import { Image as SemanticImage, Ref } from 'semantic-ui-react';
import { onlyUpdateForKeys } from 'recompose';

const PLACEHOLDER = require('../../../images/gallery_placeholder.png');

type Props = {
  src: string,
  withPlaceholder: boolean,
  children: (string, boolean) => Node,
  rest: any,
  handleRef?: Function,
};

const GalleryImage = ({ src, withPlaceholder, children, handleRef, ...rest }: Props) => {
  return (
    <ProgressiveImage src={src} placeholder={PLACEHOLDER} withPlaceholder={withPlaceholder}>
      {(src, loading) => (
        <StyledImage
          {...rest}
          src={src}
          rounded
          style={{ objectFit: 'contain', ...rest.style }}
          handleRef={handleRef}
        />
      )}
    </ProgressiveImage>
  );
};

const ActualImage = ({ handleRef, ...props }) => (
  <Ref innerRef={handleRef}>
    <SemanticImage {...props} />
  </Ref>
);

const StyledImage = styled(ActualImage)`
  width: ${props => props.width || '220px'};
  height: ${props => props.height || '220px'};

  :hover {
    cursor: ${props => (props.onClick ? 'pointer' : '')};
  }
`;

export default onlyUpdateForKeys(['src'])(GalleryImage);
