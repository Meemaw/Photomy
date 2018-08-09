import * as React from 'react';
import ImageLinkUpload from './ImageLinkUpload';

type Props = { addAcceptedImages: (imageFileLinks: LinkImageFile[]) => void; isDuplicated: any };
type State = {
  linkVerified: boolean;
  error?: string;
  src: string;
  veryfing: boolean;
};

export interface LinkImageFile {
  isLink: boolean;
  preview?: string;
}

class ImageLinkUploadContainner extends React.PureComponent<Props, State> {
  state = { linkVerified: false, src: '', veryfing: false };

  verifyLink = () => {
    const timeout = 5000;
    const { src } = this.state;
    if (src === '') {
      return;
    }
    this.setState({ veryfing: true });
    let timer: any = null;
    let timedOut = false;
    const img = new Image();

    img.onload = () => {
      if (!timedOut) {
        this.setState({
          linkVerified: true,
          error: undefined,
          veryfing: false,
        });
        clearTimeout(timer);
      }
    };
    img.onerror = img.onabort = () => {
      if (!timedOut) {
        this.setState({
          linkVerified: false,
          error: 'Bad url.',
          veryfing: false,
        });
        clearTimeout(timer);
      }
    };
    img.src = src;

    timer = setTimeout(() => {
      timedOut = true;
      this.setState({
        linkVerified: false,
        error: 'Bad url.',
        veryfing: false,
      });
      img.src = 'stop-loading';
    }, timeout);
  };

  addImage = () => {
    const { addAcceptedImages, isDuplicated } = this.props;
    const { src } = this.state;

    if (!isDuplicated(src)) {
      addAcceptedImages([{ preview: src, isLink: true }]);
    }
  };

  handleChange = (e: any, { value }: any) =>
    this.setState({
      src: value,
      veryfing: false,
      linkVerified: false,
      error: undefined,
    });

  render() {
    return (
      <ImageLinkUpload
        {...this.state}
        handleChange={this.handleChange}
        addImage={this.addImage}
        verifyLink={this.verifyLink}
      />
    );
  }
}

export default ImageLinkUploadContainner;
