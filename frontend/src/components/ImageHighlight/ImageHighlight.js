// @flow
import * as React from 'react';
import styled from 'styled-components';
import GalleryImage from '../Gallery/GalleryImage';
import { Modal, Icon, Menu } from 'semantic-ui-react';
import { withHover } from '../../hocs';
import { toReadableHighlightDate } from '../../lib/date';
import type { Image } from '../../meta/types/Image';
import LoadingIcon from '../common/LoadingIcon';

type Props = {
  highlightedImage: Image,
  handleLeftClick: void => void,
  handleRightClick: void => void,
  hovered: boolean,
  handleClose: void => void,
  count: number,
  imageSelectedIx: number,
  highlightHeaderProvider: () => string,
  deleting: boolean,
  handleDelete: void => void,
  handleFavorite: Function,
  favoriting: boolean,
};

// TODO better UI
// TODO identity if known
// TODO clean code
// TODO improve handle delete

const ImageHighlight = ({
  highlightedImage,
  handleLeftClick,
  handleRightClick,
  hovered,
  handleClose,
  count,
  imageSelectedIx,
  highlightHeaderProvider,
  deleting,
  handleDelete,
  handleFavorite,
  favoriting,
}: Props) => {
  const contentStyle = { height: `${window.innerHeight - 30}px`, background: '#000' };

  return (
    <Modal.Content style={contentStyle}>
      <GalleryImage
        src={highlightedImage.image_url}
        height="100%"
        width="100%"
        withPlaceholder={false}
      />

      {hovered && (
        <React.Fragment>
          <div style={backgroundStyle}>
            <p
              style={{ fontSize: '21px', lineHeight: '1.28', marginBottom: '6px', color: 'white' }}
              onClick={handleClose}
            >
              {highlightHeaderProvider()}
            </p>
            <p style={{ color: 'rgba(255, 255, 255, .5)', fontSize: '14px' }}>{`${imageSelectedIx +
              1} of ${count} | ${toReadableHighlightDate(
              new Date(highlightedImage.uploaded_at),
            )}`}</p>
          </div>
          <PagerIcon onClick={handleClose} icon="remove" top="20px" style={{ right: '20px' }} />
          <PagerIcon onClick={handleLeftClick} icon="chevron left" />
          <PagerIcon onClick={handleRightClick} icon="chevron right" style={{ right: '0px' }} />

          <Menu inverted secondary style={menuStyle}>
            <Menu.Item style={{ color: 'white' }} onClick={handleFavorite}>
              {!favoriting ? (
                <React.Fragment>
                  <Icon name="favorite" color={highlightedImage.favorite ? 'yellow' : null} />{' '}
                  Favorite
                </React.Fragment>
              ) : (
                <LoadingIcon />
              )}
            </Menu.Item>
            <Menu.Item style={{ color: 'white' }} onClick={handleDelete}>
              {!deleting ? (
                <React.Fragment>
                  <Icon name="trash" /> Delete
                </React.Fragment>
              ) : (
                <LoadingIcon />
              )}
            </Menu.Item>

            <Menu.Item style={{ color: 'white' }} onClick={() => {}}>
              <Icon name="download" /> Download
            </Menu.Item>

            <Menu.Menu position="right">
              <Menu.Item style={{ opacity: 0.8 }}>Options</Menu.Item>
            </Menu.Menu>
          </Menu>
        </React.Fragment>
      )}
    </Modal.Content>
  );
};

const backgroundStyle = {
  padding: '18px',
  position: 'absolute',
  top: '0px',
  zIndex: 100,
  background: 'linear-gradient(rgba(0, 0, 0, .5), rgba(0,0,0,0))',
  width: '100%',
  height: '150px',
};

const menuStyle = {
  margin: '0px',
  position: 'absolute',
  bottom: '0px',
  zIndex: 100,
  background: 'linear-gradient(rgba(0, 0, 0, .1), rgba(0,0,0,2))',
  width: '100%',
  height: '50px',
};

const PagerIcon = ({ onClick, icon, ...rest }) => (
  <Pager {...rest} onClick={onClick}>
    <Icon name={icon} size="big" />
  </Pager>
);

const Pager = styled.div`
  position: absolute;
  z-index: 100;
  top: ${props => props.top || '50%'};
  opacity: ${props => props.opacity || 0.5};

  :hover {
    cursor: pointer;
    opacity: 1;
  }
`;

export default withHover(ImageHighlight);
