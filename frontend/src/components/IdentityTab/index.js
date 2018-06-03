// @flow
import React from 'react';
import IdentityTab from './IdentityTab';
import { IdentityApi } from '../../services';
import { connect } from 'react-redux';
import { setIdentity } from '../../actions';

type State = { savingIdentity: boolean };
type Props = { identity: Object, setIdentity: Object => void };

class IdentityTabContainer extends React.PureComponent<Props, State> {
  state = { savingIdentity: false };

  static defaultProps = {
    identity: {},
  };

  componentWillUnmount() {
    this.props.setIdentity({});
  }

  setSavingIdentity = (savingIdentity: boolean) => this.setState({ savingIdentity });

  saveIdentity = (name: string): Promise<*> => {
    const identityName = this.props.identity.identity;

    if (identityName === name) {
      this.setState({ savingIdentity: false });
      return Promise.resolve();
    }

    const updatedIdentity = { ...this.props.identity, identity: name };

    return IdentityApi.put(updatedIdentity)
      .then(resp => {
        this.props.setIdentity(updatedIdentity);
        this.setSavingIdentity(false);
      })
      .catch(err => console.log(err));
  };

  render() {
    const { identity } = this.props;
    const identityName = identity.identity;

    const identityLoading = Object.keys(identity).length === 0;

    return (
      <IdentityTab
        {...this.state}
        identityLoading={identityLoading}
        identityName={identityName}
        saveIdentity={this.saveIdentity}
        setSavingIdentity={this.setSavingIdentity}
      />
    );
  }
}

const mapDispatchToProps = {
  setIdentity,
};

export default connect(
  null,
  mapDispatchToProps,
)(IdentityTabContainer);
