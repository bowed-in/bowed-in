import React from 'react';
import { Grid, Header, Container, Button } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

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
                <Button circular as={NavLink} activeClassName="active" exact to="/signin" animated='fade' color='orange'>
                  <Button.Content visible>I already have an account</Button.Content>
                  <Button.Content hidden>Sign in to your account!</Button.Content>
                </Button>
                <Button circular as={NavLink} activeClassName="active" exact to="/signup" animated='fade' color='orange'>
                  <Button.Content visible>Uh oh, I don&apos;t have an account yet!</Button.Content>
                  <Button.Content hidden>Sign up for a free account!</Button.Content>
                </Button>
              </Container>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}
