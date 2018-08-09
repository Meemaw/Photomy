import styled from 'styled-components';

type Props = {
  fontWeight?: number;
};

const ClickableSpan = styled.span<Props>`
  color: #365899;
  font-weight: ${props => props.fontWeight || 700};
  :hover {
    cursor: pointer;
  }
`;

ClickableSpan.displayName = 'ClickableSpan';

export default ClickableSpan;
