// @flow
import React from 'react';
import BaseModal from '../../../common/BaseModal';
import DeleteAccount from './DeleteAccount';
import { Button } from 'semantic-ui-react';
import { UserAuthApi } from '../../../../services';
import { connect } from 'react-redux';
import { logout } from '../../../../actions';

const mapDispatchToProps = {
  logout,
};

type Props = { logout: Function };
type State = { deleting: boolean };

class DeleteAccountContainer extends React.Component<Props, State> {
  state = { deleting: false };

  renderTrigger = (handleOpen: Function) => {
    return <Button content="Delete account" color="red" icon="trash" onClick={handleOpen} />;
  };

  handleDelete = () => {
    const { logout } = this.props;
    this.setState({ deleting: true });
    UserAuthApi.delete()
      .then(resp => logout())
      .catch(err => {
        console.log(err);
        this.setState({ deleting: false });
      });
  };

  render() {
    const { deleting } = this.state;
    return (
      <BaseModal trigger={this.renderTrigger}>
        {handleClose => (
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
export default connect(
  null,
  mapDispatchToProps,
)(DeleteAccountContainer);
