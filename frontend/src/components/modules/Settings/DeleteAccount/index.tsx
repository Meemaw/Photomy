import * as React from 'react';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react';

import { logout } from '../../../../actions';
import { UserAuthApi } from '../../../../services';
import BaseModal from '../../../common/BaseModal';
import DeleteAccount from './DeleteAccount';

type Props = { logout: any };
type State = { deleting: boolean };

class DeleteAccountContainer extends React.Component<Props, State> {
  state = { deleting: false };

  renderTrigger = (handleOpen: (e: React.SyntheticEvent<any>) => void): React.ReactNode => {
    return <Button content="Delete account" color="red" icon="trash" onClick={handleOpen} />;
  };

  handleDelete = () => {
    this.setState({ deleting: true });
    UserAuthApi.delete()
      .then(_ => this.props.logout())
      .catch(err => {
        // console.log(err);
        this.setState({ deleting: false });
      });
  };

  render() {
    const { deleting } = this.state;
    return (
      <BaseModal trigger={this.renderTrigger}>
        {(handleClose: (e: React.SyntheticEvent<any>) => void) => (
          <DeleteAccount
            handleClose={handleClose}
            deleting={deleting}
            handleDelete={this.handleDelete}
          />
        )}
      </BaseModal>
    );
  }
}

const mapDispatchToProps = {
  logout,
};

const connected = connect(
  null,
  mapDispatchToProps,
)(DeleteAccountContainer);

export default connected;
