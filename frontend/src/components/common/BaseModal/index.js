// @flow
import * as React from 'react';
import { omit } from 'lodash';
import { Modal } from 'semantic-ui-react';

type Props = {
  children: any,
  trigger: any,
  handleKeyDown?: any,
};

type State = { open: boolean };

class BaseModalContainer extends React.PureComponent<Props, State> {
  state = { open: false };

  static defaultProps = {
    trigger: (handleOpen: Function) => <div onClick={handleOpen}>Trigger</div>,
    children: (handleClose: Function) => <div onClick={handleClose}>Handle close</div>,
  };

  handleOpen = () => this.setState({ open: true });

  handleClose = (e: SyntheticEvent<>) => this.setState({ open: false });

  _handleKeyDown = (event: SyntheticKeyboardEvent<>) => {
    this.props.handleKeyDown && this.props.handleKeyDown(event);
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

    return (
      <Modal
        {...omit(this.props, ['handleKeyDown'])}
        trigger={trigger(this.handleOpen)}
        open={open}
        onClose={this.handleClose}
      >
        {children(this.handleClose)}
      </Modal>
    );
  }
}

export default BaseModalContainer;
