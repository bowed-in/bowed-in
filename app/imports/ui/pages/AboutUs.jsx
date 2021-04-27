import React from 'react';
import { Header, List, Container } from 'semantic-ui-react';

/** Render a Not Found page if the user enters a URL that doesn't match any route. */
class AboutUs extends React.Component {
  render() {
    return (
      <Container>
        <Header as="h2" textAlign="center">
          <p className='green-text'>BowedIn.com is managed by students at the University of Hawaii at Manoa.</p>
        </Header>
        <Header as="h3"><p className='green-text'>Contact Us</p></Header>
        <List>
          <List.Item>
            <List.Icon name='user' />
            <List.Content>
              <a href='https://jwu0.github.io/'>Jackie Wu, Team Member</a>
            </List.Content>
          </List.Item>
          <List.Item>
            <List.Icon name='user' />
            <List.Content>
              <a href='https://justin-loi.github.io/'>Justin Loi, Team Member</a>
            </List.Content>
          </List.Item>
          <List.Item>
            <List.Icon name='user' />
            <List.Content>
              <a href='https://jhonda7.github.io/'>Justin Honda, Team Member</a>
            </List.Content>
            <List.Content>
            </List.Content>
          </List.Item>
          <List.Item>
            <List.Icon name='user' />
            <List.Content>
              <a href='https://sara-2c.github.io/'>Sara Cheng, Team Member</a>
            </List.Content>
          </List.Item>
        </List>
        <Header as="h2" textAlign="center">
          <p className='green-text'>For administrative purposes, please contact the University of Hawaii at Manoa directly:</p>
        </Header>
        <List>
          <List.Item>
            <List.Icon name='desktop' />
            <List.Content>
              Department of Information and Computer Sciences
            </List.Content>
          </List.Item>
          <List.Item>
            <List.Icon name='university' />
            <List.Content>
              University of Hawaii at Manoa
            </List.Content>
          </List.Item>
          <List.Item>
            <List.Icon name='location arrow' />
            <List.Content>
              Honolulu, HI 96822
            </List.Content>
          </List.Item>
        </List>
      </Container>
    );
  }
}

export default AboutUs;
