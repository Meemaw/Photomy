// @flow
import * as React from 'react';
import ContentContainer from '../common/ContentContainer';
import GallerySection from './GallerySection';
import GalleryImage from './GalleryImage';
import FooterInfo from './FooterInfo';
import AddPhoto from '../AddPhoto';
import { Message, Container, Divider } from 'semantic-ui-react';

type Props = {
  renderAddPhoto: boolean,
  handleContextRef?: Function,
  children: any,
  isEmpty: boolean,
  galleryName: string,
};
type State = {};

class Gallery extends React.Component<Props, State> {
  static Section = GallerySection;
  static Image = GalleryImage;
  static FooterInfo = FooterInfo;

  static defaultProps = {
    renderAddPhoto: true,
  };

  render() {
    const { renderAddPhoto, isEmpty, children, galleryName } = this.props;
    return (
      <ContentContainer className="ImageGalleryContainer" innerRef={this.props.handleContextRef}>
        {isEmpty ? (
          <React.Fragment>
            <Divider style={{ marginTop: '0px', paddingTop: '0px' }} />
            <Container>
              <Message
                header={`It looks like ${galleryName} gallery is still empty`}
                content="Please add some photos"
                icon="frown"
              />
            </Container>
          </React.Fragment>
        ) : (
          children
        )}
        {renderAddPhoto && <AddPhoto />}
      </ContentContainer>
    );
  }
}

export default Gallery;
