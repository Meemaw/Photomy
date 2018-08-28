import * as React from 'react';
import { pure } from 'recompose';
import { Grid } from 'semantic-ui-react';

import { Album } from '../../../../meta/types/Album';
import { Image, ImageMap } from '../../../../meta/types/Image';

type Props = {
  images: (Album | Image)[];
  rowIndex: number;
  num_items_per_row: number;
  renderImage: (image: Image | Album, dataMap: ImageMap) => React.ReactNode;
  columnWidth: number;
  dataMap: ImageMap;
};

const SectionRow: React.StatelessComponent<Props> = ({
  images,
  rowIndex,
  num_items_per_row,
  renderImage,
  columnWidth,
  dataMap,
}: Props) => {
  const startingIndex = rowIndex * num_items_per_row;

  const n_columns =
    startingIndex + num_items_per_row > images.length
      ? images.length - startingIndex
      : num_items_per_row;

  return (
    <Grid.Row width="equal" textAlign="left" className="Section-Row">
      {Array.from(Array(n_columns).keys()).map(columnIndex => {
        const image = images[startingIndex + columnIndex];
        return (
          <Grid.Column
            key={image.image_id ? image.image_id : image.id}
            style={{
              width: columnWidth,
              display: 'flex',
              alignItems: 'center',
            }}
          >
            {renderImage(image, dataMap)}
          </Grid.Column>
        );
      })}
    </Grid.Row>
  );
};

SectionRow.defaultProps = {
  columnWidth: 200,
};

export default pure(SectionRow);
