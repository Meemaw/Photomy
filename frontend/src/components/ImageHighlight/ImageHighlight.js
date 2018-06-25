// @flow
import * as React from 'react';
import styled from 'styled-components';
import LoadingIcon from '../common/LoadingIcon';
import GalleryImage from '../Gallery/GalleryImage';
import ImageHighlightDetails from '../ImageHighlightDetails';
import AddToAlbum from '../AddToAlbumModal';
import { enterFullscren } from '../../lib/document';
import { Modal, Icon, Menu, Dropdown, Sidebar, Dimmer } from 'semantic-ui-react';
import { withHover } from '../../hocs';
import { toReadableHighlightDate } from '../../lib/date';
import { isAlbumPath } from '../../lib/paths';
import type { Image } from '../../meta/types/Image';

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
  handleRef: Function,
  imgRef: ?React.Node,
  setRenderInformation: Function,
  renderInformation: boolean,
  settingAsAvatar: boolean,
  setAsAvatar: Function,
  handleAddToAlbumClose: Function,
  handleAddToAlbumOpen: Function,
  addToAlbumOpen: boolean,
  removeFromAlbum: Function,
};

// TODO clean code
// TODO handle hover with css

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
  imgRef,
  handleRef,
  renderInformation,
  setRenderInformation,
  settingAsAvatar,
  setAsAvatar,
  handleAddToAlbumClose,
  handleAddToAlbumOpen,
  addToAlbumOpen,
  removeFromAlbum,
}: Props) => {
  const contentStyle = {
    height: `${window.innerHeight - 30}px`,
    background: '#000',
    display: 'flex',
  };
  const src = highlightedImage.image_url;
  const albumId = isAlbumPath(window.location.pathname);
  return (
    <Sidebar.Pushable as={Modal.Content} style={contentStyle}>
      <Sidebar
        animation="scale down"
        style={{ width: '280px' }}
        direction="right"
        visible={renderInformation}
      >
        <ImageHighlightDetails
          image={highlightedImage}
          setRenderInformation={setRenderInformation}
        />
      </Sidebar>
      <Sidebar.Pusher style={{ width: '100%' }}>
        <div style={{ position: 'relative', width: '100%', height: '100%' }}>
          <Dimmer.Dimmable dimmed={addToAlbumOpen} style={{ height: '100%' }} blurring>
            <GalleryImage
              src={src}
              height="100%"
              width="100%"
              withPlaceholder={false}
              handleRef={handleRef}
            />
            <Dimmer active={addToAlbumOpen} />
          </Dimmer.Dimmable>

          {(hovered || addToAlbumOpen) && (
            <React.Fragment>
              <div style={backgroundStyle}>
                <p
                  style={{
                    fontSize: '21px',
                    lineHeight: '1.28',
                    marginBottom: '6px',
                    color: 'white',
                  }}
                  onClick={handleClose}
                >
                  {highlightHeaderProvider()}
                </p>
                <p
                  style={{ color: 'rgba(255, 255, 255, .5)', fontSize: '14px' }}
                >{`${imageSelectedIx + 1} of ${count} | ${toReadableHighlightDate(
                  highlightedImage.taken_on || highlightedImage.uploaded_at,
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

                <Menu.Item
                  content="Details"
                  icon="info circle"
                  onClick={() => setRenderInformation(renderInformation ? false : true)}
                />

                <Menu.Menu position="right">
                  <Dropdown item trigger="More options" upward={true}>
                    <Dropdown.Menu position="right">
                      <Dropdown.Item
                        text="Fullscreen"
                        icon="image"
                        onClick={() => enterFullscren(imgRef)}
                      />

                      <Dropdown.Item text="Set as avatar" icon="user" onClick={setAsAvatar} />

                      {albumId !== null && (
                        <Dropdown.Item
                          text="Remove from album"
                          icon="trash"
                          onClick={() => removeFromAlbum(albumId, highlightedImage.image_id)}
                        />
                      )}

                      <AddToAlbum
                        open={addToAlbumOpen}
                        handleClose={handleAddToAlbumClose}
                        handleOpen={handleAddToAlbumOpen}
                        image={highlightedImage}
                      />
                    </Dropdown.Menu>
                  </Dropdown>
                </Menu.Menu>
              </Menu>
            </React.Fragment>
          )}
        </div>
      </Sidebar.Pusher>
    </Sidebar.Pushable>
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
