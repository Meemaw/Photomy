import React from 'react';
import IconFormLabel from '../common/IconFormLabel';
import ListStyle from '../common/ListStyle';
import GalleryImage from '../Gallery/GalleryImage';
import withPush from '../../hocs/Router';
import { List } from 'semantic-ui-react';
import { albumsPath } from '../../lib/paths';
import { toReadableAlbumDate } from '../../lib/date';
import { getCoverUrl } from '../../meta/types/Album';
import type { Album } from '../../meta/types/Album';
import { displayAlbumName } from '../../meta/types/Album';

type Props = { albums: Array<Album>, handleClick?: Function, push: Function };

const AlbumsList = ({ albums, handleClick, push }: Props) => {
  return (
    <ListStyle className="Albums">
      <IconFormLabel label="Albums" icon="book" style={{ marginTop: '10px' }} />

      <List divided relaxed>
        {albums.map(album => (
          <List.Item
            key={album.id}
            onClick={
              handleClick ? () => handleClick(album) : () => push(`${albumsPath}/${album.id}`)
            }
          >
            <GalleryImage src={getCoverUrl(album)} width="30px" height="30px" />
            <List.Content>
              <List.Header style={{ color: '#4183c4' }}>{displayAlbumName(album)}</List.Header>
              <List.Description>{`${album.images_count} images | ${toReadableAlbumDate(
                album.uploaded_at,
              )}`}</List.Description>
            </List.Content>
          </List.Item>
        ))}
      </List>
    </ListStyle>
  );
};

export default withPush(AlbumsList);
