import styled from 'styled-components';
import { Icon } from 'semantic-ui-react';

const ClickableIcon = styled(Icon)`
  font-weight: ${props => props.fontWeight || 500};
  :hover {
    cursor: pointer;
  }
`;

ClickableIcon.displayName = 'ClickableIcon';

export default ClickableIcon;
