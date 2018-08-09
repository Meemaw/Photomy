import * as React from 'react';
import styled from 'styled-components';

const Maintanance = (props: object) => (
  <MaintananceContainer className="Maintanance">
    <h1>Site is temporarily unavailable.</h1>
    <p>Scheduled maintenance is currently in progress. Please check back soon.</p>
    <p>We apologize for any inconvenience.</p>
  </MaintananceContainer>
);

const MaintananceContainer = styled.div`
  h1 {
    font-size: 50px;
    margin: 0;
  }

  display: block;
  text-align: left;
  width: 100%;
  margin: 0 auto;
  height: 100%;
  padding: 15%;
  text-align: center;

  a {
    color: #dc8100;
    text-decoration: none;
  }
  a:hover {
    color: #333;
    text-decoration: none;
  }
  @media only screen and (max-width: 480px) {
    h1 {
      font-size: 40px;
    }
  }
`;

export default Maintanance;
