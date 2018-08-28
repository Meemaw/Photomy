import * as React from 'react';
import { connect } from 'react-redux';
import { Accordion, Divider, Icon, Image, Menu, Sidebar } from 'semantic-ui-react';

import { RouteComponentProps } from '../../../node_modules/@types/react-router';
import { StoreState } from '../../meta/types/Store';
import { User } from '../../meta/types/User';
import Navbar from '../nav/Navbar';

interface Props extends RouteComponentProps<any> {
  children: any;
  authUser: User;
}

const MainContent: React.StatelessComponent<any> = ({ children, authUser, ...rest }: Props) => {
  return (
    <section className="MainContent">
      <Navbar {...rest} />

      <Sidebar.Pushable>
        <Sidebar
          as={Menu}
          animation="uncover"
          vertical
          visible={true}
          style={{ paddingTop: '55px' }}
        >
          <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            <Image
              src={authUser.avatar}
              circular
              style={{ width: '90px', height: '90px', display: 'inline-block' }}
            />

            <div style={{ fontWeight: 900, fontSize: '15px', paddingTop: '8px' }}>{`${
              authUser.first_name
            } ${authUser.last_name}`}</div>

            <div style={{ color: 'rgba(0,0,0,.4)' }}>{authUser.email}</div>
          </div>
          <Accordion>
            <Accordion.Title active={true} index={0}>
              <Menu.Item as="a">
                <Icon name="dropdown" />
                Galleries
              </Menu.Item>
              <Divider style={{ margin: '0px' }} />
            </Accordion.Title>

            <Accordion.Content active={true}>
              <Menu.Menu>
                <Menu.Item as="a">
                  <Icon name="photo" style={{ float: 'left', marginRight: '10px' }} /> All photos
                </Menu.Item>
                <Menu.Item as="a">
                  <Icon name="book" style={{ float: 'left', marginRight: '10px' }} /> Albums
                </Menu.Item>
                <Menu.Item as="a">
                  <Icon name="user" style={{ float: 'left', marginRight: '10px' }} /> People
                </Menu.Item>
                <Menu.Item as="a">
                  <Icon name="heart" style={{ float: 'left', marginRight: '10px' }} /> Favorites
                </Menu.Item>
              </Menu.Menu>
            </Accordion.Content>
          </Accordion>

          <Menu.Item as="a">
            <Icon name="settings" />
            Settings
          </Menu.Item>

          <Menu.Item as="a">
            <Icon name="info circle" />
            About
          </Menu.Item>
        </Sidebar>
        <Sidebar.Pusher dimmed={false} style={{ minHeight: '100vh' }}>
          {children}
        </Sidebar.Pusher>
      </Sidebar.Pushable>
    </section>
  );
};

MainContent.defaultProps = {
  history: undefined,
};

function mapStateToProps(state: StoreState) {
  return {
    authUser: state.auth.user,
  };
}

const connected = connect(
  mapStateToProps,
  null,
)(MainContent);

export default connected;
