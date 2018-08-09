import styled from 'styled-components';

type Props = {
  width?: number;
  height?: number;
};

export default styled.div<Props>`
  width: ${props => props.width || '100%'};
  height: ${props => props.height || '100%'};
  overflow-y: scroll;
  overflow-x: hidden;
`;
