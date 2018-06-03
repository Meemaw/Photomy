import styled from 'styled-components';

export default styled.div`
  width: ${props => props.width || '100%'};
  height: ${props => props.height || '100%'};
  overflow-y: scroll;
  overflow-x: hidden;
`;
