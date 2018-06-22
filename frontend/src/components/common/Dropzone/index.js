// @flow
import * as React from 'react';
import Dropzone from 'react-dropzone';
import { Icon } from 'semantic-ui-react';

type Props = {
  renderDropzone?: Function,
  renderError?: Function,
  accept: string,
  handleAcceptedFiles: Function,
  multiple?: number,
  disabled: boolean,
  error?: string,
};
type State = { error: ?string };

class DropzoneContainer extends React.Component<Props, State> {
  state = { error: null };

  static defaultProps = {
    multiple: true,
    accept: 'image/jpeg, image/png, image/jpg',
    disabled: false,
  };

  renderError = (actualError: string) => {
    if (this.props.renderError) {
      return this.props.renderError(actualError);
    }

    return <p style={{ color: '#cb2431' }}>{actualError}</p>;
  };

  renderDropzone = () => {
    if (this.props.renderDropzone) {
      return this.props.renderDropzone();
    }

    return <Icon name="plus" style={{ width: '100%' }} size="large" />;
  };

  handleDrop = (accepted: Array<any>, rejected: Array<any>) => {
    const { accept, handleAcceptedFiles, multiple } = this.props;

    if ((multiple && accepted.length > 0) || (!multiple && accepted.length === 1)) {
      handleAcceptedFiles(accepted);
      this.setState({ error: null });
    } else {
      this.setState({ error: `We only support: [${accept}]` });
    }
  };

  render() {
    const { disabled, accept, error, multiple } = this.props;
    const actualError = this.state.error || error;

    return (
      <Dropzone
        disabled={disabled}
        multiple={multiple}
        onDrop={this.handleDrop}
        accept={accept}
        className="Dropzone"
      >
        {this.renderDropzone()}
        {actualError && this.renderError(actualError)}
      </Dropzone>
    );
  }
}

export default DropzoneContainer;
