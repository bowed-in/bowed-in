import React from 'react';
import { Header, List } from 'semantic-ui-react';

/** Render a Not Found page if the user enters a URL that doesn't match any route. */
class ContactUs extends React.Component {
  render() {
    return (
      <div>
        <Header as="h2" textAlign="center">
          BowedIn.com is managed by students at the University of Hawaii at Manoa.
        </Header>
        <Header as="h3">Contact Us</Header>
        <List>
          <List.Item>
            <List.Icon name='user' />
            <List.Content>
              <a href='https://jwu0.github.io/'>Jackie Wu</a>
            </List.Content>
          </List.Item>
          <List.Item>
            <List.Icon name='user' />
            <List.Content>
              <a href='https://justin-loi.github.io/'>Justin Loi</a>
            </List.Content>
          </List.Item>
          <List.Item>
            <List.Icon name='user' />
            <List.Content>
              <a href='https://jhonda7.github.io/'>Justin Honda</a>
            </List.Content>
          </List.Item>
          <List.Item>
            <List.Icon name='user' />
            <List.Content>
              <a href='https://sara-2c.github.io/'>Sara Cheng</a>
            </List.Content>
          </List.Item>
        </List>
        <Header as="h2" textAlign="center">
          <p>BowedIn is managed by students of the University of Hawaii at Manoa. For administrative purposes, please contact the University of Hawaii at Manoa directly</p>
        </Header>
      </div>
    );
  }
}

export default ContactUs;
