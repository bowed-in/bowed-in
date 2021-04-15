import React from 'react';
import { Grid, Header, Card, Image } from 'semantic-ui-react';

export default class TopLanding extends React.Component {
  render() {
    return (
      <div className='middle-white-background'>
        <Header style={ { color: 'orangered' } } as='h1' textAlign='center'>Local values. Local opportunity. Local talent.</Header>
        <Header> </Header>
        <Grid container stackable textAlign='center'>
          <Grid.Row columns="three">
            <Grid.Column>
              <Card>
                <Image src='/images/Student.jpeg' wrapped ui={false}/>
                <Card.Content>
                  <Card.Header style={{ color: 'orangered' }}>Connect with employers</Card.Header>
                  <Card.Description>
                  Reach out to employers and find sustainable, meaningful, and impactful work here in Hawaii.
                  </Card.Description>
                </Card.Content>
              </Card>
            </Grid.Column>
            <Grid.Column>
              <Card>
                <Image src='/images/Intern.jpeg' wrapped ui={false}/>
                <Card.Content>
                  <Card.Header style={{ color: 'orangered' }}>Still a student?</Card.Header>
                  <Card.Description>
                    Fret not! Join and learn about the many opportunities and internships to learn and work here in
                    Hawaii!.
                  </Card.Description>
                </Card.Content>
              </Card>
            </Grid.Column>
            <Grid.Column>
              <Card>
                <Image src='/images/Employer.jpeg' wrapped ui={false}/>
                <Card.Content>
                  <Card.Header style={{ color: 'orangered' }}>Are you an employer?</Card.Header>
                  <Card.Description>
                    We have great news for you! Join and find the perfect graduate from the University of Hawaii at
                    Manoa.
                  </Card.Description>
                </Card.Content>
              </Card>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}
