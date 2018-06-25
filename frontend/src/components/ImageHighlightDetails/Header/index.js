// @flow
import React from 'react';
import ClickableIcon from '../../common/ClickableIcon';
import { Grid, Header } from 'semantic-ui-react';
import { pure } from 'recompose';

type Props = { setRenderInformation: Function };

const ImageHighlightDetailsHeader = ({ setRenderInformation }: Props) => {
  return (
    <Grid.Row>
      <Grid.Column>
        <Header as="h4">Details</Header>
      </Grid.Column>
      <Grid.Column align="right">
        <ClickableIcon
          size="large"
          name="angle double right"
          onClick={() => setRenderInformation(false)}
        />
      </Grid.Column>
    </Grid.Row>
  );
};

export default pure(ImageHighlightDetailsHeader);
