import { Menu } from 'semantic-ui-react';
import styled from 'styled-components';

import { NAVBAR_HEIGHT } from '../../../constants/gallerySizes';

type Props = {
  marginTop?: number;
};

export default styled(Menu).attrs({
  fixed: 'top',
})<Props>`
  &&& {
    margin-top: ${props => props.marginTop || NAVBAR_HEIGHT};
    background-color: hsla(0, 0%, 94%, 0.95);
    border-bottom: 1px solid #e5e5e5;
    border-top: none;
    z-index: 5;
  }
`;
