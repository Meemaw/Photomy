// @flow
import React from 'react';
import ClickableIcon from '../ClickableIcon';
import { Grid, Header } from 'semantic-ui-react';

type Props = { handleClose: Function, header: string };

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
