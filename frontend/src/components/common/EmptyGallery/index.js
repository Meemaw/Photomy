// @flow
import * as React from 'react';
import { Icon, Container, Divider } from 'semantic-ui-react';

type Props = {
  instructions: string,
};

const EmptyGallery = ({ instructions }: Props) => {
  return (
    <React.Fragment>
      <Divider style={{ marginTop: '0px', paddingTop: '0px' }} />
      <Container
        style={{
          height: 'calc(70%)',
          display: 'flex',
          justifyContent: 'center',
          textAlign: 'center',
          flexDirection: 'column',
        }}
      >
        <Icon name="frown" size="huge" style={{ marginBottom: '15px', width: '100%' }} />
        <div style={{ fontWeight: '600', marginBottom: '10px' }}>Ouuugh... it's empty there</div>
        <div style={{ color: '#aaa' }}>{instructions}</div>
      </Container>
    </React.Fragment>
  );
};

EmptyGallery.defaultProps = {
  instructions: 'Add some photos to your gallery',
};

export default EmptyGallery;
