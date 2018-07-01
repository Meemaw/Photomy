import React from 'react';
import HomepageHeading from './Heading';
import styled from 'styled-components';
import { Divider, Grid, Header, Segment } from 'semantic-ui-react';

const HomepageLayout = () => (
  <div style={{ display: 'flex', flexDirection: 'column', width: '100%', minWidth: '100%' }}>
    <HeadingStyle>
      <HomepageHeading />
    </HeadingStyle>
    <Segment style={{ padding: '8em 0em' }} vertical>
      <Grid container stackable verticalAlign="middle">
        <Grid.Row>
          <Grid.Column width={8}>
            <Divider />
            <Header as="h3" style={{ fontSize: '2em' }}>
              Store your photos securely and privately
            </Header>
            <p style={{ fontSize: '1.33em' }}>
              Your photos are safely stored in cloud and unacessible to others. You dont have to
              worry about who might see them.
            </p>
            <Divider />
            <Header as="h3" style={{ fontSize: '2em' }}>
              Get photos quickly
            </Header>
            <p style={{ fontSize: '1.33em' }}>
              We ensure rapid content delivery of photos, so you can get to them as fast as
              possible.
            </p>
            <Divider />

            <Header as="h3" style={{ fontSize: '2em' }}>
              Browse people
            </Header>
            <p style={{ fontSize: '1.33em' }}>
              Our algorithms will find people in images and group them together. You can tag those
              identities and search by them later.
            </p>
            <Divider />
          </Grid.Column>
          <Grid.Column floated="right" width={6} align="center" />
        </Grid.Row>
      </Grid>
    </Segment>
  </div>
);

const HeadingStyle = styled.div`
  background-color: #1b1c1d;
  padding-bottom: 75px;
`;

export default HomepageLayout;
