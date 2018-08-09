import * as React from 'react';
import { Grid, Header } from 'semantic-ui-react';

import { SpanClick } from '../../../meta/types/Function';
import ClickableIcon from '../ClickableIcon';

type Props = { handleClose: SpanClick; header: string };

const ClosableSegmentHeader = ({ handleClose, header }: Props) => {
  return (
    <Grid columns="equal">
      <Grid.Row>
        <Grid.Column>
          <Header>{header}</Header>
        </Grid.Column>
        <Grid.Column align="right">
          <ClickableIcon name="remove" onClick={handleClose} />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default ClosableSegmentHeader;
