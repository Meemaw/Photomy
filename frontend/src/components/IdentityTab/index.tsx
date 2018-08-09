import * as React from 'react';
import { connect } from 'react-redux';

import { setIdentity } from '../../actions';
import { Identity } from '../../meta/types/Identity';
import { IdentityApi } from '../../services';
import SavableTab from '../common/SavableTab';

type State = { savingIdentity: boolean };
type Props = { identity: Identity; setIdentity: any };

class IdentityTabContainer extends React.PureComponent<Props, State> {
  state = { savingIdentity: false };

  static defaultProps = {
    identity: {},
  };

  componentWillUnmount() {
    this.props.setIdentity({});
  }

  setSavingIdentity = (savingIdentity: boolean) => this.setState({ savingIdentity });

  saveIdentity = (name: string): Promise<any> => {
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
      .catch(err => {
        // console.log(err);
      });
  };

  render() {
    const { identity } = this.props;
    const { savingIdentity } = this.state;
    const identityName = identity.identity;

    const identityLoading = Object.keys(identity).length === 0;

    return (
      <SavableTab
        value={identityName}
        loading={identityLoading}
        setSavingValue={this.setSavingIdentity}
        saveValue={this.saveIdentity}
        savingValue={savingIdentity}
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
