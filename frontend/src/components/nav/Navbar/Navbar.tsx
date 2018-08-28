import * as React from 'react';
import { Link } from 'react-router-dom';
import { onlyUpdateForKeys } from 'recompose';
import { Button, Dropdown, Grid, Header, Icon, Menu } from 'semantic-ui-react';

import { NAVBAR_GALLERY_TYPE_BREAKPOINT } from '../../../constants/breakpoints';
import { NAVBAR_HEIGHT } from '../../../constants/gallerySizes';
import { GALLERY_TYPES, GalleryTypeOption } from '../../../constants/galleryTypes';
import { GITHUB_RELEASES } from '../../../constants/links';
import { galleryPath, rootPath, settingsPath } from '../../../constants/paths';
import { withWidth } from '../../../hocs';
import { withDimensions } from '../../../lib/image';
import { Album } from '../../../meta/types/Album';
import { GalleryType } from '../../../meta/types/GalleryType';
import { User } from '../../../meta/types/User';
import { VERSION_INFO } from '../../../version';
import AlbumTab from '../../AlbumTab';
import GalleryImage from '../../Gallery/GalleryImage';
import IdentityTab from '../../IdentityTab';

const VERSION_CONTENT = VERSION_INFO.tag
  ? `Version: ${VERSION_INFO.tag}`
  : VERSION_INFO.branch
    ? `${VERSION_INFO.branch} [${VERSION_INFO.commit.substring(0, 8)}]`
    : 'Local Build';

type Props = {
  galleryType: string;
  setGalleryType: (galleryType: GalleryType) => any;
  logout: () => void;
  peoplePage: boolean;
  identity: any;
  width?: number;
  setMenu: any;
  isGallery: boolean;
  pathname: string;
  user: User;
  albumPage: boolean;
  album: Album;
};

const AVATAR_SIZE = 64;
const AVATAR_SIZE_PX = `${AVATAR_SIZE / 2}px`;

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
            )}
            Photomy
          </Header>
        </Grid.Column>

        <Grid.Column textAlign="center">
          {albumPage ? (
            <AlbumTab album={album} />
          ) : peoplePage ? (
            <IdentityTab identity={identity} />
          ) : (
            <Button.Group size="tiny" className="GalleryTabs">
              {isGallery ? (
                GALLERY_TYPES.map((gallery: GalleryTypeOption) => (
                  <Button
                    id={`${gallery.galleryType}-Tab`}
                    key={gallery.galleryType}
                    icon={gallery.icon}
                    content={width! > NAVBAR_GALLERY_TYPE_BREAKPOINT ? gallery.niceName : null}
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
                  src={withDimensions(user.avatar, AVATAR_SIZE * 2, AVATAR_SIZE * 2)}
                  width={AVATAR_SIZE_PX}
                  height={AVATAR_SIZE_PX}
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
              <Dropdown.Header
                content={VERSION_CONTENT}
                icon="info circle"
                onClick={() => window.open(GITHUB_RELEASES, '_blank')}
                className="Hoverable"
              />
              <Dropdown.Item
                text="Settings"
                icon="settings"
                className="SettingsItem"
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
