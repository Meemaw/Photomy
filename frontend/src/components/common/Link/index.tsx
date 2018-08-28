import { Link } from 'react-router-dom';
import styled from 'styled-components';

type Props = {
  fontSize?: string;
};

export default styled(Link)<Props>`
  font-weight: bold;
  color: #2185d0;
  font-size: ${props => props.fontSize || '0.8em'};
`;
