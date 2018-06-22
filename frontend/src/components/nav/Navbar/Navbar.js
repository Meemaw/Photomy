// @flow
import React from 'react';
import IdentityTab from '../../IdentityTab';
import AlbumTab from '../../AlbumTab';
import GalleryImage from '../../Gallery/GalleryImage';
import { Menu, Header, Dropdown, Icon, Grid, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { NAVBAR_HEIGHT } from '../../../constants/gallerySizes';
import { GALLERY_TYPES } from '../../../constants/galleryTypes';
import { onlyUpdateForKeys } from 'recompose';
import { rootPath, settingsPath, galleryPath } from '../../../lib/paths';
import { withWidth } from '../../../hocs';
import { NAVBAR_GALLERY_TYPE_BREAKPOINT } from '../../../constants/breakpoints';
import { VERSION_INFO } from '../../../version';
import type { User } from '../../../meta/types/User';

const VERSION_CONTENT = VERSION_INFO.tag
  ? `Version: ${VERSION_INFO.tag}`
  : VERSION_INFO.branch
    ? `${VERSION_INFO.branch} [${VERSION_INFO.commit.substring(0, 8)}]`
    : 'Local Build';

type Props = {
  galleryType: string,
  setGalleryType: string => Object,
  logout: void => void,
  peoplePage: boolean,
  identity: Object,
  width: number,
  setMenu: Function,
  isGallery: boolean,
  pathname: string,
  user: User,
  albumPage: boolean,
  album: Object,
};

const Navbar = ({
  galleryType,
  setGalleryType,
  logout,
  peoplePage,
  identity,
  width,
  isGallery,
  setMenu,
  pathname,
  user,
  albumPage,
  album,
}: Props) => {
  return (
    <Menu className="Navbar" fixed="top" secondary style={{ height: NAVBAR_HEIGHT }} as={Grid}>
      <Grid.Row columns={3}>
        <Grid.Column as={Link} to={galleryPath} verticalAlign="middle">
          <Header as="h4">
            {(peoplePage || albumPage) && (
              <Icon name="chevron left" style={{ fontSize: '1rem', height: '100%' }} />
            )}Photomy
          </Header>
        </Grid.Column>

        <Grid.Column textAlign="center">
          {albumPage ? (
            <AlbumTab album={album} />
          ) : peoplePage ? (
            <IdentityTab identity={identity} />
          ) : (
            <Button.Group size="tiny">
              {isGallery ? (
                GALLERY_TYPES.map(gallery => (
                  <Button
                    key={gallery.galleryType}
                    icon={gallery.icon}
                    content={width > NAVBAR_GALLERY_TYPE_BREAKPOINT ? gallery.niceName : null}
                    active={galleryType === gallery.galleryType}
                    onClick={() => setGalleryType(gallery.galleryType)}
                  />
                ))
              ) : (
                <Button icon="image" content="To Gallery" onClick={() => setMenu(rootPath)} />
              )}
            </Button.Group>
          )}
        </Grid.Column>

        <Menu.Menu position="right">
          <Dropdown
            item
            trigger={
              user.avatar ? (
                <GalleryImage
                  src={user.avatar}
                  width="30px"
                  height="30px"
                  rounded
                  style={{ objectFit: 'initial' }}
                />
              ) : (
                <span>
                  <Icon name="user" />
                  {`Hi ${user.first_name || ' there!'}`}
                </span>
              )
            }
          >
            <Dropdown.Menu
              position="right"
              style={{ marginTop: '0px', zIndex: 200, minWidth: '250px' }}
            >
              <Dropdown.Header content={VERSION_CONTENT} icon="info circle" />
              <Dropdown.Item
                text="Settings"
                icon="settings"
                onClick={() => setMenu(settingsPath)}
                active={pathname === settingsPath}
              />
              <Dropdown.Item text="Sign out" icon="sign out" onClick={logout} />
            </Dropdown.Menu>
          </Dropdown>
        </Menu.Menu>
      </Grid.Row>
    </Menu>
  );
};

export default onlyUpdateForKeys([
  'galleryType',
  'peoplePage',
  'identity',
  'isGallery',
  'user',
  'album',
  'albumPage',
])(withWidth(Navbar));
