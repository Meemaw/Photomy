// @flow
import * as React from 'react';
import styled from 'styled-components';
import GalleryImage from '../Gallery/GalleryImage';
import { Modal, Icon, Menu, Dropdown } from 'semantic-ui-react';
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
  const src = highlightedImage.image_url;

  hovered = true;

  return (
    <Modal.Content style={contentStyle}>
      <GalleryImage src={src} height="100%" width="100%" withPlaceholder={false} />

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
          <PagerIcon
            onClick={handleClose}
            icon="remove"
            width="null"
            right="5px"
            top="10px"
            height="null"
            zIndex={1000}
          />
          <PagerIcon onClick={handleLeftClick} icon="chevron left" left="0px" />
          <PagerIcon onClick={handleRightClick} icon="chevron right" right="0px" />

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

            <Menu.Menu position="right">
              <Dropdown item trigger="Options" upward={true}>
                <Dropdown.Menu position="right">
                  <Dropdown.Item text="TODO" icon="upload" />
                </Dropdown.Menu>
              </Dropdown>
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
  z-index: ${props => props.zIndex || 100};
  top: ${props => props.top || '0%'};
  height: ${props => props.height || '100%'};
  width: ${props => props.width || '20%'};
  opacity: ${props => props.opacity || 0.5};
  right: ${props => props.right || null};
  left: ${props => props.left || null};

  :hover {
    cursor: pointer;
    opacity: 1;
  }

  i {
    right: ${props => props.right || null};
    left: ${props => props.left || null};
    position: absolute;
    top: 50%;
  }
`;

export default withHover(ImageHighlight);
