import * as React from 'react';
import { pure } from 'recompose';
import { Grid, Header } from 'semantic-ui-react';

import ClickableIcon from '../../common/ClickableIcon';

type Props = { setRenderInformation: any };

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
