// @flow
import React from 'react';
import styled from 'styled-components';
import { pure } from 'recompose';
import { toFormatedDate } from '../../../lib/date';

type Props = {
  count: number,
  updatedAt: Date,
  ofWhat: string,
  inWhat: string,
};

const FooterInfo = ({ count, updatedAt, ofWhat, inWhat }: Props) => {
  return count ? (
    <FooterStyle>
      <div>{`${count} ${ofWhat} in ${inWhat}`}</div>
      <div className="SubInfo">Updated at: {toFormatedDate(updatedAt)}</div>
    </FooterStyle>
  ) : null;
};

FooterInfo.defaultProps = {
  ofWhat: 'Images',
  inWhat: 'Gallery',
};

const FooterStyle = styled.div`
  font-size: 14;
  font-weight: 600;
  text-align: center;
  padding: ${props => props.padding || '15px'};

  .SubInfo {
    margin-top: 1px;
    font-size: 11px;
    font-weight: 300;
  }
`;

export default pure(FooterInfo);

export { FooterStyle };
