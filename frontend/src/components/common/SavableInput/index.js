// @flow
import React from 'react';
import { Input } from 'semantic-ui-react';

type Props = {
  saveValue: string => Promise<*>,
  initialValue: ?string,
  handleEmpty?: Function,
};

type State = { value: string, error: boolean, saving: boolean };

class SavableInput extends React.PureComponent<Props, State> {
  state = { value: this.props.initialValue || '', error: false, saving: false };

  _ismounted = true;

  componentWillUnmount() {
    this._ismounted = false;
  }

  handleEmpty = () => this.setState({ error: true });

  handleChange = (e: SyntheticInputEvent<>) => {
    this.setState({ value: e.target.value, error: false });
  };

  onKeyPress = (e: Object, value: string, handleEmpty: void => void) => {
    if (e.key === 'Enter' && !this.state.saving) {
      if (value === '') {
        handleEmpty();
      } else {
        this.saveValue(value);
      }
    }
  };

  saveValue = (value: string) => {
    this.setState({ saving: true });

    this.props
      .saveValue(value)
      .then(resp => this._ismounted && this.setState({ saving: false }))
      .catch(err => this._ismounted && this.setState({ error: true, saving: false }));
  };

  render() {
    const { value, saving, error } = this.state;

    const handleEmpty = this.props.handleEmpty || this.handleEmpty;

    const action = saving
      ? null
      : value === ''
        ? {
            color: 'yellow',
            icon: 'remove',
            onClick: handleEmpty,
          }
        : { color: 'green', icon: 'checkmark', onClick: () => this.saveValue(value) };

    return (
      <Input
        value={value}
        error={error}
        loading={saving}
        ref={e => e && e.focus()}
        onChange={this.handleChange}
        onKeyPress={e => this.onKeyPress(e, value, handleEmpty)}
        action={action}
        style={{ marginTop: '-5px' }}
      />
    );
  }
}

export default SavableInput;
