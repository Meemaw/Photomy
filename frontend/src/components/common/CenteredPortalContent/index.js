import React from 'react';
import { Segment } from 'semantic-ui-react';

const CenteredPortalContent = ({ children, zIndex, maxWidth, ...rest }) => {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        top: '0px',
        left: '0px',
        position: 'fixed',
        zIndex,
        textAlign: 'center',
      }}
    >
      <Segment
        style={{
          position: 'relative',
          top: '50%',
          maxWidth: maxWidth,
          transform: 'translateY(-50%) translateX(-50%)',
          left: '50%',
          textAlign: 'left',
        }}
      >
        {children}
      </Segment>
    </div>
  );
};

CenteredPortalContent.defaultProps = {
  zIndex: 10000,
  maxWidth: '500px',
};

export default CenteredPortalContent;
