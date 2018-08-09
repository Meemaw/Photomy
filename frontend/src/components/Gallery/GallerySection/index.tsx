import * as React from 'react';
import { pure } from 'recompose';
import { Divider, Grid, Menu } from 'semantic-ui-react';

import { NAVBAR_HEIGHT } from '../../../constants/gallerySizes';
import { withWidth } from '../../../hocs';
import { Album } from '../../../meta/types/Album';
import { Image, ImageMap } from '../../../meta/types/Image';
import SectionHeader from '../../common/SectionHeader';
import StickyTopMenu from '../../common/StickyTopMenu';
import ImageHighlightModal from '../../ImageHighlightModal';
import SectionRow from './SectionRow';

type Props = {
  isSticky?: boolean;
  images: (Album | Image)[];
  sectionHeader?: string;
  renderImage: (image: Image | Album, dataMap: any) => React.ReactNode;
  withDivider?: boolean;
  width?: number;
  minImageWidth?: number;
  dataMap?: ImageMap;
  isSelected?: boolean;
  id?: string;
};

const GallerySection: React.StatelessComponent<Props> = ({
  isSticky,
  images,
  sectionHeader,
  renderImage,
  withDivider,
  width,
  minImageWidth,
  dataMap,
  isSelected,
  id,
  ...rest
}: Props) => {
  let num_items_per_row = Math.floor(width! / minImageWidth!);
  if (num_items_per_row < 1) {
    num_items_per_row = 1;
  }
  const num_rows = Math.ceil(images.length / num_items_per_row);
  const columnWidth = width! / num_items_per_row;

  return (
    <React.Fragment>
      {withDivider && (
        <Grid.Row
          as={Divider}
          style={{
            marginTop: '0px',
            paddingTop: isSticky ? NAVBAR_HEIGHT : '0px',
          }}
        />
      )}

      <Grid
        {...rest}
        id={id}
        key={sectionHeader}
        textAlign="left"
        padded
        style={isSelected ? { border: 'solid black 1px' } : {}}
      >
        {sectionHeader && (
          <Grid.Row columns={1} style={{ padding: '0px' }} className="Section-Header">
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
            dataMap={dataMap!}
          />
        ))}
      </Grid>
    </React.Fragment>
  );
};

GallerySection.defaultProps = {
  isSelected: false,
  isSticky: false,
  sectionHeader: '',
  dataMap: {},
  renderImage: (image: Image, dataMap: any) => {
    const imageIx = dataMap[image.image_id].ix;
    return (
      <ImageHighlightModal imageIx={imageIx} images={Object.values(dataMap)} initialImage={image} />
    );
  },
  withDivider: true,
  minImageWidth: 250,
};

export default pure(withWidth(GallerySection));
