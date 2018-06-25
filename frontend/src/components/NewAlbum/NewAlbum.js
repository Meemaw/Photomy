// @flow
import * as React from 'react';
import styled from 'styled-components';
import LoadingIcon from '../common/LoadingIcon';
import { List } from 'semantic-ui-react';

type Props = { handleClick: Function, creatingAlbum: boolean };

const NewAlbum = ({ handleClick, creatingAlbum }: Props) => {
  return (
    <AddAlbumStyle>
      {creatingAlbum ? (
        <LoadingIcon />
      ) : (
        <List.Item onClick={handleClick}>
          <List.Icon name="add" />
          <List.Content verticalAlign="middle">
            <List.Header>New album</List.Header>
          </List.Content>
        </List.Item>
      )}
    </AddAlbumStyle>
  );
};

const AddAlbumStyle = styled(List)`
  &&& {
    .item {
      padding: 6px;
    }
    .item:hover {
      background-color: #eee;
      cursor: pointer;
    }
  }
`;

export default NewAlbum;
