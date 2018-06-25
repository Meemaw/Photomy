// @flow
import React from 'react';
import LocationSearchInput from './LocationSearchInput';

type Props = {
  setLocation: Function,
  initialValue?: ?string,
  placeholder?: ?string,
  label?: ?string,
};
type State = { address: string, errorMessage: string };

class LocationSearchInputContainer extends React.Component<Props, State> {
  state = { address: this.props.initialValue || '', errorMessage: '' };

  handleChange = (address: string) => {
    this.setState({
      address,
      errorMessage: '',
    });
    const { setLocation } = this.props;
    setLocation && setLocation(address);
  };

  handleSelect = (selected: string) => {
    this.setState({ address: selected });
    const { setLocation } = this.props;
    setLocation && setLocation(selected);
  };

  handleCloseClick = () => {
    this.setState({
      address: '',
    });
  };

  handleError = (status: string, clearSuggestions: Function) => {
    console.log('Error from Google Maps API', status); // eslint-disable-line no-console
    this.setState({ errorMessage: status }, () => {
      clearSuggestions();
    });
  };

  render() {
    const { address, errorMessage } = this.state;
    const { placeholder, label } = this.props;

    return (
      <LocationSearchInput
        address={address}
        errorMessage={errorMessage}
        handleChange={this.handleChange}
        handleCloseClick={this.handleCloseClick}
        handleSelect={this.handleSelect}
        handleError={this.handleError}
        placeholder={placeholder}
        label={label}
      />
    );
  }
}

export default LocationSearchInputContainer;
