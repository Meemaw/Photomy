// @flow
import * as React from 'react';
import SectionRow from './SectionRow';
import ImageHighlightModal from '../../ImageHighlightModal';
import type { Image } from '../../../meta/types/Image';
import { Grid, Divider, Menu } from 'semantic-ui-react';
import { StickyTopMenu, SectionHeader } from '../../common';
import { pure } from 'recompose';
import { NAVBAR_HEIGHT } from '../../../constants/gallerySizes';
import { withWidth } from '../../../hocs';

type Props = {
  isSticky: boolean,
  images: Array<Image>,
  sectionHeader: string,
  renderImage: Image => Node,
  withDivider: boolean,
  width: number,
  minImageWidth: number,
  dataMap: Object,
};

const GallerySection = ({
  isSticky,
  images,
  sectionHeader,
  renderImage,
  withDivider,
  width,
  minImageWidth,
  dataMap,
}: Props) => {
  let num_items_per_row = Math.floor(width / minImageWidth);
  if (num_items_per_row < 1) {
    num_items_per_row = 1;
  }
  const num_rows = Math.ceil(images.length / num_items_per_row);
  const columnWidth = width / num_items_per_row;

  return (
    <React.Fragment>
      {withDivider && (
        <Grid.Row
          as={Divider}
          style={{ marginTop: '0px', paddingTop: isSticky ? NAVBAR_HEIGHT : '0px' }}
        />
      )}

      <Grid key={sectionHeader} textAlign="left" padded>
        {sectionHeader && (
          <Grid.Row columns={1} style={{ padding: '0px' }}>
            <Grid.Column>
              {isSticky ? (
                <StickyTopMenu>
                  <Menu.Item style={{ position: 'initial' }}>
                    <SectionHeader>{sectionHeader}</SectionHeader>
                  </Menu.Item>
                </StickyTopMenu>
              ) : (
                <SectionHeader>{sectionHeader}</SectionHeader>
              )}
            </Grid.Column>
          </Grid.Row>
        )}

        {Array.from(Array(num_rows).keys()).map(rowIndex => (
          <SectionRow
            renderImage={renderImage}
            key={rowIndex}
            rowIndex={rowIndex}
            columnWidth={columnWidth}
            images={images}
            num_items_per_row={num_items_per_row}
            dataMap={dataMap}
          />
        ))}
      </Grid>
    </React.Fragment>
  );
};

GallerySection.defaultProps = {
  isSticky: false,
  sectionHeader: '',
  dataMap: {},
  renderImage: (image, dataMap) => {
    const imageIx = dataMap[image.image_id].ix;
    return (
      <ImageHighlightModal imageIx={imageIx} images={Object.values(dataMap)} initialImage={image} />
    );
  },
  withDivider: true,
  minImageWidth: 250,
};

export default withWidth(pure(GallerySection));
