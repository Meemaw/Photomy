import * as React from 'react';

type Props = {
  children: (src: string, loading: boolean) => React.ReactNode;
  onError?: (errorEvent: Event) => void;
  placeholder: string;
  src: string;
  withPlaceholder: boolean;
};

type State = {
  image: string;
  loading: boolean;
};

class ProgressiveImage extends React.Component<Props, State> {
  image: HTMLImageElement;

  static defaultProps = {
    withPlaceholder: true,
  };

  state = {
    image: this.props.placeholder,
    loading: true,
  };

  componentDidMount() {
    const { src } = this.props;
    this.loadImage(src);
  }

  componentWillUnmount() {
    if (this.image) {
      this.image.onload = null;
      this.image.onerror = null;
    }
  }

  static getDerivedStateFromProps(nextProps: Props, prevState: State) {
    const { withPlaceholder } = nextProps;

    if (nextProps.src !== prevState.image && (!withPlaceholder || !prevState.loading)) {
      return { image: nextProps.src };
    }
    return null;
  }

  loadImage = (src: string) => {
    if (this.image) {
      this.image.onload = null;
      this.image.onerror = null;
    }
    const image = new Image();
    this.image = image;
    image.onload = this.onLoad;
    image.onerror = this.onError;
    image.src = src;
  };

  onLoad = () => {
    this.setState({
      image: this.image.src,
      loading: false,
    });
  };

  onError = (errorEvent: Event) => {
    const { onError } = this.props;
    if (onError) {
      onError(errorEvent);
    }
  };

  render() {
    const { image, loading } = this.state;

    const { children } = this.props;
    if (!children || typeof children !== 'function') {
      throw new Error(`ProgressiveImage requires a function as its only child`);
    }
    return children(image, loading);
  }
}

export default ProgressiveImage;
