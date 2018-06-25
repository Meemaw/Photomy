// @flow
import React from 'react';
import AddToAlbum from '../AddToAlbum';
import CenteredPortalContent from '../common/CenteredPortalContent';
import { Dropdown, TransitionablePortal } from 'semantic-ui-react';
import type { Image } from '../../meta/types/Image';

type Props = { handleClose: Function, handleOpen: Function, open: boolean, image: Image };

const AddToAlbumModal = ({ handleClose, handleOpen, open, image }: Props) => {
  return (
    <TransitionablePortal
      trigger={
        <Dropdown.Item
          text="Add to album"
          icon="book"
          onClick={handleOpen}
          transition={{ animation: 'zoom', duration: 500 }}
        />
      }
    >
      <CenteredPortalContent>
        <AddToAlbum handleClose={handleClose} image={image} />
      </CenteredPortalContent>
    </TransitionablePortal>
  );
};

export default AddToAlbumModal;
