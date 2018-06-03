import styled from 'styled-components';
import { Link } from 'react-router-dom';

export default styled(Link)`
  font-weight: bold;
  color: #2185d0;
  font-size: ${props => props.fontSize || '0.8em'};
`;
