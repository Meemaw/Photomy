import * as React from 'react';
import { List } from 'semantic-ui-react';

import { albumsPath } from '../../constants/paths';
import withPush from '../../hocs/Router';
import { toReadableAlbumDate } from '../../lib/date';
import { Album, displayAlbumName, getCoverUrl } from '../../meta/types/Album';
import IconFormLabel from '../common/IconFormLabel';
import ListStyle from '../common/ListStyle';
import GalleryImage from '../Gallery/GalleryImage';

type Props = { albums: Album[]; handleClick?: any; push: any };

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
