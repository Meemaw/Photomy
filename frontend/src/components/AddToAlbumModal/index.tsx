import * as React from 'react';
import { Dropdown, TransitionablePortal } from 'semantic-ui-react';

import { DivClick } from '../../meta/types/Function';
import { Image } from '../../meta/types/Image';
import AddToAlbum from '../AddToAlbum';
import CenteredPortalContent from '../common/CenteredPortalContent';

type Props = {
  handleClose: any;
  handleOpen: DivClick;
  open: boolean;
  image: Image;
};

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
