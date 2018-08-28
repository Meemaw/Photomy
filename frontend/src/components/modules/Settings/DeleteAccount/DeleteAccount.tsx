import * as React from 'react';
import { Button, Header, Icon, Message, Modal } from 'semantic-ui-react';

type Props = {
  handleClose: (e: React.SyntheticEvent<any>) => void;
  handleDelete: (e: React.SyntheticEvent<any>) => void;
  deleting: boolean;
};

const DeleteAccount = ({ handleClose, deleting, handleDelete }: Props) => {
  return (
    <React.Fragment>
      <Header icon="trash" content="Delete Account" />
      <Modal.Content>
        <Message
          error
          header="Are you sure you want to delete your account?"
          list={['You wont be able to use Photomy anymore.', 'You will lose all your images.']}
        />
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={handleClose}>
          <Icon name="remove" />
          Cancel
        </Button>
        <Button color="red" onClick={handleDelete} loading={deleting}>
          <Icon name="trash" /> Yes, delete profile
        </Button>
      </Modal.Actions>
    </React.Fragment>
  );
};

export default DeleteAccount;
