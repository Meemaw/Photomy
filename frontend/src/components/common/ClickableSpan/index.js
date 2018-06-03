import styled from 'styled-components';

const ClickableSpan = styled.span`
  color: #365899;
  font-weight: ${props => props.fontWeight || 700};
  :hover {
    cursor: pointer;
  }
`;

ClickableSpan.displayName = 'ClickableSpan';

export default ClickableSpan;
