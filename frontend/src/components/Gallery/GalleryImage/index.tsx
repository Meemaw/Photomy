import * as React from 'react';
import { onlyUpdateForKeys } from 'recompose';
import { Image as SemanticImage, Ref } from 'semantic-ui-react';
import styled from 'styled-components';

import ProgressiveImage from '../../common/ProgressiveImage';

const PLACEHOLDER = require('../../../images/gallery_placeholder.png');

type Props = {
  src: string | null;
  withPlaceholder?: boolean;
  handleRef?: any;
  style?: any;
  onClick?: any;
  height?: string;
  width?: string | number;
  className?: string;
  rounded?: boolean;
};

const GalleryImage = ({
  src: imageSrc,
  withPlaceholder = true,
  handleRef,
  style,
  onClick,
  height,
  width,
  className,
  rounded,
}: Props) => {
  return (
    <ProgressiveImage src={imageSrc!} placeholder={PLACEHOLDER} withPlaceholder={withPlaceholder}>
      {(src, _) => (
        <StyledImage
          rounded={rounded}
          className={className}
          onClick={onClick}
          src={src}
          height={height}
          style={{ objectFit: 'contain', ...style }}
          handleRef={handleRef}
          width={width}
        />
      )}
    </ProgressiveImage>
  );
};

const ActualImage = ({ handleRef, ...props }: any) => (
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
