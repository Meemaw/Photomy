// @flow
import { omit } from 'lodash';
import * as React from 'react';
import { Modal, ModalProps } from 'semantic-ui-react';

interface Props extends ModalProps {
  children?: (handleClose: (e: React.SyntheticEvent<any>) => void) => React.ReactNode;
  trigger?: (handleOpen: (e: React.SyntheticEvent<any>) => void) => React.ReactNode;
  handleKeyDown?: (e: React.KeyboardEvent<any>) => void;
}

type State = { open: boolean };

class BaseModalContainer extends React.PureComponent<Props, State> {
  state = { open: false };

  static defaultProps = {
    trigger: (handleOpen: any) => <div onClick={handleOpen}>Trigger</div>,
    children: (handleClose: (e: React.MouseEvent) => void) => (
      <div onClick={handleClose}>Handle close</div>
    ),
  };

  handleOpen = (_: React.SyntheticEvent<any>): void => {
    this.setState({ open: true });
  };

  handleClose = (_: React.SyntheticEvent<any>): void => this.setState({ open: false });

  _handleKeyDown = (event: any) => {
    if (this.props.handleKeyDown) {
      this.props.handleKeyDown(event);
    }
  };

  componentDidUpdate(prevProps: Props, prevState: State, snapshot: any) {
    const { open } = this.state;

    if (open) {
      window.addEventListener('keydown', this._handleKeyDown);
    } else {
      window.removeEventListener('keydown', this._handleKeyDown);
    }
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this._handleKeyDown);
  }

  render() {
    const { children, trigger } = this.props;
    const { open } = this.state;

    const triggerNode = trigger!(this.handleOpen);

    return (
      <Modal
        {...omit(this.props, ['handleKeyDown'])}
        trigger={triggerNode}
        open={open}
        onClose={this.handleClose}
      >
        {children!(this.handleClose)}
      </Modal>
    );
  }
}

export default BaseModalContainer;
