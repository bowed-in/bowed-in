import React from 'react';
import { Grid, Header, Container } from 'semantic-ui-react';

export default class TopLanding extends React.Component {
  render() {
    const gridStyle = { height: '500px', fontSize: '75px' };
    return (
      <div className="top-landing-background">
        <Grid container verticalAlign="middle" textAlign='center' style={gridStyle}>
          <Grid.Row columns="one">
            <Grid.Column>
              <Container>
                <Header inverted>
                  It&apos;s time to get BowedIn!
                </Header>
              </Container>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}
