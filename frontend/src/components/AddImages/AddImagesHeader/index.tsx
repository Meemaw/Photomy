import * as React from 'react';
import { onlyUpdateForKeys } from 'recompose';
import { Icon, Menu } from 'semantic-ui-react';

import ClickableIcon from '../../common/ClickableIcon';

type Props = { isAlbum: boolean; handleClose: any; setIsAlbum: any };

const AlbumModalHeader = ({ handleClose, setIsAlbum, isAlbum }: Props) => {
  return (
    <Menu
      pointing={true}
      secondary={true}
      style={{ marginBottom: '0px', height: '40px' }}
      size="small"
    >
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
