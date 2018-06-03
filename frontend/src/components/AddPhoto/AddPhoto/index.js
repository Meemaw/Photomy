// @flow
import * as React from 'react';
import UploadPhotoUrl from '../UploadPhotoUrl';
import UploadPhotoFile from '../UploadPhotoFile';
import { Tab, Button, Menu, Icon } from 'semantic-ui-react';

type Props = { handleClose: void => void };
type State = {};

const TabMenuItem = ({ icon, children, ...rest }) => {
  return (
    <Menu.Item {...rest}>
      {icon && <Icon name={icon} />}
      {children}
    </Menu.Item>
  );
};

const panes = [
  {
    menuItem: (
      <TabMenuItem icon="upload" key="Upload">
        Upload photos
      </TabMenuItem>
    ),
    render: () => (
      <Tab.Pane>
        <UploadPhotoFile />
      </Tab.Pane>
    ),
  },
  {
    menuItem: (
      <TabMenuItem icon="linkify" key="Link">
        Upload with link
      </TabMenuItem>
    ),
    render: () => (
      <Tab.Pane>
        <UploadPhotoUrl />
      </Tab.Pane>
    ),
  },
];

class AddPhotoContainer extends React.Component<Props, State> {
  render() {
    const { handleClose } = this.props;
    return (
      <div className="AddPhotoContainer">
        <Tab panes={panes} />
        <Button
          content="Close"
          style={{ float: 'right', margin: '10px 0px' }}
          icon="cancel"
          onClick={handleClose}
        />
      </div>
    );
  }
}

export default AddPhotoContainer;
