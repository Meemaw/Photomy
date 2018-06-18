// @flow
import React from 'react';
import ClickableIcon from '../../common/ClickableIcon';
import { Menu, Icon } from 'semantic-ui-react';
import { onlyUpdateForKeys } from 'recompose';

type Props = { isAlbum: boolean, handleClose: Function, setIsAlbum: Function };

const AlbumModalHeader = ({ handleClose, setIsAlbum, isAlbum, ...rest }: Props) => {
  return (
    <Menu pointing secondary style={{ marginBottom: '0px', height: '40px' }} size="small">
      <Menu.Item name="album" active={isAlbum} onClick={() => setIsAlbum(true)}>
        <Icon name="photo" />
        <span>Create album</span>
      </Menu.Item>
      <Menu.Item name="photos" active={!isAlbum} onClick={() => setIsAlbum(false)}>
        <Icon name="picture" />
        <span>Add photos</span>
      </Menu.Item>

      <Menu.Menu position="right">
        <Menu.Item>
          <ClickableIcon name="remove" onClick={handleClose} />
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  );
};

export default onlyUpdateForKeys(['isAlbum'])(AlbumModalHeader);
