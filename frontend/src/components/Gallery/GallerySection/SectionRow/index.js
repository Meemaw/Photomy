// @flow
import * as React from 'react';
import { Grid } from 'semantic-ui-react';
import { pure } from 'recompose';
import type { Image } from '../../../../meta/types/Image';

type Props = {
  images: Array<Image>,
  rowIndex: number,
  num_items_per_row: number,
  renderImage: Image => any,
  columnWidth: string,
  dataMap: Object,
};

const SectionRow = ({
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
    <Grid.Row width="equal" textAlign="left">
      {Array.from(Array(n_columns).keys()).map(columnIndex => {
        const image = images[startingIndex + columnIndex];
        return (
          <Grid.Column key={image.image_id} style={{ width: columnWidth }}>
            {renderImage(image, dataMap)}
          </Grid.Column>
        );
      })}
    </Grid.Row>
  );
};

SectionRow.defaultProps = {
  columnWidth: '200px',
};

export default pure(SectionRow);
