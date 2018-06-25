import styled from 'styled-components';

const ListStyle = styled.section`
  p,
  div {
    font-size: 11px;
  }

  &&& {
    .description {
      padding-top: 2px !important;
    }
    .item {
      padding: 5px;
    }
    .item:hover {
      background-color: #eee;
      cursor: pointer;
    }
  }
`;
export default ListStyle;
