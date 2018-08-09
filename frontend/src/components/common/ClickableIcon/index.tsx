import { Icon } from 'semantic-ui-react';
import styled from 'styled-components';

const ClickableIcon = styled(Icon)`
  font-weight: ${props => props.fontWeight || 500};
  :hover {
    cursor: pointer;
  }
`;

ClickableIcon.displayName = 'ClickableIcon';

export default ClickableIcon;
